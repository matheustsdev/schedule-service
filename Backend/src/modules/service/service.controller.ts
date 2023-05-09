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

    execute() {
        this.createService()
    }
}