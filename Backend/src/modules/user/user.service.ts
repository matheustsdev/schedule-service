import { AuthToken, User } from "@prisma/client";
import { ICreateUserDTO } from "./dtos/createUser.dto";
import { IUpdateUserDTO } from "./dtos/updateUser.dto";
import { IServiceCRUD } from "../../models/interfaces/IServiceCRUD";
import { AuthService } from "../auth/auth.service";
import { hashSync } from "bcrypt";
import { Prisma } from "../../models/classes/Prisma";
import { IService } from "../../models/interfaces/IService";

export class UserService implements IService {
    private prisma = Prisma.client
    private authService = new AuthService()

    async create(user: ICreateUserDTO): Promise<{jwt: string, auth_token: string} | null> {
        try {
            const test = await this.readWithEmail(user.email)

            if(!!test) return null;
            
            const hashToken = hashSync(user.email, user.salt)
            
            const createdUser = await this.prisma.user.create({
                data: {
                    ...user,
                    AuthToken: {
                        create: {
                            token: hashToken,
                            expiration_date: new Date(Date.now() + this.authService.milisecondsInterval)
                        }
                    }
                },
                include: {
                    AuthToken: true,
                }
            });

            const jwt = await this.authService.createJWT(createdUser)
        
            return {jwt, auth_token: createdUser.AuthToken[0].token};
        } catch (error) {
            console.log(error);
            return null;
        }
        
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

    async readWithRole(role: string): Promise<User[]> {
        const users = await this.prisma.user.findMany({
            where: {
                role
            },
            include: {
                WorkersServices: true
            }
        })

        return users
    }
}
