import { Request, Response } from "express";
import { Get } from "../../models/classes/methods/Get";
import { UserService } from "./user.service";
import { User } from "@prisma/client";
import { IController } from "../../models/interfaces/IController";
import { Post } from "../../models/classes/methods/Post";
import { ICreateUserDTO } from "./dtos/createUser.dto";
import { Delete } from "../../models/classes/methods/Delete";
import { authorizationMiddleware } from "../../middlewares/authorization";

import { genSalt, hash } from "bcrypt"
import { IUpdateUserDTO } from "./dtos/updateUser.dto";
import { Patch } from "../../models/classes/methods/Patch";
import { StandartResponse } from "../../models/classes/StandartResponse";
import { EResponseStatus } from "../../models/enums/EResponseStatus";
import { EErrorCode } from "../../models/enums/EErrorCode";
import { uuid } from "uuidv4";
import { Mailer } from "../../models/classes/Mailer";

export class UserController implements IController {
    private userService: UserService = new UserService();
    private mailerService: Mailer = new Mailer();

    private async getUser() {
        new Get<User>("/user", async (request, response) => {
            const { userId } = request.query
            
            if(!userId) 
                return response.json(new StandartResponse<User>(EResponseStatus.ERROR, {} as User, {
                    code: EErrorCode.MISSING_QUERY_DATA,
                    message: "Query 'userId' não informada"
                }))

            const user = await this.userService.read(userId.toString())

            if(!user)
                return response.json(new StandartResponse<User>(EResponseStatus.ERROR, {} as User, {
                    code: EErrorCode.DATA_NOT_FOUND,
                    message: "Usuário não encontrado"
                }))

            return response.json(new StandartResponse<User>(EResponseStatus.SUCESS, user))
        }, authorizationMiddleware)
    }

    private async getUserByEmail() {
        new Get<User>("/user/email", async (request: Request, response: Response) => {
            const { email } = request.query       
        
            if(!email) 
                return response.json(new StandartResponse<User>(EResponseStatus.ERROR, {} as User, {
                    code: EErrorCode.MISSING_QUERY_DATA,
                    message: "Query 'email' não informada"
                }))

            const user = await this.userService.readWithEmail(email.toString())

            if(!user)
                return response.json(new StandartResponse<User>(EResponseStatus.ERROR, {} as User, {
                    code: EErrorCode.DATA_NOT_FOUND,
                    message: "Usuário não encontrado"
                }))

            return response.json(new StandartResponse<User>(EResponseStatus.SUCESS, user))
        }, authorizationMiddleware)
    }

    private async createUser() {
        new Post<User>("/user/create", async (request: Request, response: Response) => {
            console.log("Create user controller called")
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

            if(!createdUser)
                return response.json(new StandartResponse<User>(EResponseStatus.ERROR, {} as User, {
                    code: EErrorCode.DATA_ALREADY_EXISTS,
                    message: "Usuário já existe."
                }))

            return response.json(new StandartResponse<User>(EResponseStatus.SUCESS, createdUser))
        })
    }

    private async deleteUser() {
        new Delete("/user/delete", async (request: Request, response: Response, authorizationMiddleware) => {
            const { userId } = request.query

            if(!userId) 
                return response.json(new StandartResponse<User>(EResponseStatus.ERROR, {} as User, {
                    code: EErrorCode.MISSING_QUERY_DATA,
                    message: "Query 'userId' não informada"
                }))
            

            const deletedUser = await this.userService.delete(userId.toString())

            if(!deletedUser)
                return response.json(new StandartResponse<User>(EResponseStatus.ERROR, {} as User, {
                    code: EErrorCode.DATA_NOT_FOUND,
                    message: "Usuário não encontrado"
                }))


            return response.json(deletedUser)

        }, authorizationMiddleware)
    }

    private async updateUser() {
        new Patch("/user/update", async (request: Request, response: Response) => {
            const { userId } = request.query
            const data = request.body as IUpdateUserDTO

            if(!userId) 
                return response.json(new StandartResponse<User>(EResponseStatus.ERROR, {} as User, {
                    code: EErrorCode.MISSING_QUERY_DATA,
                    message: "Query 'userId' não informada"
                }))

            const updatedUser = await this.userService.update(userId.toString(), data)

            if(!updatedUser)
                return response.json(new StandartResponse<User>(EResponseStatus.ERROR, {} as User, {
                    code: EErrorCode.EMAIL_INCORRECT,
                    message: "Email incorreto"
                }))

            return response.json(updatedUser)
        }, authorizationMiddleware)
    }

    private async getWorkers() {
        new Get<User[]>("/user/workers", async (request: Request, response: Response) => {
            const workers = await this.userService.readWithRole("worker")

            if(!workers)
                return response.json(new StandartResponse<User[]>(EResponseStatus.ERROR, [] as User[], {
                    code: EErrorCode.DATA_NOT_FOUND,
                    message: "Nenhum usuário encontrado"
                }))

            return response.json(new StandartResponse<User[]>(EResponseStatus.SUCESS, workers))
        }, authorizationMiddleware)
    }

    private async forgotPassword() {
        new Post<boolean>("/user/forgotPassword", async (request: Request, response: Response) => {
            const { email } = request.body

            const user = await this.userService.readWithEmail(email)

            if(!user)
                return response.json(new StandartResponse<User>(EResponseStatus.ERROR, {} as User, {
                    code: EErrorCode.DATA_NOT_FOUND,
                    message: "Usuário não encontrado"
                }))

           const newPassword = uuid().slice(0,6)

           const mailMessage = `
           <body>
                <main>
                    <h1>Sua nova senha</h1>
                    <p> Sua senha foi atualizada! Agora você pode acessar sua conta usando a senha:</p>
                    <h2>${newPassword}</h2>
                    <p> Não esqueça de alterar sua senha após o login.</p>
                    <br/>
                    <p>Se você não solicitou a alteração de senha, entre em contato com o suporte.</p>
                </main>
           </body>
           `

           const mailerResponse = await this.mailerService.sendMail(
            user.email,
            "Atualização de senha",
            mailMessage
           )
           console.log(mailerResponse)
           
           if(!mailerResponse) {
                return response.json(new StandartResponse<boolean>(EResponseStatus.ERROR, false, {
                    code: EErrorCode.INTERNAL_SERVER_ERROR,
                    message: "Falha ao enviar email."
                }))
           }

           const encryptedPassword = await hash(newPassword, user.salt)

           const updatedUser = await this.userService.update(user.user_id, {
                password: encryptedPassword
           })
           
           if(!updatedUser)
                return response.json(new StandartResponse<boolean>(EResponseStatus.ERROR, false, {
                    code: EErrorCode.INTERNAL_SERVER_ERROR,
                    message: "Falha ao criar nova senha."
                }))

           return response.json(new StandartResponse<boolean>(EResponseStatus.SUCESS, true))
        })
    }

    execute() {
        this.getUser()
        this.createUser()
        this.deleteUser()
        this.updateUser()
        this.getUserByEmail()
        this.getWorkers()
        this.forgotPassword()
    }
}
