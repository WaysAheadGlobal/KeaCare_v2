const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: 'kea-connect@kea.care',
        pass: 'Kea@4Ssao43b'
    }

}); // !stmp error

async function sendOTP(email, otp, action) {
    try {
        await transporter.sendMail({
            from: 'kea-connect@kea.care',
            to: email,
            subject: "OTP for Signing Up in KeaCare",
            html: `<p>Hello ${email},</p> <p>This is your OTP for ${action} in KeaCare</p> <p>${otp}</p>`,
        })
    } catch (err) {
        console.error(err);
    }
}

module.exports = { transporter, sendOTP };