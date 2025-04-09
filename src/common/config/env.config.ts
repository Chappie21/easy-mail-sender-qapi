export const EnvConfigLoader = () => ({
    port: process.env.PORT || 4500,
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpSecure: process.env.SMTP_SECURE,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    notificationEmail: process.env.NOTIFICATION_EMAIL,
    notificationEmailName: process.env.NOTIFICATION_EMAIL_NAME,
    receiveNotificationEmail: process.env.RECEIVE_NOTIFICATION_EMAIL,
    rateLimitTime: Number(process.env.RATE_LIMIT_TIME) || 50000,
    rateLimitRequest: Number(process.env.RATE_LIMIT) || 1,
    admitedOrigin: process.env.ADMITED_ORIGIN || 'http://localhost:4500',
    cloudflareCaptchaSecrectKey: process.env.CLOUDFLARE_CAPTCHA_SECRET_KEY,
    cloudflareCaptchaUrl: process.env.CLOUDFLARE_CAPTCHA_URL
});