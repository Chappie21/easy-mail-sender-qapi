export const EnvConfigLoader = () => ({
    port: process.env.PORT || 4500,
    resendApiKey: process.env.RESEND_API_KEY,
    notificationEmail: process.env.NOTIFICATION_EMAIL,
    notificationEmailName: process.env.NOTIFICATION_EMAIL_NAME,
    receiveNotificationEmail: process.env.RECEIVE_NOTIFICATION_EMAIL,
});