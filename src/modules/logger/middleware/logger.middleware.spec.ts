import { Request, Response, NextFunction } from 'express'
import { LoggerMiddleware } from './logger.middleware'
import { LoggerService } from '../service/logger.service'

describe('LoggerMiddleware', () => {
    let loggerMiddleware: LoggerMiddleware
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>
    let mockNextFunction: jest.Mock

    beforeEach(() => {
        mockRequest = {
            get: jest.fn().mockReturnValue('Jest-Agent'),
        }
        mockResponse = {
            on: jest.fn().mockImplementation((event, callback) => {
                if (event === 'finish') {
                    callback()
                }
            }),
            get: jest.fn().mockReturnValue('150'),
        }
        mockNextFunction = jest.fn()
    })

    it('should call logger.logRequest with request and response objects when response finishes', () => {
        const loggerService = new LoggerService()
        loggerMiddleware = new LoggerMiddleware(loggerService)
        jest.spyOn(loggerService, 'log').mockImplementationOnce(() => {})

        const logRequestSpy = jest.spyOn(loggerService, 'logRequest')

        loggerMiddleware.use(mockRequest as Request, mockResponse as Response, mockNextFunction as NextFunction)

        expect(logRequestSpy).toHaveBeenCalledTimes(1)
        expect(logRequestSpy).toHaveBeenCalledWith(mockRequest, mockResponse)
        expect(mockNextFunction).toHaveBeenCalled()
    })
})
