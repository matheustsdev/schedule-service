import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Get } from "../../models/classes/routes/Get";
import { Post } from "../../models/classes/routes/Post";
import { Delete } from "../../models/classes/routes/Delete";
import { Patch } from "../../models/classes/routes/Patch";
import { IController } from "../../models/interfaces/IController";
import { ScheduleService } from "./schedule.service";
import { ICreateScheduleDTO } from "./dtos/createSchedule.dto";
import { IUpdateScheduleDTO } from "./dtos/updateSchedule.dto";

export class ScheduleController implements IController{
    private scheduleService: ScheduleService = new ScheduleService();

    private async updateSchedule() {
        new Patch("/schedule/update", async (request: Request, response: Response) => {
            const { scheduleId } = request.query
            const data = request.body as IUpdateScheduleDTO

            if(data.startTime){
                data.startTime = new Date(data.startTime);
            }
            if(data.endTime){
                data.endTime = new Date(data.endTime);
            }

            if(scheduleId) {
                const updateSchedule = await this.scheduleService.update(scheduleId.toString(), data)
                return response.json(updateSchedule)
            }

            return response.status(404).json({
                error: "E01",
                description: "Não foi encontrado o schedule_id como query na requisição."
            })

        })
    }
    
    private async deleteSchedule(){
        new Delete("/schedule/delete", async (request: Request, response: Response) => {
            const { scheduleId } = request.query

            if (scheduleId) {
                const deleteSchedule = await this.scheduleService.delete(scheduleId.toString())

                return response.json(deleteSchedule)
            } else {
                return response.status(404).json({
                    error: "E01",
                    description: "Não foi encontrado o schedule_id como query na requisição."
                })
            }

        })
    }

    execute(){
        this.deleteSchedule(),
        this.updateSchedule()
    }

} 
