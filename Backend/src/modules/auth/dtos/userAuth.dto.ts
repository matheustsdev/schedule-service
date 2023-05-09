import { User } from "@prisma/client";

export interface IUserAuthDTO {
    email: string;
    password: string;
}