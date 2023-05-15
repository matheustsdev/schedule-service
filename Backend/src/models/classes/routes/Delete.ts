import { NextFunction, Request, RequestHandler, Response } from "express";
import { Route } from "./Route";
import { Logger } from "../Logger";
import { StandartResponse } from "../StandartResponse";

export class Delete<T> extends Route{
    constructor(
        path: string,
        callback: (req: Request, res: Response, next: NextFunction) => Promise<Response<StandartResponse<T>, Record<string, any>>>
        ) {
        super()

        Route.route.delete(path, (req: Request, res: Response<T>, next: NextFunction) => callback(req, res, next))
        Logger.send(`DELETE { ${path} } route initialized.`)
    }


}