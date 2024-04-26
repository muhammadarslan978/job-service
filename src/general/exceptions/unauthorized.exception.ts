import { ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException, ForbiddenException, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { ERROR_CODES, EXCEPTION_MESSAGES } from '../../constant'
import { LoggerService } from '../../modules/logger/service/logger.service'
import { ApiResponse } from '../../types'

@Catch(UnauthorizedException, ForbiddenException) // Replace CustomException with the specific exception you want to handle
export class UnauthorizedExceptionFilter implements ExceptionFilter {
    catch(exception: UnauthorizedException | ForbiddenException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response<ApiResponse<any>>>()

        const status = HttpStatus.UNAUTHORIZED // You can define a getStatus() method in your CustomException class

        const logger: LoggerService = new LoggerService()
        logger.error(exception.stack)

        response.status(status).json({
            statusCode: status,
            success: false,
            error: {
                code: ERROR_CODES.UNAUTHORIZED,
                message: EXCEPTION_MESSAGES.UNAUTHORIZED,
                details: [],
            },
            data: null,
        })
    }
}
