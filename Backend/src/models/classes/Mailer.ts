import { createTransport, SendMailOptions, Transporter} from "nodemailer"

export class Mailer {
    private transporter: Transporter

    constructor() {
       const transporter = createTransport({
        service: "outlook",
        auth: {
            user: "no.reply-scheduleservice@outlook.com",
            pass: process.env.EMAIL_PASSWORD
        }
       })

        this.transporter = transporter
    }

    public async sendMail(to: string, subject: string, html: string): Promise<boolean> {
        const promise = new Promise<boolean>((resolve, reject) => {

            const mailOptions: SendMailOptions = {
                from: "no.reply-scheduleservice@outlook.com",
                to,
                subject,
                html
            }
            
            this.transporter.sendMail(mailOptions, (error, info) => {
                if(error)
                    reject(error)
                else
                    resolve(true)
            })            
        })

        return promise
    }
}