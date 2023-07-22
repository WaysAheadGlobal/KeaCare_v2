const nodemailer = require("nodemailer");

/* const transporter = nodemailer.createTransport({
    host: "smtp.office365.com", // hostname
    secureConnection: false,
    requireTLS: true, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: 'kea-connect@kea.care',
        pass: 'Kea@4Ssao43b'
    }

}); */ // !smtp error

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    secureConnection: false,
    port: 587,
    tls: {
        ciphers: "SSLv3"
    },
    auth: {
        user: 'dev@waysaheadglobal.com',
        pass: 'Singapore@2022'
    }
});

async function sendOTP(email, otp, action) {
    try {
        await transporter.sendMail({
            from: 'dev@waysaheadglobal.com',
            to: email,
            subject: "OTP for Signing Up in KeaCare",
            html: `<p>Hello ${email},</p> <p>This is your OTP for ${action} in KeaCare</p> <p>${otp}</p>`,
        })
    } catch (err) {
        console.error(err);
    }
}

module.exports = { transporter, sendOTP };