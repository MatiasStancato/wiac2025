import nodeMailer from "nodemailer";

export const sendConfirmationEmail2 = async ({
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
    mssg,
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
        to: "wiac2025@gmail.com",
        subject: "Nuevo Registro",
        html: `
            <div style="width:80%; margin:auto;">
                <p style="color: #414141; text-align: center; background-color: #f8f9fa; padding: 10px;">Reservation Confirmed</p>
                <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                    <h1 style="color: #007BFF; font-size:30px;">Nuevo registro de ${firstName} ${lastname},</h1>
                    <h2 style="color: #414141; font-size:24px;">Detalles:</h2>
                    <p style="font-size:20px;"><strong>Full Name:</strong> ${lastname} ${firstName}.</p>
                    <p style="font-size:20px;"><strong>Email:</strong> ${email}.</p>
                    <p style="font-size:20px;"><strong>Federation:</strong> ${federation}.</p>
                    <p style="font-size:20px;"><strong>Country:</strong> ${country}.</p>
                    <p style="font-size:20px;"><strong>Age Class:</strong> ${ageclass}.</p>
                    <p style="font-size:20px;"><strong>Gender:</strong> ${gender}.</p>
                    <p style="font-size:20px;"><strong>Bowtype:</strong> ${bowtype}.</p>
                    <p style="font-size:20px;"><strong>Target:</strong> ${target}.</p>
                    <p style="font-size:20px;"><strong>Flint Target:</strong> ${flint}.</p>
                    <p style="font-size:20px;"><strong>Price:</strong> ${price}</p>
                    <p style="font-size:20px;"><strong>Message:</strong> ${mssg}</p>
                <footer style="text-align: center; margin-top: 30px;">
                    <p style="font-size: 12px; color: #888;">WIAC 2025 | World Indoor Archery Championship</p>
                </footer>
            </div>
        `,
    };

    try{
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent",info.response);
    return info;
    }
    catch (error){
        console.error("Error sending email:", error);
        throw error;
    }
    };
