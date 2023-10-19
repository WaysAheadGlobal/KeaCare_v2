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
        ciphers: "SSLv3",
    },
    auth: {
        user: "dev@waysaheadglobal.com",
        pass: "Singapore@2022",
    },
});

async function sendOTP(email, otp, action) {
    try {
        await transporter.sendMail({
            from: "dev@waysaheadglobal.com",
            to: email,
            subject: `OTP for ${action === "Log in" ? "logging In" : "Signing Up"
                } in KeaCare`,
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
        });
    } catch (err) {
        console.error(err);
    }
}

async function sendReceipt(email, url) {
    try {
        await transporter.sendMail({
            from: "dev@waysaheadglobal.com",
            to: email,
            subject: "Purchase Details | KeaCare",
            html: `<p>Hello ${email},</p> 
            <p>This is your receipt.</p> 
            <a href="${url}">${url}</a> 
            <p>Thank You for your purchase.</p>
            <p style="margin-top: 3rem;">Regards,</p>
            <p>Team KeaCare.</p>
            `,
        });
    } catch (err) {
        console.error(err);
    }
}

async function sendAppointment(email, from, to, type) {
    try {
        if (type === "careseeker") {
            await transporter.sendMail({
                from: "dev@waysaheadglobal.com",
                to: email,
                subject: "Appointment Scheduled",
                html: `<p>Hello ${from},</p> 
                <p>Your appointment with ${to} is scheduled successfully.</p>
                <p>For more details please log in in KeaCare website.</p>
                <p style="margin-top: 3rem;">Regards,</p>
                <p>Team KeaCare.</p>
                `,
            });
        } else {
            await transporter.sendMail({
                from: "dev@waysaheadglobal.com",
                to: email,
                subject: "Appointment Scheduled",
                html: `<p>Dear ${from},</p> 
                <p>We are pleased to inform you that an appointment has been scheduled for your caregiving services. Here are the details:</p>
                <p>Client's Name: ${to}</p>
                <p>Please login to your account for more details.</p>
                <p>Your dedicated care and support are highly valued, and we appreciate your commitment to improving the well-being of our clients. Please ensure you are well-prepared for the appointment and have all the necessary resources and information. If you have any questions or need additional information, please don't hesitate to reach out to connect@keacare.ca Your dedication to providing exceptional care is instrumental in our mission, and we are grateful for your partnership.</p>
                <p>Thank you for your continued dedication and support.</p>
                <p style="margin-top: 3rem;">Warm regards,</p>
                <p>Team KeaCare</p>
                `,
            });
        }
    } catch (err) {
        console.error(err);
    }
}

async function sendAccountVerificationCompletedMail(to, receiverEmail) {
    try {
        await transporter.sendMail({
            from: "dev@waysaheadglobal.com",
            to: receiverEmail,
            subject: "Account Verification Completed",
            html: `<p>Hello ${to},</p>
            <p>Your account verification has been completed.</p>
            <p>Now you can apply for jobs through our website.</p>
            <p>For more details please log in in KeaCare website.</p>
            <p style="margin-top: 3rem;">Regards,</p>
            <p>Team KeaCare.</p>
            `,
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = { transporter, sendOTP, sendReceipt, sendAppointment, sendAccountVerificationCompletedMail };
