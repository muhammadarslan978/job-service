import { UnauthorizedExceptionFilter } from './unauthorized.exception'
import { UnauthorizedException, HttpStatus, ForbiddenException } from '@nestjs/common'
import { ERROR_CODES, EXCEPTION_MESSAGES } from '../../constant'

// Mock LoggerService
jest.mock('../../modules/logger/service/logger.service', () => {
    return {
        LoggerService: jest.fn().mockImplementation(() => ({
            error: jest.fn(),
        })),
    }
})

describe('UnauthorizedException', () => {
    let filter: UnauthorizedExceptionFilter
    let mockJson: jest.Mock<any, any, any>
    let mockStatus: jest.Mock<any, any, any>
    let response: { status: jest.Mock<any, any, any> }

    beforeEach(() => {
        filter = new UnauthorizedExceptionFilter()
        mockJson = jest.fn()
        mockStatus = jest.fn().mockReturnValue({ json: mockJson })
        response = {
            status: mockStatus,
        }
    })

    it('should catch a UnauthorizedException and return the correct response format', () => {
        const exception = new UnauthorizedException()
        const host = {
            switchToHttp: () => ({
                getResponse: () => response,
            }),
        }

        filter.catch(exception, host as any)

        expect(mockStatus).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED)
        expect(mockJson).toHaveBeenCalledWith({
            statusCode: HttpStatus.UNAUTHORIZED,
            success: false,
            error: {
                code: ERROR_CODES.UNAUTHORIZED,
                message: EXCEPTION_MESSAGES.UNAUTHORIZED,
                details: [],
            },
            data: null,
        })
    })

    it('should catch a ForbiddenException and return the correct response format', () => {
        const exception = new ForbiddenException()
        const host = {
            switchToHttp: () => ({
                getResponse: () => response,
            }),
        }

        filter.catch(exception, host as any)

        expect(mockStatus).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED)
        expect(mockJson).toHaveBeenCalledWith({
            statusCode: HttpStatus.UNAUTHORIZED,
            success: false,
            error: {
                code: ERROR_CODES.UNAUTHORIZED,
                message: EXCEPTION_MESSAGES.UNAUTHORIZED,
                details: [],
            },
            data: null,
        })
    })
})
