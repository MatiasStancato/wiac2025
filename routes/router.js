const express = require("express");
const router = express.Router();
const connection = require("../database/db");
const crud = require("../controllers/crud");
const bcryptjs = require('bcryptjs');

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


router.get('/admin/',(req,res)=>{
    if(req.session.loggedin){
        res.render('admin/index',{
            login: true,
            name: req.session.name
        });
    }else{
        res.render('admin/index',{
            login: false,
            name:"Debe iniciar sesion"
        })
    }
})






router.get("/admin/form", (req, res) => {
  connection.query("SELECT * FROM participants", (error, results) => {
    
    if (error) {
        throw error;
    } 
    else if (req.session.name==undefined){
        res.render("admin/login")
    }
    else {
        res.render("admin/form",{
            results:results,
            name: req.session.name});
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
                        results:results,
                        name: req.session.name,
                        alert:true,
                        alertTitle:"Delete",
                        alertMessage:"Succesfull Delete",
                        alertIcon:"success",
                        showConfirmButton:false,
                        timer:4000,
                        ruta:''}); 
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
                alertIcon:"sucess",
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
                login = true
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




router.post ('/save',crud.save)
router.post('/update',crud.update)
module.exports = router;
