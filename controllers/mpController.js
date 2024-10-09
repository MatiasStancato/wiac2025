//SDK de Mercado pago
import { MercadoPagoConfig, Preference } from "mercadopago";

//agrega credenciales
const client = new MercadoPagoConfig({ accessToken: process.env.ACCESSTOKEN });
const preference = new Preference(client);


//usar redis
// import { createClient } from 'redis';
//Crear un cliente Redis
// const redisClient = createClient({
//     password: 'upTkxydgC7oor6RcRQZfXF5ihonoaWE9',
//     socket: {
//         host: '127.0.0.1',
//         port: 6389
//     }
// });

// redisClient.on('error', (err) => console.log('Redis Client Error', err));

//Conectar a Redis
//  await redisClient.connect();


import NodeCache from "node-cache";

const myCache = new NodeCache( {stdTTL:3600});

//ruta create preference
export const createPreference = async (req, res) => {
    try {
        const { orderData, formData } = req.body;

        const body = {
            items: [
                {
                    title: orderData.title,
                    quantity: Number(orderData.quantity),
                    unit_price: Number(orderData.price),
                    currency_id: "ARS",
                },
            ],
            back_urls: {
                success: "https://wiac2025.vercel.app/sucess",
                failure: "https://wiac2025.vercel.app/inscription",
                pending: "https://wiac2025.vercel.app/inscription",
            },
            auto_return: "approved",
            notification_url: "https://wiac2025.vercel.app/webhook",
        };
        
        const result = await preference.create({ body });
        
        myCache.set("FD",formData);


        

       // Guardar el formData en Redis usando el customId como clave
    // await redisClient.setEx(customId, 3600, JSON.stringify(formData)); // Expira en 1 hora

        res.json({id: result.id,});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al crear la preferencia",
        });
    }
};

// ruta webhook
export const webhook = async function (req, res) {
    const paymentId = req.query["data.id"];

    try {
        // Obtener el estado del pago desde MercadoPago
        
        const response = await fetch(
            `https://api.mercadopago.com/v1/payments/${paymentId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${client.accessToken}`,
                },
            }
        );

        const DataToSend = myCache.get("FD");

        console.log("DataToSend antes de enviarlo:", DataToSend);

        // Verificar si formData sigue disponible en el cache
        if (!DataToSend) {
            console.error("Error: No se encontró formData en cache");
            return res.sendStatus(500);  // Error si los datos no están
        }
            
        if (response.ok) {
            const data = await response.json();
            const status = data.status;


            if (status === "approved") {
                console.log("Pago aprobado");

                // Recuperar el customId desde los metadatos
                // const customId = data.metadata.customId;
                // const formDataString = await redisClient.get(customId);

                // if (!formDataString) {
                //     console.error("No se encontró formData en cache");
                //     return res.sendStatus(500);
                // }
                // const formData = JSON.parse(formDataString);
                // console.log('FormData del webhook, ',formDataString);
                    

                try {
                    
                    const response2 = await fetch(
                        "https://wiac2025.vercel.app//save",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(DataToSend), // Enviando preferencesStore al backend
                        }
                    );
                } catch (error) {
                    console.error("Error en el fetch:", error);
                }
            } else {
                console.log("Error del response");
            }
        }
        res.sendStatus(200); // Respuesta exitosa al webhook
    } catch (error) {
        console.error("Error en el webhook de MercadoPago:", error);
        res.sendStatus(500);
    }
};
