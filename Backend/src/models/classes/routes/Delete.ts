import { RequestHandler } from "express";
import { Route } from "./Route";
import { Logger } from "../Logger";

export class Delete extends Route{
    constructor(path: string, callback: RequestHandler) {
        super()

        Route.route.delete(path, callback)
        Logger.send(`DELETE { ${path} } route initialized.`)
    }


}