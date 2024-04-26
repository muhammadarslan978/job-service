import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { NotFoundExceptionFilter } from './general/exceptions/notfound.exception'
import { InternalServerErrorExceptionFilter } from './general/exceptions/servererror.exception'
import { ConfigModule } from './modules/config/config.module'
import { GeneralExceptionFilter } from './general/exceptions/general.exception'
import { LoggerModule } from './modules/logger/logger.module'
import { UnauthorizedExceptionFilter } from './general/exceptions/unauthorized.exception'
import { BadRequestExceptionFilter } from './general/exceptions/badrequest.exception'
import { DatabaseModule } from './modules/database/database.module'
import { LoggerMiddleware } from './modules/logger/middleware/logger.middleware'
import { ConflictExceptionFilter } from './general/exceptions/conflict.exception'
import { HealthCheckModule } from './modules/healthcheck/healthcheck.module'
import { RemoveInvoicePathMiddleware } from './general/middlewares/removeinvoicepath.middleware'
import { JobService } from './modules/job-service/job-service.service'

@Module({
    imports: [HealthCheckModule, DatabaseModule, ConfigModule, LoggerModule],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: GeneralExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: NotFoundExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: InternalServerErrorExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: UnauthorizedExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: BadRequestExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: ConflictExceptionFilter,
        },
        JobService,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(RemoveInvoicePathMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
        consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL }) // Apply for all routes
    }
}
