import { Config, ServerContext } from '../config.types'

export const mock_return_value: Config = {
    DATABASE: {
        DATABASE_NAME: 'nestjs',
        DATABASE_USERNAME: 'nestjs',
        DATABASE_PASSWORD: 'nestjs',
        DATABASE_HOST: 'localhost',
        DATABASE_PORT: 5433,
        SYNC: false,
        RUN_MIGARTIONS: false,
        DATABASE_REPLICA: null,
    },
    SERVER: {
        PORT: 3000,
        CONTEXT: ServerContext.FARGATE,
    },
    AUTH: {
        SECRET_KEY: 'JWT_SECRET_KEY',
    },
    REDIS: {
        HOST: 'localhost',
        PASSWORD: 'REDIS_PASSWORD',
        PORT: 6379,
        TTL: 300,
        USE_TLS: false,
    },
}

export const mock_config_service = {
    getConfig: jest.fn().mockReturnValue(mock_return_value),
}
