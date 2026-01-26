const nodemailer = require("nodemailer")


const MailVerification = async(email, username, link) => {

    const MessageTemplate =  `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; border: 1px solid #dee2e6; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <tr>
                        <td align="center" style="padding: 40px 0; background-color: #0d6efd;">
                             <h1 style="color: #ffffff; margin: 0; font-size: 28px;">MedTrack</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="color: #212529; margin-top: 0;">Welcome, ${username}!</h2>
                            <p style="color: #6c757d; font-size: 16px; line-height: 1.6;">
                                Thank you for joining MedTrack. We're excited to help you manage your health and medication reminders more effectively.
                            </p>
                            <p style="color: #6c757d; font-size: 16px; line-height: 1.6;">
                                To get started, please confirm your email address by clicking the button below.
                            </p>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px;">
                                <tr>
                                    <td align="center">
                                        <a href="https://med-track-frontend.vercel.app/verify/email/${email}" style="display: inline-block; padding: 14px 30px; background-color: #0d6efd; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">Verify Email Address</a>
                                    </td>
                                </tr>
                            </table>
                            <p style="color: #adb5bd; font-size: 14px; margin-top: 30px;">
                                If you didn't create an account with us, you can safely ignore this email.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px 30px; background-color: #f1f3f5; text-align: center; color: #6c757d; font-size: 12px;">
                            &copy; 2026 MedTrack Health Systems. All rights reserved.<br>
                            Lagos, Nigeria.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>` ;

   const transporter = await nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
        }
    })


    const mailOptions = {
        from: process.env.PASS_EMAIL,
        to: email,
        subject: `Email Verification for ${username}`,
        html: MessageTemplate
    }

    try {
        const mailed = await transporter.sendMail(mailOptions)
        if (mailed) {
            return "mail sent"
        } 
    } catch (error) {
        console.log(error)
    }
}

module.exports = MailVerification