import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { ERROR_CODES, EXCEPTION_MESSAGES } from '../../constant'
import { LoggerService } from '../../modules/logger/service/logger.service'
import { ApiResponse } from '../../types'

@Catch() // Replace CustomException with the specific exception you want to handle
export class GeneralExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost): void {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response<ApiResponse<any>>>()

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

        const logger: LoggerService = new LoggerService()

        logger.error(exception.stack)

        response.status(status).json({
            statusCode: status,
            success: false,
            error: {
                code: ERROR_CODES.INTERNAL_SERVER_ERROR,
                message: EXCEPTION_MESSAGES.INTERNAL_SERVER_ERROR,
                details: [],
            },
            data: null,
        })
    }
}
