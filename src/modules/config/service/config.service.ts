import { Injectable } from '@nestjs/common'
import { ConfigService as NestConfigService } from '@nestjs/config'
import { Config, DatabaseConfig, ServerContext } from '../config.types'

@Injectable()
export class ConfigService {
    private config: Config
    constructor(private configService: NestConfigService) {}

    getConfig(): Config {
        if (!this.config) {
            this.config = {
                DATABASE: this.getDatabaseConfig(),
                SERVER: {
                    PORT: this.configService.get('PORT'),
                    CONTEXT: this.configService.get('CONTEXT') ?? ServerContext.LOCAL,
                },
                AUTH: {
                    SECRET_KEY: this.configService.get('JWT_SECRET_KEY'),
                },
                REDIS: {
                    HOST: this.configService.get('REDIS_HOST'),
                    PASSWORD: this.configService.get('REDIS_PASSWORD') ?? null,
                    PORT: this.configService.get('REDIS_PORT'),
                    TTL: this.configService.get('REDIS_TTL'),
                    USE_TLS: this.configService.get('REDIS_USE_TLS'),
                },
            }
        }
        return this.config
    }

    private getDatabaseConfig(): DatabaseConfig {
        const database_secret = this.configService.get('DATABASE_SECRET')
        let parsed_database_secret: DatabaseSecret

        if (database_secret) {
            parsed_database_secret = DatabaseSecret.fromJSON(database_secret)
        }

        return {
            DATABASE_NAME: this.configService.get('DATABASE_NAME'),
            DATABASE_USERNAME: parsed_database_secret?.username ?? this.configService.get('DATABASE_USERNAME'),
            DATABASE_PASSWORD: parsed_database_secret?.password ?? this.configService.get('DATABASE_PASSWORD'),
            DATABASE_HOST: this.configService.get('DATABASE_HOST'),
            DATABASE_REPLICA: this.configService.get('DATABASE_REPLICA') ?? null,
            DATABASE_PORT: this.configService.get('DATABASE_PORT'),
            SYNC: this.configService.get('DATABASE_SYNC'),
            RUN_MIGARTIONS: this.configService.get('DATABASE_RUN_MIGRATION'),
        }
    }
}

class DatabaseSecret {
    username: string
    password: string

    static fromJSON(text: string): DatabaseSecret {
        return JSON.parse(text) as DatabaseSecret
    }
}
