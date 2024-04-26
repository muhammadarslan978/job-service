import { ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { JoiValidationPipe } from './validation.pipe'
import * as joi from 'joi'

describe('JoiValidationPipe', () => {
    const testSchema = joi.object({
        name: joi.string().min(3).required(),
        age: joi.number().integer().min(18).required(),
    })

    it('should validate and pass a correct object', async () => {
        const pipe = new JoiValidationPipe(testSchema)
        const testData = { name: 'John Doe', age: 25 }

        await expect(pipe.transform(testData, { type: 'body' } as ArgumentMetadata)).resolves.toEqual(testData)
    })

    it('should throw a BadRequestException on invalid data', async () => {
        const pipe = new JoiValidationPipe(testSchema)
        const invalidData = { name: 'JD', age: 17 } // Invalid due to both rules

        await expect(pipe.transform(invalidData, { type: 'body' } as ArgumentMetadata)).rejects.toThrow(BadRequestException)
    })

    it('should include detailed error information on failure', async () => {
        const pipe = new JoiValidationPipe(testSchema)
        const invalidData = { name: 'JD', age: 17 }

        try {
            await pipe.transform(invalidData, { type: 'body' } as ArgumentMetadata)
        } catch (error) {
            expect(error.response).toBeInstanceOf(Object)

            const response = error.response
            expect(response.message).toBeDefined()
            expect(response.error).toBeDefined()
            expect(response.statusCode).toBeDefined()

            const errorDetails = JSON.parse(response.message)
            expect(errorDetails.length).toBe(2) // Two errors: name and age
            expect(errorDetails[0].field).toBe('name')
            expect(errorDetails[1].field).toBe('age')
        }
    })
})
