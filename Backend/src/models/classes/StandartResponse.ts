import { EErrorCode } from "../enums/EErrorCode";
import { EResponseStatus } from "../enums/EResponseStatus";

export class StandartResponse<T> {
    public status: EResponseStatus;
    public data: T;
    public error?: {
        code: EErrorCode;
        message: string;
    }

    private response: T;

    constructor(status: EResponseStatus, data: T, error?: { code: EErrorCode, message: string }) {
        this.status = status;
        this.data = data;
        this.error = error;

        this.response = {} as T;
    }
}