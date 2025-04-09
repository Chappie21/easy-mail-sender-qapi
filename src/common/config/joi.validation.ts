import * as joi from 'joi';

export const JoiValidationSchema = joi.object({
    PORT: joi.number().default(4500),
    SMTP_HOST: joi.string().required(),
    SMTP_PORT: joi.number().required(),
    SMTP_SECURE: joi.bool().required(),
    SMTP_USER: joi.string().required(),
    SMTP_PASS: joi.string().required(),
    NOTIFICATION_EMAIL: joi.string().email().required(),
    NOTIFICATION_EMAIL_NAME: joi.string().required(),
    RECEIVE_NOTIFICATION_EMAIL: joi.string().email().required(),
    RATE_LIMIT_TIME: joi.number().integer().default(60),
    RATE_LIMIT_REQUESTS: joi.number().integer().default(5),
    ADMITED_ORIGIN: joi.string().uri().default('http://localhost:4500'),
    CLOUDFLARE_CAPTCHA_SECRET_KEY: joi.string().required(),
    CLOUDFLARE_CAPTCHA_URL: joi.string().uri().required()
});