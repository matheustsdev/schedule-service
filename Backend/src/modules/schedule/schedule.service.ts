import { PrismaClient, Schedule } from "@prisma/client"
import { ICreateScheduleDTO } from "./dtos/createSchedule.dto"
import { IUpdateScheduleDTO } from "./dtos/updateSchedule.dto"

export class ScheduleService {

    private prisma = new PrismaClient()

    async update(scheduleId: string, data: IUpdateScheduleDTO) {
        try{
            const updateSchedule = await this.prisma.schedule.update({
                where: {
                    scheduleId: scheduleId
                }, 
                data: data
            })
            return updateSchedule
        } catch(ex){
            console.log(ex)
        }
    }

    async delete(scheduleId: string) {
        const deleteSchedule = await this.prisma.schedule.delete({
            where: {
                scheduleId: scheduleId
            }
        })
        return deleteSchedule ? deleteSchedule : {
            error: "E02",
            description: "Erro interno do servidor"
        }
    }
}