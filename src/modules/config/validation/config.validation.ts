import * as joi from 'joi'
import { ServerContext } from '../config.types'

export default joi.object({
    PORT: joi.number().default(3000),
    CONTEXT: joi.string().optional().valid(ServerContext.FARGATE, ServerContext.LOCAL),
    DATABASE_SECRET: joi.string().optional(),
    DATABASE_HOST: joi.string().required(),
    DATABASE_REPLICA: joi.string().optional(),
    DATABASE_PORT: joi.number().default(5432),
    DATABASE_NAME: joi.string().required(),
    DATABASE_USERNAME: joi.when('DATABASE_SECRET', {
        is: joi.exist(),
        then: joi.string().optional(),
        otherwise: joi.string().required(),
    }),
    DATABASE_PASSWORD: joi.when('DATABASE_SECRET', {
        is: joi.exist(),
        then: joi.string().optional(),
        otherwise: joi.string().required(),
    }),
    DATABASE_SYNC: joi.boolean().default(false),
    DATABASE_RUN_MIGRATION: joi.boolean().default(true),
    REDIS_HOST: joi.string().required(),
    REDIS_PASSWORD: joi.string().optional(),
    REDIS_PORT: joi.number().default(6379),
    REDIS_TTL: joi.number().default(1000),
    REDIS_USE_TLS: joi.boolean().default(false),
    JWT_SECRET_KEY: joi.string().optional(),
})
