import express, { Request, Response, Router } from "express"
import { Get } from "./Get";
import { Server } from "./Server";


const server = new Server()

const route = server.route

new Get(route, "/", (request: Request, response: Response) => {
    const user = {
        name: "Livia",
        age: 10
    }

    return response.json(user)
})