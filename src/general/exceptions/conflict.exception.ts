import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, ConflictException } from '@nestjs/common'
import { Response } from 'express'
import { ERROR_CODES, EXCEPTION_MESSAGES, LOG_CONTEXT } from '../../constant'
import { LoggerService } from '../../modules/logger/service/logger.service'
import { ApiResponse } from '../../types'

@Catch(ConflictException)
export class ConflictExceptionFilter implements ExceptionFilter {
    catch(exception: ConflictException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response<ApiResponse<any>>>()

        const status = HttpStatus.CONFLICT // You can define a getStatus() method in your CustomException class

        const logger: LoggerService = new LoggerService()
        logger.error(exception.stack, LOG_CONTEXT.REQUEST)

        response.status(status).json({
            statusCode: status,
            success: false,
            error: {
                code: ERROR_CODES.CONFLICT_IN_REQUEST,
                message: EXCEPTION_MESSAGES.CONFLICT_IN_REQUEST,
                details: [JSON.parse(exception.message)],
            },
            data: null,
        })
    }
}
