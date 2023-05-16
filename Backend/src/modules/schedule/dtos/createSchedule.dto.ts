import { Service, User } from "@prisma/client"

export interface ICreateScheduleDTO{ 
    startTime: Date    
    endTime: Date     
    description: string  
    user: User
    service: Service
}