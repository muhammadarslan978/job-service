import { InternalServerErrorExceptionFilter } from './servererror.exception'
import { InternalServerErrorException, HttpStatus } from '@nestjs/common'
import { ERROR_CODES, EXCEPTION_MESSAGES } from '../../constant'

// Mock LoggerService
jest.mock('../../modules/logger/service/logger.service', () => {
    return {
        LoggerService: jest.fn().mockImplementation(() => ({
            error: jest.fn(),
        })),
    }
})

describe('InternalServerErrorException', () => {
    let filter: InternalServerErrorExceptionFilter
    let mockJson: jest.Mock<any, any, any>
    let mockStatus: jest.Mock<any, any, any>
    let response: { status: jest.Mock<any, any, any> }

    beforeEach(() => {
        filter = new InternalServerErrorExceptionFilter()
        mockJson = jest.fn()
        mockStatus = jest.fn().mockReturnValue({ json: mockJson })
        response = {
            status: mockStatus,
        }
    })

    it('should catch a InternalServerErrorException and return the correct response format', () => {
        const exception = new InternalServerErrorException()
        const host = {
            switchToHttp: () => ({
                getResponse: () => response,
            }),
        }

        filter.catch(exception, host as any)

        expect(mockStatus).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
        expect(mockJson).toHaveBeenCalledWith({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            error: {
                code: ERROR_CODES.INTERNAL_SERVER_ERROR,
                message: EXCEPTION_MESSAGES.INTERNAL_SERVER_ERROR,
                details: [],
            },
            data: null,
        })
    })
})
