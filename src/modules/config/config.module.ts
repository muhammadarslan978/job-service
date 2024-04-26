import { Module } from '@nestjs/common'

import { ConfigModule as NestConfigModule } from '@nestjs/config'

import configValidation from './validation/config.validation'
import { ConfigService } from './service/config.service'

@Module({
    imports: [
        NestConfigModule.forRoot({
            validationSchema: configValidation,
        }),
    ],
    providers: [ConfigService],
    exports: [ConfigService],
})
export class ConfigModule {}
