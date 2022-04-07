import { HttpStatusCode } from "@angular/common/http";

export interface IResponse<T>{
    data: T;
    msg: string;
    statusCode: HttpStatusCode;
}