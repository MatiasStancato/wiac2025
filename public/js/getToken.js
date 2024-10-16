export const getToken = async () => {
    const url = 'https://auth.geopagos.com/oauth/token';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "grant_type": "client_credentials",
            "client_id": "dc1011bd-55a1-4e44-98cf-d8ab6efc79b6",
            "client_secret": "u8l1lbeqs2v2qpwkqkk8",
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