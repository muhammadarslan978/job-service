import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import { JobService } from './modules/job-service/job-service.service'

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)

    const job_service = app.get(JobService)

    await job_service.performJob()
    // Gracefully shut down the application
    await app.close()
}

bootstrap()
