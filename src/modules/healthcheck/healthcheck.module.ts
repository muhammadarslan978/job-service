import { Module } from '@nestjs/common'
import { HealthCheckController } from './controller/healthcheck.controller'

@Module({
    imports: [],
    controllers: [HealthCheckController],
    providers: [],
})
export class HealthCheckModule {}
