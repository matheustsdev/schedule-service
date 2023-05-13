import { NextFunction, Request, RequestHandler, Response,  } from "express";
import { Route } from "./Route";
import { Logger } from "../Logger";
import { StandartResponse } from "../StandartResponse";

export class Get<T> extends Route{
    constructor(
        path: string,
        callback: (req: Request, res: Response, next: NextFunction) => Promise<Response<StandartResponse<T>, Record<string, any>>>
        ) {
        super()

        Route.route.get(path,callback)
        Logger.send(`GET { ${path} } route initialized.`)
    }
    

}