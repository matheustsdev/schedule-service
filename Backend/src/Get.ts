import { RequestHandler, Router } from "express";

export class Get {
    constructor(route: Router, path: string, callback: RequestHandler) {
        route.get(path, callback)

        console.log(`>>> Get route ${path} created!`)
    }


}