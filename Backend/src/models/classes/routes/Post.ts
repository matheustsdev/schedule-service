import { RequestHandler } from "express";
import { Route } from "./Route";
import { Logger } from "../Logger";

export class Post extends Route{
    constructor(path: string, callback: RequestHandler) {
        super()

        Route.route.post(path, callback)
        Logger.send(`POST { ${path} } route initialized.`)
    }


}