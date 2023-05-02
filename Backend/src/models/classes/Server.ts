import express from "express"
import { Route } from "./routes/Route";
import { Controller } from "../interfaces/Controller";

export class Server{

    private port = 8080;
    private app = express()

    constructor(controllers: Controller[] ,port?: number) {
        if(port) {
            this.port = port
        }

        this.app.listen(this.port, () => console.log(`Server is running in port ${this.port} 🚀`))
        
        this.app.use(express.json())

        this.app.use(Route.route)

        controllers.forEach(controller => {
            controller.execute()
        })

        

    }
}