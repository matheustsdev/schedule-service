import { PrismaClient, Service } from "@prisma/client"
import { ICreateServiceDTO } from "./dtos/createService.dto"
import { IUpdateServiceDTO } from "./dtos/updateService.dto"

export class ServiceService {

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

    async update(serviceId: string, data: IUpdateServiceDTO) {
        const updatedService = await this.prisma.service.update({
            where: {
                service_id: serviceId
            }, 
            data: data
        })

        return updatedService
    }

    async delete(serviceId: string) {
        const deleteService = await this.prisma.service.delete({
            where: {
                service_id: serviceId
            }
        })
        return deleteService ? deleteService : {
            error: "E02",
            description: "Erro interno do servidor"
        }
    }

}   
