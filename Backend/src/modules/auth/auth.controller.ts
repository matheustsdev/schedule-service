import { IController } from "../../models/interfaces/IController";
import { UserService } from "../user/user.service";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { IUserAuthDTO } from "./dtos/userAuth.dto";
import { Post } from "../../models/classes/routes/Post";

export class AuthController implements IController {
    private userService: UserService = new UserService();
    private authService: AuthService = new AuthService();

    private login() {
        new Post("/auth", async (request: Request, response: Response) => {
            const { email, password } = request.body as IUserAuthDTO;
                    
            if(!email || !password) 
                return response.json({error: "Error"})

            const user = await this.userService.readWithEmail(email.toString())
            
            if(!user)
                return response.json({error: "User not found"})

            const data = await this.authService.auth({ email, password })
            return response.json(data)
        })
    }
    
    execute(): void {
        this.login()
    }
}