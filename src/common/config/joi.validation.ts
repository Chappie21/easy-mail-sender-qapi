import * as joi from 'Joi';

export const JoiValidationSchema = joi.object({
    PORT: joi.number().default(4500),
    RESEND_API_KEY: joi.string().required(),
    NOTIFICATION_EMAIL: joi.string().email().required(),
    NOTIFICATION_EMAIL_NAME: joi.string().required(),
    RECEIVE_NOTIFICATION_EMAIL: joi.string().email().required(),
    RATE_LIMIT_TIME: joi.number().integer().default(60),
    RATE_LIMIT_REQUESTS: joi.number().integer().default(5),
    ADMITED_ORIGIN: joi.string().uri().default('http://localhost:4500')
});