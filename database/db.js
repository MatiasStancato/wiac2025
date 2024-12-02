import mysql from 'mysql2/promise';

import dotenv from 'dotenv';
dotenv.config({ path: './env/.env' });

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});



const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conectado a la BD MySQL usando Pool');
        connection.release(); // Liberar la conexión de vuelta al pool
    } catch (error) {
        console.error('Error de conexión a la base de datos:', error);
    }
};

testConnection();


export default pool;


