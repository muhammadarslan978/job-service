import { ConsoleLogger, Injectable } from '@nestjs/common'
import { Request, Response } from 'express'
import { LOG_CONTEXT } from '../../../constant'

@Injectable()
export class LoggerService extends ConsoleLogger {
    constructor() {
        super()
    }

    logRequest(request: Request, response: Response): void {
        const { ip, method, url } = request
        const userAgent = request.get('user-agent') || 'No-Agent'
        const { statusCode } = response
        const contentLength = response.get('content-length')

        this.log(`${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`, LOG_CONTEXT.REQUEST)
    }
}
