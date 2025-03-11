import * as joi from 'Joi';

export const JoiValidationSchema = joi.object({
    PORT: joi.number().default(4500)
});