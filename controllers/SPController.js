import { getToken } from "../public/js/getToken.js";

export const createOrder = async () => {
    const token = await getToken(); 
    const url = "https://api.sipago.coop/api/v2/orders"; 

    const options = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/vnd.api+json",
        },
        body: JSON.stringify({
            data: {
                attributes: {
                    redirect_urls: {
                        success: "https://a870-91-80-9-110.ngrok-free.app/sucess",
                        failed: "https://a870-91-80-9-110.ngrok-free.app/inscription",
                    },
                    webhookUrl: "https://a870-91-80-9-110.ngrok-free.app/webhook",
                    currency: "032",
                    items: [
                        {
                            id: 1,
                            name: "Inscription WIAC 2025 Adult",
                            unitPrice: {
                                currency: "032",
                                amount: 3000,
                            },
                            quantity: 1,
                        },
                    ],
                    "expireLimitMinutes": 10
                },
            },
        }),
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error al crear la orden! Status: ${response.status}`);
        }
        const orderData = await response.json();
        console.log('orderData del createORder',orderData);
        
        return orderData; // Retornamos los datos de la orden (incluyendo el link de pago)
    } catch (error) {
        console.error("Error al crear la orden:", error);
    }
};

  export const webhook = async function (req, res) {
    console.log("Datos recibidos en el webhook:", req.body);
    const paymentStatus  = await req.body.data.payment.status
    console.log("Status ",paymentStatus );
    
    res.status(200).send('Webhook recibido con éxito');
  };

