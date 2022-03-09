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
    return new Promise((resolve,reject)=>{
        transport.sendMail(mailoption,(err,info)=> {
            if(err){
                logger.log('error', err);
                //throw new Error("Something went wrong while sending reset password link....")
                return reject('Something went wrong while sending reset password link....');
            }
            else{
                logger.log('info', info);
                return resolve('Reset password link send successfully');
            }
        })
    });
}



export const rabbitmqMailSend =(userMailID, msg) => {
    const transport = nodemailer.createTransport({

       
            service:"gmail",
            auth:  {
                user: process.env.SENDE_ID,
                pass: process.env.PASSWORD
            }
        
        
    })
    const mailoption1 = {
        from: process.env.SENDE_ID,
        to: userMailID,
        subject: "rabbitmq ",
        html: `<h1>User Register Successful</h1>`
    }
    return new Promise((resolve,reject)=>{
        transport.sendMail(mailoption1,(err,info)=> {
            if(err){
                logger.log('error', err);
                return reject('Mail send fail');
            }
            else{
                logger.log('info', info);
                return resolve('User registration done successfully');
            }
        })
    });
}

