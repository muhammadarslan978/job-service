import { ExceptionFilter, Catch, ArgumentsHost, InternalServerErrorException } from '@nestjs/common'
import { Response } from 'express'
import { ERROR_CODES, EXCEPTION_MESSAGES } from '../../constant'
import { LoggerService } from '../../modules/logger/service/logger.service'

@Catch(InternalServerErrorException) // Replace CustomException with the specific exception you want to handle
export class InternalServerErrorExceptionFilter implements ExceptionFilter {
    catch(exception: InternalServerErrorException, host: ArgumentsHost): void {
        const logger: LoggerService = new LoggerService()
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()

        const status = exception.getStatus() // You can define a getStatus() method in your CustomException class

        logger.error(`${exception.stack}`)

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
