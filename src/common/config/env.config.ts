export const EnvConfigLoader = () => ({
    port: process.env.PORT || 4500,
    resendApiKey: process.env.RESEND_API_KEY,
    notificationEmail: process.env.NOTIFICATION_EMAIL,
    notificationEmailName: process.env.NOTIFICATION_EMAIL_NAME,
    receiveNotificationEmail: process.env.RECEIVE_NOTIFICATION_EMAIL,
    rateLimitTime: Number(process.env.RATE_LIMIT_TIME) || 50000,
    rateLimitRequest: Number(process.env.RATE_LIMIT) || 1,
    admitedOrigin: process.env.ADMITED_ORIGIN || 'http://localhost:4500'
});