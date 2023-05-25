import { Request, Response } from "express";

import { Get } from "../../models/classes/routes/Get";
import { Post } from "../../models/classes/routes/Post";
import { Delete } from "../../models/classes/routes/Delete";
import { Patch } from "../../models/classes/routes/Patch";

import { Service } from "@prisma/client";
import { IController } from "../../models/interfaces/Controller";

import { ICreateServiceDTO } from "./dtos/createService.dto";
import { IUpdateServiceDTO } from "./dtos/updateService.dto";

import { ServiceService } from "./service.service";
import { StandartResponse } from "../../models/classes/StandartResponse";
import { EResponseStatus } from "../../models/enums/EResponseStatus";
import { EErrorCode } from "../../models/enums/EErrorCode";

export class ServiceController implements IController {

    private serviceService: ServiceService = new ServiceService();

    private async createService() {
        new Post("/service/create", async (request: Request, response: Response) => {
            const { name, description, price, time } = request.body as ICreateServiceDTO

            const createService = await this.serviceService.create({
                name: name,
                description: description,
                price: price,
                time: time,
            })

            return response.json(createService)
        })
    }

    private async updateService() {
        new Patch("/service/update", async (request: Request, response: Response) => {
            const { serviceId } = request.query
            const data = request.body as IUpdateServiceDTO

            if(serviceId) {
                const updatedService = await this.serviceService.update(serviceId.toString(), data)
                return response.json(updatedService)
            }

            return response.status(404).json({
                error: "E01",
                description: "Não foi encontrado o user_id como query na requisição."
            })

        })
    }

    private async deleteService(){
        new Delete("/service/delete", async (request: Request, response: Response) => {
            const { serviceId } = request.query

            if(!serviceId)
                return response.json(new StandartResponse<Service>(EResponseStatus.ERROR, {} as Service,{
                    code: EErrorCode.MISSING_QUERY,
                    message: "Query 'serviceID' não informada"
                }))

            const deletedService = await this.serviceService.delete(serviceId.toString()) 

            if(!deletedService)
                return response.json(new StandartResponse<Service>(EResponseStatus.ERROR, {} as Service,{
                    code: EErrorCode.DATA_NOT_FOUND,
                    message: "Serviço não encontrado"
                }))
            
            return response.json(deletedService)

        })
    }


    execute() {
        this.createService()
        this.updateService()
        this.deleteService()
    }
}