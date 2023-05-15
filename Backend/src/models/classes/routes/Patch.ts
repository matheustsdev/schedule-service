import { NextFunction, Request, RequestHandler, Response } from "express";
import { Route } from "./Route";
import { Logger } from "../Logger";
import { StandartResponse } from "../StandartResponse";

export class Patch<T> extends Route{
    constructor(
        path: string,
        callback: (req: Request, res: Response, next: NextFunction) => Promise<Response<StandartResponse<T>, Record<string, any>>>
        ) {
        super()

        Route.route.patch(path, (req: Request, res: Response<T>, next: NextFunction) => callback(req, res, next))
        Logger.send(`PATCH { ${path} } route initialized.`)
    }


}