import { Get } from "../Get";
import { UserService, User } from "./user.service";

export class UserController {
    private userService: UserService = new UserService();

    async getUser() {
        new Get(route, "/", async (request: Request, response: Response) => {
            const query = request.query        
            let user: User = null
        
            if(query.name) {
                user = this.userService.read(query.name)
            }
        
           return response.json(user)
        })
    }
}