import { EResponseStatus } from "../enums/EResponseStatus";

export interface CustomResponse<T> {
    status: EResponseStatus;
    data: T;
    message: string;
}