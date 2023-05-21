import { AuthToken, PrismaClient, User } from "@prisma/client";
import { ICreateUserDTO } from "./dtos/createUser.dto";
import { IUpdateUserDTO } from "./dtos/updateUser.dto";
import { IServiceCRUD } from "../../models/interfaces/IServiceCRUD";
import { AuthService } from "../auth/auth.service";

export class UserService implements IServiceCRUD<User, ICreateUserDTO, IUpdateUserDTO> {
    private prisma = new PrismaClient()
    private authService = new AuthService()

    async create(user: ICreateUserDTO): Promise<User> {
        const createdUser = await this.prisma.user.create({
            data: user
        });

        const authToken = await this.authService.createAuthToken(createdUser.user_id);

        return createdUser;
    }

    async read(userId: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                user_id: userId
            }
        })

        return user
    }

    async update(userId: string, data: IUpdateUserDTO): Promise<User> {
        const updatedUser = await this.prisma.user.update({
            where: {
                user_id: userId
            }, 
            data: data
        })

        return updatedUser
    }

    async delete(userId: string): Promise<User> {
        const deletedUser = await this.prisma.user.delete({
            where: {
                user_id: userId
            }
        })

        return deletedUser;
    }
 
    async readWithEmail(email: string): Promise<User & {AuthToken: AuthToken[]} | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            },
            include: {
                AuthToken: true
            }
        })

        return user
    }
}
