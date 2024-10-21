import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { IResponse } from "./type";

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, IResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<IResponse<T>> {
        return next.handle().pipe(
            map((data) => {
                return {
                    data,
                    timestamp: new Date().getTime(),
                };
            }),
            catchError((error) => {
                throw error;
            })
        );
    }
}
