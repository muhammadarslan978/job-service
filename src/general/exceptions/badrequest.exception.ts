import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { ERROR_CODES, EXCEPTION_MESSAGES, LOG_CONTEXT } from '../../constant'
import { LoggerService } from '../../modules/logger/service/logger.service'
import { ApiResponse } from '../../types'

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response<ApiResponse<any>>>()

        const status = HttpStatus.BAD_REQUEST // You can define a getStatus() method in your CustomException class

        const logger: LoggerService = new LoggerService()
        logger.error(exception.stack, LOG_CONTEXT.REQUEST)

        let error_details = []
        try {
            error_details = JSON.parse(exception.message)
        } catch (err) {}

        response.status(status).json({
            statusCode: status,
            success: false,
            error: {
                code: ERROR_CODES.INVALID_REQUEST,
                message: EXCEPTION_MESSAGES.INVALID_REQUEST,
                details: error_details,
            },
            data: null,
        })
    }
}
