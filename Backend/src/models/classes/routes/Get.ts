import { RequestHandler, Router } from "express";
import { Route } from "./Route";

export class Get extends Route{
    constructor(path: string, callback: RequestHandler) {
        super()

        Route.route.get(path, callback)
        console.log(`>>> Get route ${path} created!`)
    }


}