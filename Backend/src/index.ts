import  { Request, Response } from "express"
import { Get } from "./Get";
import { Server } from "./Server";
import { PrismaClient, User } from "@prisma/client";


const server = new Server()

const route = server.route

new Get(route, "/", async (request: Request, response: Response) => {
    const query = request.query
    const prisma = new PrismaClient()

    let users: User[] = []

    if(query.name) {
        users = await prisma.user.findMany({
         where: {
             name: query.name.toString()
         }
        })

    } else {
        users = await prisma.user.findMany()
    }

   return response.json(users)
})