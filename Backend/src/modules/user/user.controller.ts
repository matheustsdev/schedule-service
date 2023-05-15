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
import { StandartResponse } from "../../models/classes/StandartResponse";
import { EResponseStatus } from "../../models/enums/EResponseStatus";
import { EErrorCode } from "../../models/enums/EErrorCode";

export class UserController implements IController {
    private userService: UserService = new UserService();

    private async getUser() {
        new Get<User>("/user", async (request, response) => {
            const { userId } = request.query
            
            if(!userId) 
                return response.json(new StandartResponse<User>(EResponseStatus.ERROR, {} as User, {
                    code: EErrorCode.MISSING_QUERY,
                    message: "Query 'userId' não informada"
                }))

            const user = await this.userService.read(userId.toString())

            if(!user)
                return response.json(new StandartResponse<User>(EResponseStatus.ERROR, {} as User, {
                    code: EErrorCode.DATA_NOT_FOUND,
                    message: "Usuário não encontrado"
                }))

            return response.json(new StandartResponse<User>(EResponseStatus.SUCESS, user))
        })
    }

    private async getUserByEmail() {
        new Get<User>("/user/email", async (request: Request, response: Response) => {
            const { email } = request.query       
        
            if(!email) 
                return response.json(new StandartResponse<User>(EResponseStatus.ERROR, {} as User, {
                    code: EErrorCode.MISSING_QUERY,
                    message: "Query 'email' não informada"
                }))

            const user = await this.userService.readWithEmail(email.toString())

            if(!user)
                return response.json(new StandartResponse<User>(EResponseStatus.ERROR, {} as User, {
                    code: EErrorCode.DATA_NOT_FOUND,
                    message: "Usuário não encontrado"
                }))

            return response.json(new StandartResponse<User>(EResponseStatus.SUCESS, user))
        })
    }

    private async createUser() {
        new Post<User>("/user/create", async (request: Request, response: Response) => {
            const { email, password, name, phone, role } = request.body as ICreateUserDTO

            const createdSalt = await genSalt(4)
            const encryptedPassword = await hash(password, createdSalt)

            const createdUser = await this.userService.create({
                email,
                salt: createdSalt,
                password: encryptedPassword,
                name: name,
                phone: phone,
                role: role
            })

            return response.json(new StandartResponse<User>(EResponseStatus.SUCESS, createdUser))
        })
    }

    private async deleteUser() {
        new Delete("/user/delete", async (request: Request, response: Response) => {
            const { userId } = request.query

            if(!userId) 
                return response.json(new StandartResponse<User>(EResponseStatus.ERROR, {} as User, {
                    code: EErrorCode.MISSING_QUERY,
                    message: "Query 'userId' não informada"
                }))
            

            const deletedUser = await this.userService.delete(userId.toString())

            if(!deletedUser)
                return response.json(new StandartResponse<User>(EResponseStatus.ERROR, {} as User, {
                    code: EErrorCode.DATA_NOT_FOUND,
                    message: "Usuário não encontrado"
                }))


            return response.json(deletedUser)

        })
    }

    private async updateUser() {
        new Patch("/user/update", async (request: Request, response: Response) => {
            const { userId } = request.query
            const data = request.body as IUpdateUserDTO

            if(!userId) 
                return response.json(new StandartResponse<User>(EResponseStatus.ERROR, {} as User, {
                    code: EErrorCode.MISSING_QUERY,
                    message: "Query 'userId' não informada"
                }))

            const updatedUser = await this.userService.update(userId.toString(), data)

            if(!updatedUser)
                return response.json(new StandartResponse<User>(EResponseStatus.ERROR, {} as User, {
                    code: EErrorCode.EMAIL_INCORRECT,
                    message: "Email incorreto"
                }))

            return response.json(updatedUser)
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
