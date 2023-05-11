import { Request, Response } from "express";
import { Get } from "../../models/classes/routes/Get";
import { UserService } from "./user.service";
import { User } from "@prisma/client";
import { IController } from "../../models/interfaces/Controller";
import { Post } from "../../models/classes/routes/Post";
import { ICreateUserDTO } from "./dtos/createUser.dto";
import { Delete } from "../../models/classes/routes/Delete";

import { genSalt, hash } from "bcrypt"
import { IUpdateUserDTO } from "./dtos/updateUser.dto";
import { Patch } from "../../models/classes/routes/Patch";

export class UserController implements IController {
    private userService: UserService = new UserService();

    private async getUser() {
        new Get("/user", async (request: Request, response: Response) => {
            const { query } = request
            
            let user: User[] = []
        
            if(query.userId) {
                user = await this.userService.read(query.userId.toString())
            }
        
           return response.json(user)
        })
    }

    private async getUserByEmail() {
        new Get("/user/email", async (request: Request, response: Response) => {
            const { query } = request
            
            let user: User | null = null
        
            if(query.email) {
                user = await this.userService.readWithEmail(query.email.toString())
            }
        
           return response.json(user)
        })
    }

    private async createUser() {
        new Post("/user/create", async (request: Request, response: Response) => {
            const { email, password, name, phone } = request.body as ICreateUserDTO

            const createdSalt = await genSalt(4)
            const encryptedPassword = await hash(password, createdSalt)

            const createdUser = await this.userService.create({
                email,
                salt: createdSalt,
                password: encryptedPassword,
                name: name,
                phone: phone,
            })

            return response.json(createdUser)
        })
    }

    private async deleteUser() {
        new Delete("/user/delete", async (request: Request, response: Response) => {
            const { query } = request

            if(query.userId) {
                const deletedUser = await this.userService.delete(query.userId.toString())

                return response.json(deletedUser)
            } else {
                return response.status(404).json({
                    error: "E01",
                    description: "Não foi encontrado o user_id como query na requisição."
                })
            }

        })
    }

    private async updateUser() {
        new Patch("/user/update", async (request: Request, response: Response) => {
            const { userId } = request.query
            const data = request.body as IUpdateUserDTO

            if(userId) {
                const updatedUser = await this.userService.update(userId.toString(), data)
                return response.json(updatedUser)
            }

            return response.status(404).json({
                error: "E01",
                description: "Não foi encontrado o user_id como query na requisição."
            })

        })
    }

    execute() {
        this.getUser()
        this.createUser()
        this.deleteUser()
        this.updateUser()
        this.getUserByEmail()
    }
}
