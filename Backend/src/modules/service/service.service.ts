import { Service } from "@prisma/client"
import { ICreateServiceDTO } from "./dtos/createService.dto"
import { IUpdateServiceDTO } from "./dtos/updateService.dto"
import { IServiceCRUD } from "../../models/interfaces/IServiceCRUD"
import { Prisma } from "../../models/classes/Prisma"

export class ServiceService implements IServiceCRUD<Service, ICreateServiceDTO, IUpdateServiceDTO > {
    private prisma = Prisma.client

    async create(service: ICreateServiceDTO): Promise<Service>{
        const createService = await this.prisma.service.create({
            data: service
        })

        return createService
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

    async delete(serviceId: string) {
        const deleteService = await this.prisma.service.delete({
            where: {
                service_id: serviceId
            }
        })

        return deleteService 
    }


    async readService() {
        const service = await this.prisma.service.findMany({
            include: {
                WorkersServices: {
                    select: {
                        User: true
                    }
                }
            }
        })

        return service
    }

    async createWorkerService(userId: string, serviceId: string) {
        const createdWorkerService = await this.prisma.workersServices.create({
            data: {
                user_id_fk: userId,
                service_id_fk: serviceId
            }
        })

        return createdWorkerService
    }

}   
