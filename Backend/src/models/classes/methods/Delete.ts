import { NextFunction, Request, RequestHandler, Response } from "express";
import { Route } from "../Route";
import { Logger } from "../Logger";
import { StandartResponse } from "../StandartResponse";

export class Delete<T> extends Route{
    constructor(
        path: string,
        callback: (req: Request, res: Response, next: NextFunction) => Promise<Response<StandartResponse<T>, Record<string, any>>>,
        middleware?: RequestHandler
        ) {
        super()

        const defaultMiddleware = (req: Request, res: Response, next: NextFunction) => next();

        Route.route.delete(path, middleware ?? defaultMiddleware, callback)
        Logger.send(`DELETE { ${path} } route initialized.`)
    }


}