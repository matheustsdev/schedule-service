import { RequestHandler } from "express";
import { Route } from "./Route";
import { Logger } from "../Logger";

export class Get extends Route{
    constructor(path: string, callback: RequestHandler) {
        super()

        Route.route.get(path, callback)
        Logger.send(`GET { ${path} } route initialized.`)
    }


}