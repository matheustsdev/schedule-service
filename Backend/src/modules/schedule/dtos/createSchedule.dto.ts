import { Service, User } from "@prisma/client"

export interface ICreateScheduleDTO{ 
    start_time: Date    
    end_time: Date     
    description: string  
    user_id_fk: string
    service_id_fk: string
}