import { compare } from "bcrypt";
import { IUserAuthDTO } from "./dtos/userAuth.dto";
import { PrismaClient, User } from "@prisma/client";
import { UserService } from "../user/user.service";
import jwt from "jsonwebtoken";
import { IService } from "../../models/interfaces/IService";

export class AuthService implements IService {
    private prisma = new PrismaClient()
    private userService = new UserService()

    private async checkPassword(user: User, triedPassword: string) {

        const isAuthorized = await compare(triedPassword, user.password)

        return isAuthorized
    }

    private async createToken(user: User) {
        const visibleUserData = {
            name: user.name,
            email: user.email,
            phone: user.phone
        }
        const token = jwt.sign(visibleUserData, "1234")

        return token
    }

    async auth({email, password}: IUserAuthDTO) {
        const user = await this.userService.readWithEmail(email);

        if(!user) 
            return undefined;
        
        const isCheckedPassword = await this.checkPassword(user, password)
        
        if(!isCheckedPassword)
            return {error: "Senha incorreta!"}
        
        return this.createToken(user)
    }
}