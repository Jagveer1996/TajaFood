import nodemailer from "nodemailer";

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "gmail",
  // port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "jaythakur843@gmail.com",
    pass: 'ifhq eheb bkby dror',
  },
});

export let sendOTPMail = async(email, otp)=>{
    await transporter.sendMail({
        from: "jaythakur843@gmail.com",
        to: email,
        subject : "TajaFood OTP",
        text : "Hello Your TajaFood OTP",
        html : `<p>Your OTP for Password reset is <b>${otp}</b> It experis in 5 minutes.</p>`
    })
}