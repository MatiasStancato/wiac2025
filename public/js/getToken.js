export const getToken = async () => {
    const url = 'https://auth.geopagos.com/oauth/token';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "grant_type": "client_credentials",
            "client_id": process.env.SPCLIENT_ID,
            "client_secret": process.env.SPCLIENT_SECRET,
            "scope": "*"
        }),
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error al obtener token! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Error al obtener token:', error);
    }
};