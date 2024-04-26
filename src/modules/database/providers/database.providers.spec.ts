import { Test } from '@nestjs/testing'
import { DataSource } from 'typeorm'
import { databaseProviders } from './database.providers'
import { ConfigService } from '../../config/service/config.service'
import { LoggerService } from '../../logger/service/logger.service'
import { INJECTION_TOKEN, LOG_CONTEXT } from '../../../constant'
import { mock_config_service, mock_return_value } from '../../../modules/config/mock/config.service.mock'

describe('DatabaseProviders', () => {
    it('should initialize the data source with the correct configuration', async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                ...databaseProviders,
                {
                    provide: ConfigService,
                    useValue: mock_config_service,
                },
                {
                    provide: LoggerService,
                    useValue: {
                        log: jest.fn(),
                        error: jest.fn(),
                    },
                },
            ],
        }).compile()

        // Retrieve instances
        const dataSource = moduleRef.get<DataSource>(INJECTION_TOKEN.DATA_SOURCE)
        const configService = moduleRef.get<ConfigService>(ConfigService)
        const loggingService = moduleRef.get<LoggerService>(LoggerService)
        expect(dataSource.isInitialized).toBe(true)
        expect(configService.getConfig).toHaveBeenCalled()
        expect(loggingService.log).toHaveBeenCalledTimes(2)

        expect(loggingService.log).toHaveBeenNthCalledWith(1, expect.stringContaining('Establishing connection'), LOG_CONTEXT.DATA_SOURCE)
        expect(loggingService.log).toHaveBeenNthCalledWith(2, expect.stringContaining('Established connection'), LOG_CONTEXT.DATA_SOURCE)

        await dataSource.destroy()
    })

    it('should not initialize the data source with the wrong configuration', async () => {
        const wrong_credentials_mock = {
            ...mock_return_value,
            DATABASE: {
                DATABASE_NAME: 'nestjs',
                DATABASE_USERNAME: 'nestjs',
                DATABASE_PASSWORD: 'wrong_pass',
                DATABASE_HOST: 'localhost',
                DATABASE_PORT: 5433,
                SYNC: false,
                RUN_MIGARTIONS: false,
            },
        }
        jest.spyOn(mock_config_service, 'getConfig').mockReturnValueOnce(wrong_credentials_mock)

        try {
            const _moduleRef = await Test.createTestingModule({
                providers: [
                    ...databaseProviders,
                    {
                        provide: ConfigService,
                        useValue: mock_config_service,
                    },
                    {
                        provide: LoggerService,
                        useValue: {
                            log: jest.fn(),
                            error: jest.fn(),
                        },
                    },
                ],
            }).compile()
        } catch (error) {
            expect(error).toBeInstanceOf(Object)
            expect(error.message).toBe('password authentication failed for user "nestjs"')
        }
    })
})
