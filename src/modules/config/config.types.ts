export enum ServerContext {
    FARGATE = 'Fargate',
    LOCAL = 'Local',
}

export type Config = {
    DATABASE: DatabaseConfig
    SERVER: {
        PORT: number
        CONTEXT: ServerContext
    }
    AUTH: {
        SECRET_KEY: string
    }
    REDIS: RedisConfig
}

export type RedisConfig = {
    HOST: string
    PASSWORD: string | null
    PORT: number
    TTL: number
    USE_TLS: boolean
}

export type DatabaseConfig = {
    DATABASE_NAME: string
    DATABASE_USERNAME: string
    DATABASE_PASSWORD: string
    DATABASE_HOST: string
    DATABASE_REPLICA: string | null
    DATABASE_PORT: number
    SYNC: boolean
    RUN_MIGARTIONS: boolean
}
