import { LoggerService } from './logger.service'
import { Request, Response } from 'express'

describe('LoggerService', () => {
    let loggingService: LoggerService
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>

    beforeEach(() => {
        loggingService = new LoggerService()

        mockRequest = {
            ip: '127.0.0.1',
            method: 'GET',
            originalUrl: '/test',
            get: jest.fn().mockImplementation((header: string) => {
                if (header === 'user-agent') {
                    return 'TestAgent'
                }
                return ''
            }),
        }

        mockResponse = {
            statusCode: 200,
            get: jest.fn((header: string) => {
                if (header === 'content-length') {
                    return '123'
                }
            }),
        }
    })

    it('should log the request', () => {
        const logSpy = jest.spyOn(loggingService, 'log').mockImplementationOnce(() => {})

        loggingService.logRequest(mockRequest as Request, mockResponse as Response)

        expect(logSpy).toHaveBeenCalledWith('GET /test 200 123 - TestAgent 127.0.0.1', 'Request')
    })

    it('should log the request', () => {
        const logSpy = jest.spyOn(loggingService, 'log').mockImplementationOnce(() => {})

        jest.spyOn(mockRequest, 'get').mockReturnValueOnce(undefined)

        loggingService.logRequest(mockRequest as Request, mockResponse as Response)

        expect(logSpy).toHaveBeenCalledWith('GET /test 200 123 - No-Agent 127.0.0.1', 'Request')
    })
})
