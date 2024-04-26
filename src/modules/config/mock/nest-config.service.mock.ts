import { ENV } from '../../../types'

export const config_values: ENV = {
    DATABASE_NAME: 'test_db',
    DATABASE_USERNAME: 'test_user',
    DATABASE_PASSWORD: 'test_pass',
    DATABASE_HOST: 'test_host',
    DATABASE_PORT: 5432,
    DATABASE_SYNC: false,
    DATABASE_RUN_MIGRATION: true,
    PORT: 3000,
    JWT_SECRET_KEY: 'secret',
    REDIS_HOST: 'localhost',
    REDIS_PASSWORD: 'redis_pass',
    REDIS_PORT: 6379,
    REDIS_TTL: 3600,
    REDIS_USE_TLS: false,
}

export const nest_config_service_mock = {
    get: jest.fn(<K extends keyof ENV>(key: K): ENV[K] | null => {
        return config_values[key] ?? null // Returns `null` if key is not found, mimicking your default case
    }),
}
