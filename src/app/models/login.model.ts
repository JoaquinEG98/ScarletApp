import { IUser } from './user.model';
export interface ILogin{
    token: string;
    user: IUser
}