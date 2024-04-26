import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Response } from 'express'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ApiResponse, ControllerResponse } from 'src/types'

@Injectable()
export class ApiResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
        return next.handle().pipe(
            map((controllerResponse: ControllerResponse<T>): ApiResponse<T> => {
                const response = context.switchToHttp().getResponse<Response>()
                return {
                    statusCode: response.statusCode,
                    success: true,
                    error: null,
                    data: controllerResponse.data,
                }
            }),
        )
    }
}
