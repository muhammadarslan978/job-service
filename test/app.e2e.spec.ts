import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, HttpServer } from '@nestjs/common'
import { AppModule } from '../src/app.module'
import request from 'supertest'

describe('AppModule', () => {
    let app: INestApplication
    let httpServer: HttpServer

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
        httpServer = app.getHttpServer()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be defined', () => {
        expect(app).toBeDefined()
    })

    // Example test to check if a specific filter is working
    // Note: This assumes you have a route that can throw a NotFoundException
    it('should handle not found exception with custom filter', async () => {
        const response = await request(httpServer).get('/non-existent-route')
        expect(response.status).toBe(404)
        // Add more assertions here depending on how your NotFoundExceptionFilter is configured
        // For example, checking the structure of the response body if it's customized by your filter
    })

    // You can add more tests here to cover other filters or overall module configuration
})
