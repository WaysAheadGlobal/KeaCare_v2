const twilio = require("twilio");

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, {
    lazyLoading: true
});

async function sendOTPtoPhoneNumber({ countryCode, phoneNumber }) {
    try {
        const otpResponse = await client.verify.v2.services(process.env.TWILIO_SERVICE_SID).verifications.create({
            to: `+${countryCode}${phoneNumber}`,
            channel: 'sms'
        });

        return otpResponse;
    } catch (err) {
        console.error(err);
    }
}

async function verifyOTP({ countryCode, phoneNumber, otp }) {
    try {
        const otpResponse = await client.verify.v2.services(process.env.TWILIO_SERVICE_SID).verificationChecks.create({
            to: `+${countryCode}${phoneNumber}`,
            code: otp
        });

        return otpResponse;
    } catch (err) {
        console.error(err);
    }
}

module.exports = { sendOTPtoPhoneNumber, verifyOTP };