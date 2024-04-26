import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from './config.service'
import { ConfigModule, ConfigService as NestConfigService } from '@nestjs/config'
import { nest_config_service_mock } from '../mock/nest-config.service.mock'

describe('ConfigService', () => {
    let service: ConfigService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            // ConfigModule could be omitted if not used elsewhere within the tested service
            imports: [ConfigModule],
            providers: [
                ConfigService,
                {
                    provide: NestConfigService,
                    useValue: nest_config_service_mock,
                },
            ],
        }).compile()

        service = module.get<ConfigService>(ConfigService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    it('getConfig should return the correct configuration object', () => {
        const config = service.getConfig()
        expect(config).toEqual({
            DATABASE: {
                DATABASE_NAME: 'test_db',
                DATABASE_USERNAME: 'test_user',
                DATABASE_PASSWORD: 'test_pass',
                DATABASE_HOST: 'test_host',
                DATABASE_PORT: 5432,
                SYNC: false,
                RUN_MIGARTIONS: true,
            },
            SERVER: {
                PORT: 3000,
            },
            AUTH: {
                SECRET_KEY: 'secret',
            },
            REDIS: {
                HOST: 'localhost',
                PASSWORD: 'redis_pass',
                PORT: 6379,
                TTL: 3600,
            },
        })
    })
})
