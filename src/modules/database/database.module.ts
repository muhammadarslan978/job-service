import { Module } from '@nestjs/common'
import { databaseProviders } from './providers/database.providers'
import { ConfigModule } from '../config/config.module'
import { LoggerModule } from '../logger/logger.module'

@Module({
    imports: [ConfigModule, LoggerModule],
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}
