import nodeMailer from 'nodemailer'

//conexion a gmail
 const transporter = nodeMailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth:{
        user:"contacto@wiac2025.com.ar",
        pass:process.env.MAILER
    }
});

let mail = {
    from:"contacto@wiac2025.com.ar",
    to:"contacto@wiac2025.com.ar",
    subject:"PruebaNodemailer",
    html:`
    <h1> Thanks</h1>
    <h5>Este mensaje fue enviado desde nodemailer</h5>`
}

transporter.sendMail(mail,(error,info)=>{
    if(error){
        console.log("Error sending Email.",error);
    } else{
        console.log("Email sent.");
        
    }
})



