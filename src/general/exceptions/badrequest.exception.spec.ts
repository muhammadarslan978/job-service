import { BadRequestExceptionFilter } from './badrequest.exception'
import { BadRequestException, HttpStatus } from '@nestjs/common'
import { ERROR_CODES, EXCEPTION_MESSAGES } from '../../constant'

// Mock LoggerService
jest.mock('../../modules/logger/service/logger.service', () => {
    return {
        LoggerService: jest.fn().mockImplementation(() => ({
            error: jest.fn(),
        })),
    }
})

describe('BadRequestExceptionFilter', () => {
    let filter: BadRequestExceptionFilter
    let mockJson: jest.Mock<any, any, any>
    let mockStatus: jest.Mock<any, any, any>
    let response: { status: jest.Mock<any, any, any> }

    beforeEach(() => {
        filter = new BadRequestExceptionFilter()
        mockJson = jest.fn()
        mockStatus = jest.fn().mockReturnValue({ json: mockJson })
        response = {
            status: mockStatus,
        }
    })

    it('should catch a BadRequestException and return the correct response format', () => {
        const exception = new BadRequestException(
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

        expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST)
        expect(mockJson).toHaveBeenCalledWith({
            statusCode: HttpStatus.BAD_REQUEST,
            success: false,
            error: {
                code: ERROR_CODES.INVALID_REQUEST,
                message: EXCEPTION_MESSAGES.INVALID_REQUEST,
                details: [
                    {
                        field: 'example',
                        message: 'is invalid',
                    },
                ],
            },
            data: null,
        })
    })
})
