import { compare } from "bcrypt";
import { IUserAuthDTO } from "./dtos/userAuth.dto";
import { PrismaClient, User } from "@prisma/client";
import { UserService } from "../user/user.service";
import { hash } from "bcrypt"
import jwt from "jsonwebtoken";
import { IService } from "../../models/interfaces/IService";
import { IAuthResponseDTO } from "./dtos/authResponse.dto";

export class AuthService implements IService {
    private prisma = new PrismaClient()

    public milisecondsInterval = 7 * 24 * 60 * 60 * 1000; // 7 days

    private async checkPassword(user: User, triedPassword: string) {

        const isAuthorized = await compare(triedPassword, user.password)

        return isAuthorized
    }

    private async createJWT(user: User) {
        const visibleUserData = {
            name: user.name,
            email: user.email,
            phone: user.phone
        }
        const token = jwt.sign(visibleUserData, "1234")

        return token
    }

    async auth({email, password}: IUserAuthDTO) {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            },
            include: {
                AuthToken: true
            }
        })

        if(!user) 
            return undefined;
        
        const isCheckedPassword = await this.checkPassword(user, password)
        
        if(!isCheckedPassword)
            return {error: "Senha incorreta!"}
        
        const authResponse: IAuthResponseDTO = {
            jwt: await this.createJWT(user),
            auth_token: user.AuthToken[0].token
        } 
        
        return authResponse
    }

    async checkAuthToken(authToken: string) {
        const authTokenCount = await this.prisma.authToken.count({
            where: {
                token: authToken
            }
        })

        return !!authTokenCount
    }

    async updateAuthToken(authToken: string) {
        const userResponse = await this.prisma.authToken.findUnique({
            where: {
                token: authToken
            },
            select: {
                User: true
            }
        })

        if(!userResponse)
            return null;

        const user = userResponse.User
        const newToken = await hash(user.email, new Date().getTime())

        const updatedToken = await this.prisma.authToken.update({
            where: {
                token: authToken
            },
            data: {
                token: newToken,
                expiration_date: new Date(new Date().getTime() + this.milisecondsInterval)
            }
        });

        return updatedToken.token
    }

    async createAuthToken(userId: string) {
        const createdAuthToken = this.prisma.authToken.create({
            data: {
                user_id_fk: userId,
                expiration_date: new Date(new Date().getTime() + this.milisecondsInterval),
                token: await hash(userId, new Date().getTime())
            }
        })

        return createdAuthToken
    }
}