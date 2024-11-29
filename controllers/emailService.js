import nodeMailer from "nodemailer";

export const sendConfirmationEmail = async ({
    firstName,
    lastname,
    email,
    federation,
    country,
    ageclass,
    gender,
    bowtype,
    target,
    flint,
    price,
    expDate,
}) => {
    const transporter = nodeMailer.createTransport({
        service:"gmail",
        host: "smtp.gmail.com", 
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASS,
        },
    });

    const  mailOptions = {
        from: "wiac2025@gmail.com",
        to: email,
        subject: "Confirmed reservation WIAC 2025",
        html: `
            <div style="width:80%; margin:auto;">
                <p style="color: #414141; text-align: center; background-color: #f8f9fa; padding: 10px;">Reservation Confirmed</p>
                <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                    <h1 style="color: #007BFF; font-size:30px;">Dear ${firstName} ${lastname},</h1>
                    <h2 style="color: #414141; font-size:24px;">This is to confirm that you have successfully made the reservation with the following details:</h2>
                    <p style="font-size:20px;"><strong>Full Name:</strong> ${lastname} ${firstName}.</p>
                    <p style="font-size:20px;"><strong>Federation:</strong> ${federation}.</p>
                    <p style="font-size:20px;"><strong>Country:</strong> ${country}.</p>
                    <p style="font-size:20px;"><strong>Age Class:</strong> ${ageclass}.</p>
                    <p style="font-size:20px;"><strong>Gender:</strong> ${gender}.</p>
                    <p style="font-size:20px;"><strong>Bowtype:</strong> ${bowtype}.</p>
                    <p style="font-size:20px;"><strong>Target:</strong> ${target}.</p>
                    <p style="font-size:20px;"><strong>Flint Target:</strong> ${flint}.</p>
                    <p style="font-size:20px;"><strong>Price:</strong> ${price}</p>
                    <div style="background-color: #f8f9fa; padding: 10px; border-radius: 5px; margin-top: 20px;">
                        <p style="font-size: 20px; color: #dc3545;">NOTE: You have 14 days from this moment to make the transfer.</p>
                        <p style="font-size: 20px; color: #dc3545;">YOUR RESERVATION EXPIRES ON: <strong>${expDate}</strong></p>
                    </div>
                    <div style="width:80%; margin:auto;">
                    <h2 style="color: #007BFF; font-size:30px;">Payment Instruction</h2>
                    <p style="font-size:20px;"><strong>PAY TO/PAGAR A:</strong> ASOCIACION ARGENTINA DE TIRADORES CON ARCO</p>
                    <p style="font-size:20px;"><strong>ACCOUNT NUMBER / NUMERO DE CUENTA:</strong> 027-014475/4</p>
                    <p style="font-size:20px;"><strong>WITH / CON:</strong> BANCO CREDICOOP C.L. - BUENOS AIRES</p>
                    <p style="font-size:20px;"><strong>SWIFT ADDRESS / DIRECCION SWIFT:</strong> BCOOARBA</p>
                    <p style="font-size:20px;"><strong>THROUGH / A TRAVÉS DE:</strong> COMMERZBANK AG - FRANKFURT</p>
                    <p style="font-size:20px;"><strong>SWIFT ADDRESS / DIRECCION SWIFT:</strong> COBADEFF</p> 
                    <p style="font-size:20px;">PLEASE NOTE The transfer commission fees are as follows:<br></p>
                    <p style="font-size:20px;">$15 USD for transfers up to $500 USD.<br></p>
                    <p style="font-size:20px;">$25 USD for transfers from $501 USD to $1,000 USD.<br></p>
                    <p style="font-size:20px;">You can include two or more registrations in a single transfer.</p>
                    
                    </div>
                    <p style="font-size: 16px; margin-top: 20px;">For more information contact us: <a href="mailto:wiac2025@gmail.com" style="color: #007BFF; text-decoration: none;">wiac2025@gmail.com</a></p>
                <footer style="text-align: center; margin-top: 30px;">
                    <p style="font-size: 12px; color: #888;">WIAC 2025 | World Indoor Archery Championship</p>
                </footer>
            </div>
        `,
    };

    try{
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sentt",info.response);
    return info;
    }
    catch (error){
        console.error("Error sending email:", error);
        throw error;
    }
    };
