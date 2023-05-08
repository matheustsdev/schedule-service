import { compare } from "bcrypt";
import { IUserAuthDTO } from "./dtos/userAuth.dto";
import { PrismaClient, User } from "@prisma/client";
import { UserService } from "../user/user.service";

export class AuthService {
    private prisma = new PrismaClient()
    private userService = new UserService()

    private async checkPassword(user: User, triedPassword: string) {

        const isAuthorized = await compare(triedPassword, user.password)

        return isAuthorized
    }

    private async createToken(user: User) {

    }

    async auth({email, triedPassword}: IUserAuthDTO) {
        const user = await this.userService.readWithEmail(email);

        if(!user) 
            return undefined;
        
        const isCheckedPassword = this.checkPassword(user, triedPassword)
        
        if(!isCheckedPassword)
            return {error: "Senha incorreta!"}
        
        
    }
}