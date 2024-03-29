import { Request, Response } from "express";

import { Get } from "../../models/classes/methods/Get";
import { Post } from "../../models/classes/methods/Post";
import { Delete } from "../../models/classes/methods/Delete";
import { Patch } from "../../models/classes/methods/Patch";

import { Service } from "@prisma/client";
import { IController } from "../../models/interfaces/IController";

import { ICreateServiceDTO } from "./dtos/createService.dto";
import { IUpdateServiceDTO } from "./dtos/updateService.dto";

import { ServiceService } from "./service.service";
import { StandartResponse } from "../../models/classes/StandartResponse";
import { EResponseStatus } from "../../models/enums/EResponseStatus";
import { EErrorCode } from "../../models/enums/EErrorCode";
import { authorizationMiddleware } from "../../middlewares/authorization";
import { UserService } from "../user/user.service";

export class ServiceController implements IController {

    private serviceService: ServiceService = new ServiceService();
    private userService: UserService = new UserService();

    private async createService() {
        new Post("/service/create", async (request: Request, response: Response) => {
            const { name, description, price, time } = request.body as ICreateServiceDTO

            const createService = await this.serviceService.create({
                name: name,
                description: description,
                price: price,
                time: time,
            })

            if(!createService) {
                return response.json(new StandartResponse<Service>(EResponseStatus.ERROR, {} as Service, {
                    code: EErrorCode.INTERNAL_SERVER_ERROR,
                    message: "Falha ao criar o serviço."
                }))
            }

            return response.json(createService)
        }, authorizationMiddleware)
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

        }, authorizationMiddleware)
    }

    private async deleteService(){
        new Delete("/service/delete", async (request: Request, response: Response) => {
            const { serviceId } = request.query

            if(!serviceId)
                return response.json(new StandartResponse<Service>(EResponseStatus.ERROR, {} as Service,{
                    code: EErrorCode.MISSING_QUERY_DATA,
                    message: "Query 'serviceID' não informada."
                }))

            const deletedService = await this.serviceService.delete(serviceId.toString()) 

            if(!deletedService)
                return response.json(new StandartResponse<Service>(EResponseStatus.ERROR, {} as Service,{
                    code: EErrorCode.DATA_NOT_FOUND,
                    message: "Serviço não encontrado."
                }))
            
            return response.json(deletedService)

        })
    }

    private async readService() {
        new Get<Service>("/service", async (request: Request, response: Response) => {
           
            const service = await this.serviceService.readService()

            if(!service)
                return response.json(new StandartResponse<Service>(EResponseStatus.ERROR, {} as Service, {
                    code: EErrorCode.DATA_NOT_FOUND,
                    message: "Serviço não encontrado"
                }))

            return response.json(new StandartResponse<Service[]>(EResponseStatus.SUCESS, service))
        })
    }

    private async createWorkerService() {
        new Post("/service/createWorkerService", async (request: Request, response: Response) => {
            const { userId, serviceId } = request.body

            const user = await this.userService.read(userId)

            if(!user) {
                return response.json(new StandartResponse<Service>(EResponseStatus.ERROR, {} as Service, {
                    code: EErrorCode.DATA_NOT_FOUND,
                    message: "Usuário não encontrado."
                }))
            }

            if(user.role !== "worker") {
                return response.json(new StandartResponse<Service>(EResponseStatus.ERROR, {} as Service, {
                    code: EErrorCode.INVALID_USER_ROLE,
                    message: "Usuário não é um prestador de serviço."
                }))
            }

            const createdWorkerService = await this.serviceService.createWorkerService(userId, serviceId)

            if(!createdWorkerService) {
                return response.json(new StandartResponse<Service>(EResponseStatus.ERROR, {} as Service, {
                    code: EErrorCode.INTERNAL_SERVER_ERROR,
                    message: "Falha ao criar o serviço."
                }))
            }

            return response.json(createdWorkerService)
        }, authorizationMiddleware)
    }

    execute() {
        this.createService()
        this.updateService()
        this.deleteService()
        this.readService()
        this.createWorkerService()
    }
}