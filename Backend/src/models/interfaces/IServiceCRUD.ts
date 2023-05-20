import { IService } from "./IService";

export interface IServiceCRUD<T, C, U> extends IService {
    create(createDTO: C): Promise<T>;
    read(id: string): Promise<T | null>;
    update(id: string, updateDTO: U): Promise<T>;
    delete(id: string): Promise<T>;
}