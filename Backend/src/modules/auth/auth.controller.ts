import { User } from "@prisma/client";
import { Get } from "../../models/classes/routes/Get";
import { IController } from "../../models/interfaces/Controller";
import { UserService } from "../user/user.service";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController implements IController {
    private userService: UserService = new UserService();
    private authService: AuthService = new AuthService();

    private login() {
        new Get("/user/auth", async (request: Request, response: Response) => {
            const { email, password } = request.query
            
            let user: User | null = null
        
            if(email && password) {
                user = await this.userService.readWithEmail(email.toString())
                if(user) {

                    const data = await this.authService.auth({user, triedPassword: password.toString()})
                    return response.json(data)
                }
            }
        
           return response.json({error: "Error"})
        })
    }
    
    execute(): void {
        this.login()
    }
}