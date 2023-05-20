import { PrismaClient, Schedule } from "@prisma/client"
import { ICreateScheduleDTO } from "./dtos/createSchedule.dto"
import { IUpdateScheduleDTO } from "./dtos/updateSchedule.dto"
import { IServiceCRUD } from "../../models/interfaces/IServiceCRUD"

export class ScheduleService implements IServiceCRUD<Schedule, ICreateScheduleDTO, IUpdateScheduleDTO> {
    private prisma = new PrismaClient()

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
}