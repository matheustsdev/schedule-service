import { compare } from "bcrypt";
import { IUserAuthDTO } from "./dtos/userAuth.dto";
import { PrismaClient } from "@prisma/client";

export class AuthService {
    private prisma = new PrismaClient()

    async auth({email, hashPassword, receivedPassword, salt}: IUserAuthDTO) {

        const isAuthorized = await compare(receivedPassword, hashPassword)

        console.log(isAuthorized)
    }
}