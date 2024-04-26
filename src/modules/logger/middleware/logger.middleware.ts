import { Request, Response, NextFunction } from 'express'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { LoggerService } from '../service/logger.service'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private loggingService: LoggerService) {}

    use(request: Request, response: Response, next: NextFunction): void {
        response.on('finish', (): void => {
            this.loggingService.logRequest(request, response)
        })

        next()
    }
}
