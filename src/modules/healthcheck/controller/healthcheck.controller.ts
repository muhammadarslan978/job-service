/* eslint-disable prettier/prettier */
import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { ApiResponseInterceptor } from '../../../general/interceptors/apiresponse.interceptor'
import { ControllerResponse } from '../../../types'

@Controller()
export class HealthCheckController {
    constructor() {}

    @Get()
    @UseInterceptors(ApiResponseInterceptor<any>)
    async getById(): Promise<ControllerResponse<any>> {
        return { data: 'Invoice service is working' }
    }
}
