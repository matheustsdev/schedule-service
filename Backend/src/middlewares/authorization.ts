import { NextFunction, Request, Response } from "express";
import { EResponseStatus } from "../models/enums/EResponseStatus";
import { StandartResponse } from "../models/classes/StandartResponse";
import { EErrorCode } from "../models/enums/EErrorCode";
import { PrismaClient } from "@prisma/client";

export async function authorizationMiddleware(request: Request, response: Response, next: NextFunction) {
    const prismaClient = new PrismaClient()

    const { authorization } = request.headers

    if(!authorization)
        return response.status(401).json(new StandartResponse(EResponseStatus.ERROR, {}, {
            code: EErrorCode.MISSING_HEADER_DATA,
            message: "Token de autorização não informado."
        })
        )
        
    const token = await prismaClient.authToken.findUnique({
        where: {
            token: authorization
        }
    })
    
    if(!token)
        return response.status(401).json(new StandartResponse(EResponseStatus.ERROR, {}, {
            code: EErrorCode.AUTHORIZATION_ERROR,
            message: "Token de autorização inválido."
        })
        )

    return next()
}