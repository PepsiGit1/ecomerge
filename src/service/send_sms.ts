import dotenv from 'dotenv';
dotenv.config();
import twilio from 'twilio';
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.TWILIO_PHONE;

if (!accountSid || !authToken || !fromPhone) {
    throw new Error("Twilio credentials are missing. Check .env file");
}

const client = twilio(accountSid, authToken);

export const sendSMS = async (to: string, body: string) => {
    try {
        if (to === fromPhone) {
            console.warn("Skipping SMS: 'To' and 'From' numbers are the same.");
            return;
        }
        const message = await client.messages.create({
            body,
            from: fromPhone,
            to
        });
        return message;
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw error;
    }
};
