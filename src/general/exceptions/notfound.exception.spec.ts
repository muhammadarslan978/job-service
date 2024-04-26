import { NotFoundExceptionFilter } from './notfound.exception'
import { NotFoundException, HttpStatus } from '@nestjs/common'
import { ERROR_CODES, EXCEPTION_MESSAGES } from '../../constant'

// Mock LoggerService
jest.mock('../../modules/logger/service/logger.service', () => {
    return {
        LoggerService: jest.fn().mockImplementation(() => ({
            error: jest.fn(),
        })),
    }
})

describe('NotFoundExceptionFilter', () => {
    let filter: NotFoundExceptionFilter
    let mockJson: jest.Mock<any, any, any>
    let mockStatus: jest.Mock<any, any, any>
    let response: { status: jest.Mock<any, any, any> }

    beforeEach(() => {
        filter = new NotFoundExceptionFilter()
        mockJson = jest.fn()
        mockStatus = jest.fn().mockReturnValue({ json: mockJson })
        response = {
            status: mockStatus,
        }
    })

    it('should catch a NotFoundException and return the correct response format', () => {
        const exception = new NotFoundException(
            JSON.stringify([
                {
                    field: 'example',
                    message: 'is invalid',
                },
            ]),
        )
        const host = {
            switchToHttp: () => ({
                getResponse: () => response,
            }),
        }

        filter.catch(exception, host as any)

        expect(mockStatus).toHaveBeenCalledWith(HttpStatus.NOT_FOUND)
        expect(mockJson).toHaveBeenCalledWith({
            statusCode: HttpStatus.NOT_FOUND,
            success: false,
            error: {
                code: ERROR_CODES.NOT_FOUND,
                message: EXCEPTION_MESSAGES.NOT_FOUND,
                details: [],
            },
            data: null,
        })
    })
})
