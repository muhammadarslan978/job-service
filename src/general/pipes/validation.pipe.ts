// validation.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { NumberSchema, ObjectSchema } from 'joi'
import { InvalidRequestErrorDetails } from 'src/types'

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    validationSchema: ObjectSchema | NumberSchema
    constructor(validationSchema: ObjectSchema | NumberSchema) {
        this.validationSchema = validationSchema
    }

    async transform(value: any, _metadata: ArgumentMetadata): Promise<any> {
        const { error } = this.validationSchema.validate(value, {
            convert: true,
            allowUnknown: false,
            abortEarly: false,
        })
        if (error) {
            throw new BadRequestException(
                JSON.stringify(
                    error.details.map(
                        (detail): InvalidRequestErrorDetails => ({
                            field: detail.context.key,
                            message: detail.message,
                        }),
                    ),
                ),
            )
        }

        return value
    }
}
