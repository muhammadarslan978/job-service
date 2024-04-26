import configSchema from './config.validation'
import { ENV } from 'src/types'

describe('Configuration Validation Schema', () => {
    it('should validate a correct configuration', () => {
        const config: ENV = {
            PORT: 3000,
            DATABASE_HOST: 'localhost',
            DATABASE_PORT: 5432,
            DATABASE_NAME: 'testdb',
            DATABASE_USERNAME: 'user',
            DATABASE_PASSWORD: 'pass',
            DATABASE_SYNC: false,
            DATABASE_RUN_MIGRATION: true,
            REDIS_HOST: 'localhost',
            REDIS_PASSWORD: 'redispass',
            REDIS_PORT: 6379,
            REDIS_TTL: 1000,
            JWT_SECRET_KEY: 'verysecret',
        }

        const { error } = configSchema.validate(config)
        expect(error).toBeUndefined()
    })

    it('should apply default values for optional properties', () => {
        const config = {
            DATABASE_HOST: 'localhost',
            DATABASE_NAME: 'testdb',
            DATABASE_USERNAME: 'user',
            DATABASE_PASSWORD: 'pass',
            REDIS_HOST: 'localhost',
            REDIS_PASSWORD: 'redispass',
            JWT_SECRET_KEY: 'verysecret',
        }

        const { value, error } = configSchema.validate(config, { abortEarly: false })
        expect(error).toBeUndefined()
        expect(value).toMatchObject({
            PORT: 3000,
            DATABASE_PORT: 5432,
            REDIS_PORT: 6379,
            REDIS_TTL: 1000,
        })
    })

    it('Check all Required attributes', () => {
        const config = {}

        const { error } = configSchema.validate(config, { abortEarly: false })

        expect(error).toBeDefined()
        expect(error.details).toHaveLength(7) // Expecting 7 errors due to missing required fields
    })

    it('should reject configurations with incorrect types', () => {
        const config = {
            PORT: 'not-a-number',
            DATABASE_PORT: 'also-not-a-number',
            REDIS_PORT: 'still-not-a-number',
            REDIS_TTL: 'nope',
            JWT_SECRET_KEY: 12345, // Should be a string
        }

        const { error } = configSchema.validate(config, { abortEarly: false })

        expect(error).toBeDefined()
        // Check for specific type errors if desired
    })
})
