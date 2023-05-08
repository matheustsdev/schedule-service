import { PrismaClient, Service } from "@prisma/client";
import { ICreateServiceDTO } from "./dtos/createService.dto";
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

    

}   