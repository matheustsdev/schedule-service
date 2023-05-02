import { RequestHandler } from "express";
import { Route } from "./Route";
import { Logger } from "../Logger";

export class Patch extends Route{
    constructor(path: string, callback: RequestHandler) {
        super()

        Route.route.patch(path, callback)
        Logger.send(`PATCH { ${path} } route initialized.`)
    }


}