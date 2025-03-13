import * as joi from 'Joi';

export const JoiValidationSchema = joi.object({
    PORT: joi.number().default(4500),
    RESEND_API_KEY: joi.string().required(),
    NOTIFICATION_EMAIL: joi.string().email().required(),
    NOTIFICATION_EMAIL_NAME: joi.string().required(),
    RECEIVE_NOTIFICATION_EMAIL: joi.string().email().required(),
});