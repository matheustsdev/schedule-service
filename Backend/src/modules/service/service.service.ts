import { PrismaClient, Service } from "@prisma/client"
import { ICreateServiceDTO } from "./dtos/createService.dto"
import { IUpdateServiceDTO } from "./dtos/updateService.dto"
import { IServiceCRUD } from "../../models/interfaces/IServiceCRUD"

export class ServiceService implements IServiceCRUD<Service, ICreateServiceDTO, IUpdateServiceDTO > {
    private prisma = new PrismaClient()

    async create(service: ICreateServiceDTO): Promise<Service>{
        try {
            const createService = await this.prisma.service.create({
                data: service
            })
            return createService
        
        }catch(ex) {
            console.log(ex)
        }
        return {} as Service
    }

    read(id: string): Promise<Service | null> {
        throw new Error("Method not implemented.")
    }

    async update(serviceId: string, data: IUpdateServiceDTO) {
        const updatedService = await this.prisma.service.update({
            where: {
                service_id: serviceId
            }, 
            data: data
        })

        return updatedService
    }

    delete(id: string): Promise<Service> {
        throw new Error("Method not implemented.")
    }

}   
