import express from "express";
import pool from "../database/db.js"; // Asegúrate de que el archivo de conexión usa mysql2 con pool y promesas.
import * as crud from '../controllers/crud.js';
import bcryptjs from 'bcryptjs';

const router = express.Router();

// Rutas de renderización
router.get('/', (req, res) => {
    res.render("home/home");
});

router.get('/ubicacion', (req, res) => {
    res.render("./home/ubicacion");
});

router.get('/participants', (req, res) => {
    res.render("./home/participants");
});

router.get('/itinerario', (req, res) => {
    res.render("./home/itinerario");
});

router.get('/tyc', (req, res) => {
    res.render("./home/tyc");
});

router.get('/sucess', (req, res) => {
    res.render("./home/registersucess");
});

router.get('/turism', (req, res) => {
    res.render("./home/turism");
});

router.get('/regSumary', (req, res) => {
    res.render("./home/regSumary", { query: req.query });
});

// Rutas de autenticación
router.get('/login', (req, res) => {
    res.render('admin/login');
});

router.get('/admin/', (req, res) => {
    res.render('admin/index', {
        login: req.session.loggedin || false,
        name: req.session.loggedin ? req.session.name : "Debe iniciar sesion"
    });
});

// Ruta para el formulario de administración
router.get("/admin/form", async (req, res) => {
    try {
        const [results] = await pool.query("SELECT * FROM participants");
        if (req.session.name === undefined) {
            return res.render("admin/login");
        }
        res.render("admin/form", {
            results,
            name: req.session.name,
            login: req.session.loggedin || false
        });
    } catch (error) {
        console.error("Error al obtener participantes:", error);
        res.status(500).send("Error interno del servidor");
    }
});

// Cerrar sesión
router.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/login');
});

// Ruta para crear registros
router.get("/inscription", (req, res) => {
    res.render('./home/inscription');
});

// Ruta para editar registros
router.get("/edit/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const [results] = await pool.query('SELECT * FROM participants WHERE id = ?', [id]);
        res.render("admin/edit", { user: results[0], results });
    } catch (error) {
        console.error("Error al obtener participante:", error);
        res.status(500).send("Error interno del servidor");
    }
});

// Ruta para eliminar registros
router.get("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await pool.query('DELETE FROM participants WHERE id = ?', [id]);
        const [results] = await pool.query('SELECT * FROM participants');
        res.render("admin/form", {
            login: req.session.loggedin || false,
            results,
            name: req.session.name,
            alert: true,
            alertTitle: "Delete",
            alertMessage: "Successful Delete",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 4000,
            ruta: 'admin/form'
        });
    } catch (error) {
        console.error("Error al eliminar participante:", error);
        res.status(500).send("Error interno del servidor");
    }
});

// Autenticación
router.post('/auth', async (req, res) => {
    const { user, pass } = req.body;

    if (user && pass) {
        try {
            const [results] = await pool.query('SELECT * FROM users WHERE user = ?', [user]);
            if (results.length === 0 || !(await bcryptjs.compare(pass, results[0].pass))) {
                return res.render('admin/login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Usuario y/o contraseña incorrectas!",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'login'
                });
            }
            req.session.loggedin = true;
            req.session.name = results[0].name;
            res.render('admin/login', {
                alert: true,
                alertTitle: "Conexión exitosa",
                alertMessage: "Login correcto",
                alertIcon: "success",
                showConfirmButton: false,
                timer: 3000,
                ruta: 'admin/form'
            });
        } catch (error) {
            console.error("Error de autenticación:", error);
            res.status(500).send("Error interno del servidor");
        }
    } else {
        res.send('Por favor ingrese un usuario y contraseña');
    }
});

// Rutas de CRUD
router.post('/save', crud.save);
router.post('/update', crud.update);

export default router;
