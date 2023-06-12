import express from "express"
import cors from "cors"
import { Route } from "./Route";
import { IController } from "../interfaces/IController";

export class Server{

    private port = 8080;
    private app = express()

    constructor(controllers: IController[] ,port?: number) {
        if(port) {
            this.port = port
        }

        this.app.use(express.json())

        this.app.use(cors({
            origin: "*"
        }))

        this.app.use(Route.route)

        this.app.listen(this.port, () => console.log(`Server is running in port ${this.port} 🚀`))

        controllers.forEach(controller => {
            controller.execute()
        })

        

    }
}