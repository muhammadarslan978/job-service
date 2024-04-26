import { ExceptionFilter, Catch, ArgumentsHost, NotFoundException } from '@nestjs/common'
import { Response } from 'express'
import { ERROR_CODES, EXCEPTION_MESSAGES, LOG_CONTEXT } from '../../constant'
import { LoggerService } from '../../modules/logger/service/logger.service'
import { ApiResponse } from '../../types'

@Catch(NotFoundException) // Replace CustomException with the specific exception you want to handle
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: NotFoundException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response<ApiResponse<any>>>()

        const status = exception.getStatus() // You can define a getStatus() method in your CustomException class

        const logger: LoggerService = new LoggerService()
        logger.error(exception.stack, LOG_CONTEXT.REQUEST)

        response.status(status).json({
            statusCode: status,
            success: false,
            error: {
                code: ERROR_CODES.NOT_FOUND,
                message: EXCEPTION_MESSAGES.NOT_FOUND,
                details: [],
            },
            data: null,
        })
    }
}
