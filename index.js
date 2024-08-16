
//referenciamos a express
const express = require ('express'); 
const app = express(); //
const port = process.env.PORT || 3000

//para capturar los datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

//seteamos el directorio public
app.use('/resources',express.static('public'))
app.use('/resources',express.static(__dirname + '/public'));

//establecemos el motor de plantillas ejs
app.set("views", __dirname + "/views");
app.set('view engine','ejs');

//bcryptjs
const bcryptjs = require('bcryptjs');

//express-session
const session = require('express-session')
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))

const connection = require('./database/db');

app.use('/', require('./routes/router'));

app.listen(port,()=>{
    console.log(`SERVER corriendo en http://localhost:${port}`)
 });      //metodo de express


