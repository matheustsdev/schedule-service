import { Request, Response } from "express";
import { Get } from "../models/classes/routes/Get";
import { UserService } from "./user.service";
import { User } from "@prisma/client";
import { Controller } from "../models/interfaces/Controller";

export class UserController implements Controller{
    private userService: UserService = new UserService();

    private async getUser() {
        new Get("/", async (request: Request, response: Response) => {
            const { query } = request        
            let user: User[] = []
        
            if(query.userId) {
                user = await this.userService.read(query.userId.toString())
            }
        
           return response.json(user)
        })
    }

    execute() {
        this.getUser()
    }
}