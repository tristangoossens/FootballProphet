import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, map, Observable } from "rxjs";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(data => { 
                if (typeof data === 'string') {
                    return {
                        statusCode: context.switchToHttp().getResponse().statusCode,
                        message: data
                    }
                }

                return {
                    statusCode: context.switchToHttp().getResponse().statusCode,
                    data: data
                }
            })
        );
    }
}