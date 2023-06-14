import { Schedule } from "@prisma/client"
import { ICreateScheduleDTO } from "./dtos/createSchedule.dto"
import { IUpdateScheduleDTO } from "./dtos/updateSchedule.dto"
import { IServiceCRUD } from "../../models/interfaces/IServiceCRUD"
import { Prisma } from "../../models/classes/Prisma"

export class ScheduleService implements IServiceCRUD<Schedule, ICreateScheduleDTO, IUpdateScheduleDTO> {
    private prisma = Prisma.client

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

    async create(schedule: ICreateScheduleDTO): Promise<Schedule>{
        const user = await this.prisma.user.findUnique({
            where: {
                user_id: schedule.user_id_fk
            }
        })

        if(!user) {
            return {} as Schedule
        }

        const createSchedule = await this.prisma.schedule.create({
            data: {
                ...schedule
            }
        })

        return createSchedule
    }

    async readWithUser(userId: string) {
        const schedule = await this.prisma.schedule.findMany({
            where: {
                user_id_fk: userId
            },
            include: {
                Service: true,
                Worker: true
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

    async availableSchedules(workerId: string, serviceId: string, date: Date) {

        const schedules = await this.prisma.schedule.findMany({
            where: {
                worker_id_fk: workerId,
                service_id_fk: serviceId,
                start_time: {
                    gte: date
                }
            }
        })

        const service = await this.prisma.service.findUnique({
            where: {
                service_id: serviceId
            }
        })

        if(!service) {
           return [] 
        }

        const openTime = new Date(new Date(date).setHours(9, 0, 0, 0))
        const closeTime = new Date(new Date(date).setHours(18, 0, 0, 0))
        
        
        const serviceTime = service.time * 60 * 1000;

        let availableSchedules: Date[] = []

        for(let i = openTime.getTime(); i < closeTime.getTime(); i += serviceTime) {
            const isAvailable = schedules.find(schedule => {
                return i >= new Date(schedule.start_time).getTime() && i < new Date(schedule.end_time).getTime() || i + serviceTime > new Date(schedule.start_time).getTime() && i + serviceTime <= new Date(schedule.end_time).getTime()
            })

            console.log(new Date(i))

            if(!isAvailable)
                availableSchedules.push(new Date(i))

        }

        return availableSchedules
    }
}
    