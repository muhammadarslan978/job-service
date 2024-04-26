import { ApiResponseInterceptor } from './apiresponse.interceptor'
import { ExecutionContext, CallHandler } from '@nestjs/common'
import { of } from 'rxjs'
import { ControllerResponse } from 'src/types'

describe('ApiResponseInterceptor', () => {
    let interceptor: ApiResponseInterceptor<any>
    let executionContext: ExecutionContext
    let callHandler: CallHandler

    beforeEach(() => {
        interceptor = new ApiResponseInterceptor()

        executionContext = {
            switchToHttp: () => ({
                getResponse: () => ({
                    statusCode: 200,
                }),
            }),
        } as ExecutionContext

        callHandler = {
            handle: jest.fn().mockReturnValue(of({ data: 'test' } as ControllerResponse<string>)),
        }
    })

    it('should transform the response to match ApiResponse format', (done) => {
        interceptor.intercept(executionContext, callHandler).subscribe((response) => {
            expect(response).toEqual({
                statusCode: 200,
                success: true,
                error: null,
                data: 'test',
            })
            done()
        })

        expect(callHandler.handle).toHaveBeenCalled()
    })
})
