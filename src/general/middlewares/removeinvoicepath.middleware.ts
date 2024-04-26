import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request } from 'express'
import { ServerContext } from 'src/modules/config/config.types'
import { ConfigService } from 'src/modules/config/service/config.service'

@Injectable()
export class RemoveInvoicePathMiddleware implements NestMiddleware {
    constructor(private configService: ConfigService) {}
    use(request: Request, response: Response, next: NextFunction): void {
        const config = this.configService.getConfig()

        if (config.SERVER.CONTEXT == ServerContext.FARGATE) {
            request.url = request.url.replace(/^\/invoice/, '')
        }
        next()
    }
}
