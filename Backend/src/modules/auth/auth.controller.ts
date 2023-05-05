import { User } from "@prisma/client";
import { Get } from "../../models/classes/routes/Get";
import { IController } from "../../models/interfaces/Controller";
import { UserService } from "../user/user.service";

export class AuthController implements IController {
    private userService: UserService = new UserService();

    private login() {
        new Get("/user/auth", async (request: Request, response: Response) => {
            const { query } = request
            
            let user: User | null = null
        
            if(query.email) {
                user = await this.userService.readWithEmail(query.email.toString())
            }
        
           return response.json(user)
        })
    }
    
    execute(): void {
        this.login()
    }
}