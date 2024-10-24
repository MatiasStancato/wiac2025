import nodeMailer from "nodemailer";

export const sendConfirmationEmail = ({
    firstName,
    lastname,
    email,
    federation,
    country,
    ageclass,
    gender,
    bowtype,
    target,
    price,
    expDate,
}) => {
    const transporter = nodeMailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASS,
        },
    });

    let mail = {
        from: "contacto@wiac2025.com.ar",
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
                    <p style="font-size:20px;"><strong>Target:</strong> ${target} spot.</p>
                    <p style="font-size:20px;"><strong>Price:</strong> ${price}</p>
                    <div style="background-color: #f8f9fa; padding: 10px; border-radius: 5px; margin-top: 20px;">
                        <p style="font-size: 20px; color: #dc3545;">NOTE: You have 14 days from this moment to make the transfer.</p>
                        <p style="font-size: 20px; color: #dc3545;">YOUR RESERVATION EXPIRES ON: <strong>${expDate}</strong></p>
                    </div>
                    <p style="font-size: 16px; margin-top: 20px;">For more information contact us: <a href="mailto:contacto@wiac2025.com.ar" style="color: #007BFF; text-decoration: none;">contacto@wiac2025.com.ar</a></p>
                <footer style="text-align: center; margin-top: 30px;">
                    <p style="font-size: 12px; color: #888;">WIAC 2025 | World Indoor Archery Championship</p>
                </footer>
            </div>
        `,
    };

    transporter.sendMail(mail, (error, info) => {
        if (error) {
            console.log("Error al enviar el correo: ", error);
        } else {
            console.log("Correo enviado: ", info.response);
        }
    });
};
