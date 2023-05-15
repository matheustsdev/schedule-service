export interface ICreateUserDTO {
    email: string;
    salt: string;
    password: string;
    name: string;
    phone?: string;
    role?: string
}