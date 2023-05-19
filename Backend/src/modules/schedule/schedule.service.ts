import { PrismaClient, Schedule } from "@prisma/client"
import { ICreateScheduleDTO } from "./dtos/createSchedule.dto"
import { IUpdateScheduleDTO } from "./dtos/updateSchedule.dto"

export class ScheduleService {

    private prisma = new PrismaClient()

    async update(scheduleId: string, data: IUpdateScheduleDTO) {
        try{
            const updateSchedule = await this.prisma.schedule.update({
                where: {
                    schedule_id: scheduleId
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


    async readWithUser(userId: string) {
        const schedule = await this.prisma.schedule.findMany({
            where: {
                user_id_fk
            }
        })

        return schedule
    }

    async readWithService(serviceId: string) {
        const schedule = await this.prisma.schedule.findMany({
            where: {
                service_id_fk
            }
        })

        return schedule
    }
}