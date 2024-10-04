import express from "express";
import connection from "../database/db.js";
import * as crud from '../controllers/crud.js';
import bcryptjs from 'bcryptjs';
import { createPreference, webhook } from "../controllers/mpController.js";

const router = express.Router();


router.get('/',(req,res)=>{
    res.render("home/home")
})

router.get('/ubicacion',(req,res)=>{
    res.render("./home/ubicacion")
})

router.get('/participants',(req,res)=>{
    res.render("./home/participants")
})

router.get('/itinerario',(req,res)=>{
    res.render("./home/itinerario")
})

router.get('/tyc',(req,res)=>{
    res.render("./home/tyc")
})
router.get('/sucess',(req,res)=>{
    res.render("./home/registersucess")
})


// 12-auth

router.get('/login',(req,res)=>{
    res.render('admin/login')
})
router.get('/register',(req,res)=>{
    res.render('admin/register')
})



router.get('/admin/', (req, res) => {
    res.render('admin/index', {
        login: req.session.loggedin || false,
        name: req.session.loggedin ? req.session.name : "Debe iniciar sesion"
    });
});


router.get("/admin/form", (req, res) => {
  connection.query("SELECT * FROM participants", (error, results) => {
    
    if (error) {
        throw error;
    } 
    else if (req.session.name === undefined){
        res.render("admin/login")
    }
    else {
        res.render("admin/form",{
            results:results,
            name: req.session.name,
            login: req.session.loggedin || false});
    }
    });
});


router.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/login');
})
})



//ruta para crear registros
router.get("/inscription",(req,res)=>{
    res.render('./home/inscription');
})

//ruta para editar los registros

router.get("/edit/:id",(req,res)=>{
    const id = req.params.id;
    connection.query('SELECT * FROM participants WHERE id = ?',[id], (error, results)=>{
        if (error) {
        throw error;
    } else {
        res.render("admin/edit",{user:results[0],results:results});
    }
    });
})

//ruta para eliminar registro

router.get("/delete/:id",(req,res)=>{
    const id =req.params.id;
    connection.query('DELETE FROM participants WHERE id = ?',[id],(error, results)=>{
        if (error){
            throw error;
        }
        else{
            // After deleting, fetch the updated list of users
            connection.query('SELECT * FROM participants', (error, results) => {
                if (error) {
                    throw error;
                } else {
                    res.render("admin/form",{
                        login: req.session.loggedin || false,
                        results:results,
                        name: req.session.name,
                        alert:true,
                        alertTitle:"Delete",
                        alertMessage:"Succesfull Delete",
                        alertIcon:"success",
                        showConfirmButton:false,
                        timer:4000,
                        ruta:'admin/form'}); 
                }
            });
        }
    });
});

//10- registracion 
router.post('/register',async (req,res)=>{
    const user = req.body.user;
    const name = req.body.name;
    const rol = req.body.rol;
    const pass = req.body.pass;
    let passwordHaash = await bcryptjs.hash(pass,8);
    connection.query('INSERT INTO users SET ?',{user:user, name:name,rol:rol,pass:passwordHaash},async(error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.render('admin/login',{
                alert:true,
                alertTitle:"Registration",
                alertMessage:"Succesful Registration!",
                alertIcon:"success",
                showConfirmButton:false,
                timer:3000,
                ruta:'login'
            })
            
        }
    })
})

//11-Autenticacion


router.post('/auth',async (req,res)=>{
    const user =  req.body.user;
    const pass = req.body.pass;
    let passwordHaash = await bcryptjs.hash(pass,8);
    if (user && pass){
        connection.query('SELECT * FROM users WHERE user = ?', [user], async (error,results)=>{
            if(results.length == 0 || !(await bcryptjs.compare(pass,results[0].pass))){
                res.render('admin/login',{
                    alert:true,
                    alertTitle:"Error",
                    alertMessage:"Usuario y/o password incorrectas!",
                    alertIcon:"error",
                    showConfirmButton:true,
                    timer:1500,
                    ruta:'login'
                })
            }else{
                req.session.loggedin = true;
                req.session.name = results[0].name;
                res.render('admin/login',{
                    alert:true,
                    alertTitle:"conexion exitosa",
                    alertMessage:"Login correcto",
                    alertIcon:"success",
                    showConfirmButton:false,
                    timer:3000,
                    ruta:'admin/form'
                });
            }
        })
    }else{
        res.send('Por favor ingrese un usuario y contrasena')
    }
})

// mp controller
router.post("/create_preference", createPreference);
router.post("/webhook", webhook);




router.post ('/save',crud.save)
router.post('/update',crud.update)

export default router;
