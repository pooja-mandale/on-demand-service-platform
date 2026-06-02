const { Resend } = require("resend")

const resend = new Resend(process.env.RESEND_API_KEY)

const sendEmail = ({ subject, to, message }) => new Promise(async (resolve, reject) => {
    try {
        const sandboxOwner = 'mandalepooja669@gmail.com';
        
        let recipient = to;
        let modifiedSubject = subject;
        let modifiedMessage = message;

        // Force routing to the sandbox owner if recipient is different, so developer receives the email
        if (to !== sandboxOwner) {
            recipient = sandboxOwner;
            modifiedSubject = `[Sandbox for ${to}] ${subject}`;
            modifiedMessage = `<p><strong>[Sandbox Mode: Originally intended for ${to}]</strong></p><hr/>${message}`;
        }

        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev', // Must use onboarding@resend.dev in sandbox mode
            to: recipient,
            subject: modifiedSubject,
            html: modifiedMessage,
        });

        if (error) {
            console.error("Resend error:", error);
            reject(false);
        } else {
            console.log("Email sent successfully via Resend sandbox:", data);
            resolve(true);
        }
    } catch (err) {
        console.error("Resend exception:", err);
        reject(false);
    }
})

module.exports = sendEmail  