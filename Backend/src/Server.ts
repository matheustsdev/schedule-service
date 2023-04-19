import express, { Router } from "express"

export class Server {

    private port = 8080;
    private app = express()
    public route = Router()

    constructor(port?: number) {
        if(port) {
            this.port = port
        }

        this.app.listen(this.port, () => console.log(`Server is running in port ${this.port} 🚀`))
        this.app.use(this.route)

    }
}