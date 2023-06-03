import { PrismaClient } from "@prisma/client";

export class Prisma {
    public static readonly client = new PrismaClient();
}