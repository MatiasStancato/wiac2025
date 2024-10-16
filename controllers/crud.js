
import connection from '../database/db.js';

export const save = (req,res)=>{
    console.log(req.body);
    
    const firstName = req.body.Firstname.toLowerCase();
    const lastname = req.body.Lastname.toLowerCase();
    const email = req.body.Email;
    const federation = req.body.Federation;
    const country = req.body.Country.toLowerCase();
    const ageclass = req.body.Ageclass;
    const gender = req.body.Gender;
    const bowtype = req.body.Bowtype;
    const target = req.body.Target;
    const mssg = req.body.Mssg;
    connection.query('INSERT INTO participants SET ?',{firstname:firstName , lastname:lastname , Email:email, Federation:federation ,Country:country , Ageclass:ageclass , Gender:gender , Bowtype:bowtype, Target:target, Text:mssg,} , (error, results)=>{
        if(error){
            console.log(error);
        }
        else{
            res.render('home/registersucess',{
                alert:true,
                alertTitle:'Registration',
                alertMessage:'Succesfull Registration',
                alertIcon:"sucess",
                showConfirmButton:false,
                timer:3000,
                ruta:'sucess'
            });
        }
    })
} 

export const update = (req, res) => {
    const id = req.body.id;
    const firstName = req.body.Firstname.toLowerCase();
    const lastname = req.body.Lastname.toLowerCase();
    const email = req.body.Email;
    const federation = req.body.Federation;
    const country = req.body.Country.toLowerCase();
    const ageclass = req.body.Ageclass;
    const gender = req.body.Gender;
    const bowtype = req.body.Bowtype;
    const target = req.body.Target;
    const mssg = req.body.Text;

    const query = 'UPDATE participants SET Firstname = ?, Lastname = ?, Email = ?, Federation = ?, Country = ?, Ageclass = ?, Gender = ?, Bowtype = ?, Target = ?, Text =? WHERE id = ?';
    const values = [firstName, lastname, email, federation, country, ageclass, gender, bowtype, target, mssg, id];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
            res.send('Error al actualizar el participante.');
        } else {
            // Hacer otra consulta para obtener los registros actualizados
            connection.query('SELECT * FROM participants', (error, results) => {
                if (error) {
                    console.log(error);
                    res.send('Error al obtener los participantes.');
                } else {
                    res.render('admin/form', {
                        login: req.session.loggedin || false,
                        results: results, // Esto es ahora un array de participantes
                        name: req.session.name,
                        alert: true,
                        alertTitle: "Update",
                        alertMessage: "Participant updated successfully!",
                        alertIcon: "success",
                        showConfirmButton: false,
                        timer: 3000,
                        ruta: 'admin/form'
                    });
                }
            });
        }
    });
};