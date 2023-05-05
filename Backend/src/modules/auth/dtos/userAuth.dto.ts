export interface IUserAuthDTO {
    email: string;
    salt: string;
    receivedPassword: string;
    hashPassword: string;
}