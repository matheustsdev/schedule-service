import { Request, Response } from "express";

import { Get } from "../../models/classes/routes/Get";
import { Post } from "../../models/classes/routes/Post";
import { Delete } from "../../models/classes/routes/Delete";
import { Patch } from "../../models/classes/routes/Patch";

import { Service } from "@prisma/client";
import { IController } from "../../models/interfaces/IController";

import { ICreateServiceDTO } from "./dtos/createService.dto";
import { IUpdateServiceDTO } from "./dtos/updateService.dto";

import { ServiceService } from "./service.service";

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




    execute() {
        this.createService()
        this.updateService()
    }
}