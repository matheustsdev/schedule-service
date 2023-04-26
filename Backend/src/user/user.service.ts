import { PrismaClient } from "@prisma/client";

export class UserService {
    private prisma = new PrismaClient()

    async create() {
        const addedUser = await this.prisma.user.create({})

        return addedUser
    }

    async read(userId: string) {
        const user = await this.prisma.user.find({
            where: {
                userId
            }
        })

        return user
    }

    async update() {
        const updatedUser = await this.prisma.user.update({})
    }

    async delete(userId: string) {
        const deletedUser = await this.prisma.user.delete({
            where: {
                userId
            }
        })

        return deletedUser ? "User deleted" : "Error"
    }

}
