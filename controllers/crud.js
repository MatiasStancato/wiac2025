const { Console } = require('console');
const conexion =  require('../database/db');


exports.save =(req,res)=>{
    const firstName = req.body.firstName.toLowerCase();
    const lastname = req.body.lastname.toLowerCase();
    const email = req.body.email.toLowerCase();
    const federation = req.body.federation.toUpperCase();
    const country = req.body.country.toLowerCase();
    const ageclass = req.body.ageclass;
    const gender = req.body.gender;
    const bowtype = req.body.bowtype;
    const target = req.body.target;
    conexion.query('INSERT INTO participants SET ?',{firstName:firstName , lastname:lastname , email:email, federation:federation ,country:country , ageclass:ageclass , gender:gender , bowtype:bowtype, target:target} , (error, results)=>{
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

exports.update = (req, res) => {
    const id = req.body.id;
    const firstName = req.body.firstName.toLowerCase();
    const lastname = req.body.lastname.toLowerCase();
    const email = req.body.email.toLowerCase();
    const federation = req.body.federation;
    const country = req.body.country.toLowerCase();
    const ageclass = req.body.ageclass;
    const gender = req.body.gender;
    const bowtype = req.body.bowtype;
    const target = req.body.target;

    const query = 'UPDATE participants SET firstName = ?, lastname = ?, email = ?, federation = ?, country = ?, ageclass = ?, gender = ?, bowtype = ?, target = ? WHERE id = ?';
    const values = [firstName, lastname, email, federation, country, ageclass, gender, bowtype, target, id];

    conexion.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
            res.send('Error al actualizar el participante.');
        } else {
            // Hacer otra consulta para obtener los registros actualizados
            conexion.query('SELECT * FROM participants', (error, results) => {
                if (error) {
                    console.log(error);
                    res.send('Error al obtener los participantes.');
                } else {
                    res.render('admin/form', {
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