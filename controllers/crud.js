import pool from "../database/db.js"; // Asegúrate de que este archivo usa mysql2 con pool y promesas.
import { sendConfirmationEmail } from "./emailService.js";
import { sendConfirmationEmail2 } from "./emailer.js";

const now = new Date();
const expDate = new Date(now);
expDate.setDate(expDate.getDate() + 14);

export const save = async (req, res) => {
    const capitalizeFirstLetter = (string) => {
        return string
            .split(" ") // Divide el string en un array por espacios
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza cada palabra
            .join(" "); // Une las palabras en un string
    };

    const firstName = capitalizeFirstLetter(req.body.Firstname);
    const lastname = capitalizeFirstLetter(req.body.Lastname);
    const email = req.body.Email;
    const federation = req.body.Federation;
    const country = capitalizeFirstLetter(req.body.Country);
    const ageclass = req.body.Ageclass;
    const gender = req.body.Gender;
    const bowtype = req.body.Bowtype;
    const target = req.body.Target;
    const flint = req.body.Flint;
    const mssg = req.body.Mssg;

    const Pay = "NO";

    let price = ageclass === "Cub" ? "EUR 140.00" : "EUR 190.00";

    try {
        const query = `
            INSERT INTO participants 
            (firstname, lastname, Email, Federation, Country, Ageclass, Gender, Bowtype, Target, Flint, Text,Pay)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;

        const values = [
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
            mssg,
            Pay,
        ];

        await pool.query(query, values);

        const emailData = {
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
            mssg,
        };

         sendConfirmationEmail(emailData);
         sendConfirmationEmail2(emailData);

        res.render("home/registersucess", {
            alert: true,
            alertTitle: "Registration",
            alertMessage: "Successful Registration.",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 3000,
            ruta: "sucess",
        });
    } catch (error) {
        console.error("Error saving participant:", error);
        res.status(500).send("Error al guardar el participante.");
    }
};

export const update = async (req, res) => {
    const capitalizeFirstLetter = (string) => {
        return string
            .split(" ") // Divide el string en un array por espacios
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza cada palabra
            .join(" "); // Une las palabras en un string
    };
    const id = req.body.id;
    const firstName = capitalizeFirstLetter(req.body.Firstname);
    const lastname = capitalizeFirstLetter(req.body.Lastname);
    const email = req.body.Email;
    const federation = req.body.Federation;
    const country = capitalizeFirstLetter(req.body.Country);
    const ageclass = req.body.Ageclass;
    const gender = req.body.Gender;
    const bowtype = req.body.Bowtype;
    const target = req.body.Target;
    const flint = req.body.Flint;
    const mssg = req.body.Text;
    const Pay = req.body.Pay;
    let price = ageclass === "Cub" ? "EUR 140.00" : "EUR 190.00";

    const query = `
        UPDATE participants 
        SET Firstname = ?, Lastname = ?, Email = ?, Federation = ?, Country = ?, 
            Ageclass = ?, Gender = ?, Bowtype = ?, Target = ?, Flint = ?, Text = ?, Pay = ?
        WHERE id = ?`;

    const values = [
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
        mssg,
        Pay,
        id,
    ];

    try {
        await pool.query(query, values);

        const [results] = await pool.query("SELECT * FROM participants");

        res.render("admin/form", {
            login: req.session.loggedin || false,
            results, // Array de participantes
            name: req.session.name,
            alert: true,
            alertTitle: "Update",
            alertMessage: "Participant updated successfully!",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 3000,
            ruta: "admin/form",
        });
    } catch (error) {
        console.error("Error updating participant:", error);
        res.status(500).send("Error al actualizar el participante.");
    }
};
