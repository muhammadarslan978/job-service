import { INJECTION_TOKEN, LOG_CONTEXT, REPOSITORY } from '../../../constant'
import { DataSource, Repository } from 'typeorm'
import { ConfigService } from '../../config/service/config.service'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { LoggerService } from '../../logger/service/logger.service'
import { Config } from 'src/modules/config/config.types'

export const databaseProviders = [
    {
        provide: INJECTION_TOKEN.DATA_SOURCE,
        useFactory: async (configService: ConfigService, logger: LoggerService): Promise<DataSource> => {
            try {
                const config: Config = configService.getConfig()

                const ormconfig: PostgresConnectionOptions = {
                    database: config.DATABASE.DATABASE_NAME,
                    type: 'postgres',
                    username: config.DATABASE.DATABASE_USERNAME,
                    password: config.DATABASE.DATABASE_PASSWORD,
                    host: config.DATABASE.DATABASE_HOST,
                    replication: getPostgresReplication(config),
                    port: config.DATABASE.DATABASE_PORT,
                    logging: ['error', 'migration', 'schema', 'warn'],
                    synchronize: config.DATABASE.SYNC,
                    migrationsRun: config.DATABASE.RUN_MIGARTIONS,
                    entities: [__dirname + '/../entity/**/*.js'],
                    migrations: [__dirname + '/../migrations/**/*.js'],
                    subscribers: [],
                }

                logger.log(`Establishing connection to ${config.DATABASE.DATABASE_HOST}:${config.DATABASE.DATABASE_PORT}`, LOG_CONTEXT.DATA_SOURCE)

                const dataSource = new DataSource(ormconfig)
                const connection = await dataSource.initialize()

                logger.log('Established connection', LOG_CONTEXT.DATA_SOURCE)

                return connection
            } catch (err) {
                logger.error(`Failed to establish connection to DataSource: ${err.message}`, LOG_CONTEXT.DATA_SOURCE)
                throw err
            }
        },
        inject: [ConfigService, LoggerService],
    },
]

function getPostgresReplication(config: Config): PostgresConnectionOptions['replication'] {
    if (config.DATABASE.DATABASE_REPLICA) {
        return {
            master: {
                host: config.DATABASE.DATABASE_HOST,
                port: config.DATABASE.DATABASE_PORT,
                database: config.DATABASE.DATABASE_NAME,
                username: config.DATABASE.DATABASE_USERNAME,
                password: config.DATABASE.DATABASE_PASSWORD,
            },
            slaves: [
                {
                    host: config.DATABASE.DATABASE_REPLICA,
                    port: config.DATABASE.DATABASE_PORT,
                    database: config.DATABASE.DATABASE_NAME,
                    username: config.DATABASE.DATABASE_USERNAME,
                    password: config.DATABASE.DATABASE_PASSWORD,
                },
            ],
        }
    }
    return {
        master: {
            host: config.DATABASE.DATABASE_HOST,
            port: config.DATABASE.DATABASE_PORT,
            database: config.DATABASE.DATABASE_NAME,
            username: config.DATABASE.DATABASE_USERNAME,
            password: config.DATABASE.DATABASE_PASSWORD,
        },
        slaves: [],
    }
}
