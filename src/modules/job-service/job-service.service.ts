import { Injectable } from '@nestjs/common'

@Injectable()
export class JobService {
    async performJob(): Promise<void> {
        // Logic for performing the job goes here
        console.log('Performing job...')
        // Simulating a long-running task
        await new Promise<void>((resolve): void => {
            setTimeout(resolve, 5000)
        })
        console.log('Job completed..')
    }
}
