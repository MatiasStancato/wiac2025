//SDK de Mercado pago
import { MercadoPagoConfig, Preference } from "mercadopago";
//agrega credenciales

const client = new MercadoPagoConfig({ accessToken: process.env.ACCESSTOKEN });

const preference = new Preference(client);

let preferencesStore = {};

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

    preferencesStore = formData;
    console.log('resultaO:',result);
    console.log("formData", preferencesStore);

    res.json({
        id: result.id,
    });
    } catch (error) {
    console.log(error);
    res.status(500).json({
        error: "Error al crear la preferencia",
    });
    
    }
};

// ruta webhook
export const webhook =  async function (req, res) {
    const paymentId = req.query["data.id"];
console.log('preferenceStoredelwebhook',preferencesStore);

    try {
    // Obtener el estado del pago desde MercadoPago
    const response = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${client.accessToken}`
        }
        }
    );

    if (response.ok) {
        const data = await response.json();
        const status = data.status;
        const statusdetail = data.status_detail;
        console.log("response", response);
        console.log("status:", status);
        console.log("statusDetail", statusdetail);

        if (status === "approved") {
        console.log("data", data);

        try {
            const response2 = await fetch("https://wiac2025.vercel.app/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(preferencesStore), // Enviando preferencesStore al backend
            });
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