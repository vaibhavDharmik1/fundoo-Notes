import nodemailer  from  "nodemailer";
import logger from "../config/logger";


export const mailSend =(userMailID, token) => {
    const transport = nodemailer.createTransport({

       
            service:"gmail",
            auth:  {
                user: process.env.SENDE_ID,
                pass: process.env.PASSWORD
            }
        
        
    })
    const mailoption = {
        from: process.env.SENDE_ID,
        to: userMailID,
        subject: "Password Reset Link ",
        html: `<h1>Link:><a href="http://localhost:3000/${token}">click here</a></h1>`
    }
    transport.sendMail (mailoption,(err, info) => {
        const sendEmailInfo = err ? logger.log('error', err) : logger.log('info',info);
        return sendEmailInfo;
    }
    )
}