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
            html: `
            <p>Dear ${email},</p> 
            <p>You have requested to ${action} into your Keacare account. Please use the following OTP to complete your ${action}:</p>
            <p style="font-size: x-large; font-weight: bold;">${otp}</p>
            <p>This OTP is valid for a limited time and can only be used once. Do not share this OTP with anyone, including your Keacare support team.</p>
            <p>For any assistance, please contact our support team immediately at [support@keacare.com].</p>  
            <p style="margin-top: 3rem;">Thank you for using Keacare</p>
            <p>Best regards,  </p>
            <p>Team KeaCare</p>          
            `,
        })
    } catch (err) {
        console.error(err);
    }
}

async function sendReceipt(email, url) {
    try {
        await transporter.sendMail({
            from: 'dev@waysaheadglobal.com',
            to: email,
            subject: "Purchase Details | KeaCare",
            html: `<p>Hello ${email},</p> 
            <p>This is your receipt.</p> 
            <a href="${url}">${url}</a> 
            <p>Thank You for your purchase.</p>
            <p style="margin-top: 3rem;">Regards,</p>
            <p>Team KeaCare.</p>
            `,
        })
    } catch (err) {
        console.error(err);
    }
}

async function sendAppointment(email, from, to) {
    try {
        await transporter.sendMail({
            from: 'dev@waysaheadglobal.com',
            to: email,
            subject: "Appointment Scheduled",
            html: `<p>Hello ${from},</p> 
            <p>Your appointment with ${to} is scheduled successfully.</p>
            <p>For more details please log in in KeaCare website.</p>
            <p style="margin-top: 3rem;">Regards,</p>
            <p>Team KeaCare.</p>
            `,
        })
    } catch (err) {
        console.error(err);
    }
}

module.exports = { transporter, sendOTP, sendReceipt, sendAppointment };