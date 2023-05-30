import { Schedule } from "@prisma/client"
import { ICreateScheduleDTO } from "./dtos/createSchedule.dto"
import { IUpdateScheduleDTO } from "./dtos/updateSchedule.dto"
import { IServiceCRUD } from "../../models/interfaces/IServiceCRUD"
import { Prisma } from "../../models/classes/Prisma"

export class ScheduleService implements IServiceCRUD<Schedule, ICreateScheduleDTO, IUpdateScheduleDTO> {
    private prisma = Prisma.client

    create(createDTO: ICreateScheduleDTO): Promise<Schedule> {
        throw new Error("Method not implemented.")
    }

    read(id: string): Promise<Schedule | null> {
        throw new Error("Method not implemented.")
    }

    async update(scheduleId: string, data: IUpdateScheduleDTO) {
        const updateSchedule = await this.prisma.schedule.update({
            where: {
                schedule_id: scheduleId
            }, 
            data: data
        })
        return updateSchedule
    }

    async delete(scheduleId: string) {
        const deleteSchedule = await this.prisma.schedule.delete({
            where: {
                schedule_id: scheduleId
            }
        })

        return deleteSchedule;
    }


    async readWithUser(userId: string) {
        const schedule = await this.prisma.schedule.findMany({
            where: {
                user_id_fk: userId
            }
        })

        return schedule
    }

    async readWithService(serviceId: string) {
        const schedule = await this.prisma.schedule.findMany({
            where: {
                service_id_fk: serviceId
            }
        })

        return schedule
    }
}