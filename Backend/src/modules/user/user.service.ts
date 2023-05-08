import { PrismaClient, User } from "@prisma/client";
import { ICreateUserDTO } from "./dtos/createUser.dto";
import { IUpdateUserDTO } from "./dtos/updateUser.dto";

export class UserService {
    private prisma = new PrismaClient()

    async create(user: ICreateUserDTO): Promise<User> {
        try {
            const createdUser = await this.prisma.user.create({
                data: user
            })

            return createdUser
        } catch(e) {
            console.log(e)
        }

        return {} as User

    }

    async read(userId: string) {
        const user = await this.prisma.user.findMany({
            where: {
                user_id: userId
            }
        })

        return user
    }

    async readWithEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        })

        return user
    }

    async update(userId: string, data: IUpdateUserDTO) {
        const updatedUser = await this.prisma.user.update({
            where: {
                user_id: userId
            }, 
            data: data
        })

        return updatedUser
    }

    async delete(userId: string) {
        const deletedUser = await this.prisma.user.delete({
            where: {
                user_id: userId
            }
        })

        return deletedUser ? deletedUser : {
            error: "E02",
            description: "Erro interno do servidor"
        }
    }
}
