import { Request, Response } from "express";
import { Schedule } from "@prisma/client";
import { Get } from "../../models/classes/methods/Get";
import { Delete } from "../../models/classes/methods/Delete";
import { Patch } from "../../models/classes/methods/Patch";
import { IController } from "../../models/interfaces/IController";
import { ScheduleService } from "./schedule.service";
import { IUpdateScheduleDTO } from "./dtos/updateSchedule.dto";
import { authorizationMiddleware } from "../../middlewares/authorization";
import { StandartResponse } from "../../models/classes/StandartResponse";
import { EResponseStatus } from "../../models/enums/EResponseStatus";
import { EErrorCode } from "../../models/enums/EErrorCode";

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

        }, authorizationMiddleware)
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

        }, authorizationMiddleware)
    }

    private async getScheduleByUser() {
        new Get<Schedule>("/schedule/user", async (request: Request, response: Response) => {
            const { userId } = request.query       
        
            if(!userId) 
                return response.json(new StandartResponse<Schedule>(EResponseStatus.ERROR, {} as Schedule, {
                    code: EErrorCode.MISSING_QUERY_DATA,
                    message: "Query 'userId' não informada"
                }))

            const schedule = await this.scheduleService.readWithUser(userId.toString())

            if(!schedule)
                return response.json(new StandartResponse<Schedule>(EResponseStatus.ERROR, {} as Schedule, {
                    code: EErrorCode.DATA_NOT_FOUND,
                    message: "Agendamento não encontrado"
                }))

            return response.json(new StandartResponse<Schedule[]>(EResponseStatus.SUCESS, schedule))
        })
    }

    private async getScheduleByService() {
        new Get<Schedule>("/schedule/service", async (request: Request, response: Response) => {
            const { serviceId } = request.query       
        
            if(!serviceId) 
                return response.json(new StandartResponse<Schedule>(EResponseStatus.ERROR, {} as Schedule, {
                    code: EErrorCode.MISSING_QUERY_DATA,
                    message: "Query 'serviceId' não informada"
                }))

            const schedule = await this.scheduleService.readWithService(serviceId.toString())

            if(!schedule)
                return response.json(new StandartResponse<Schedule>(EResponseStatus.ERROR, {} as Schedule, {
                    code: EErrorCode.DATA_NOT_FOUND,
                    message: "Agendamento não encontrado"
                }))

            return response.json(new StandartResponse<Schedule[]>(EResponseStatus.SUCESS, schedule))
        })
    }

    execute(){
        this.deleteSchedule(),
        this.updateSchedule(),
        this.getScheduleByUser(),
        this.getScheduleByService()
    }

} 
