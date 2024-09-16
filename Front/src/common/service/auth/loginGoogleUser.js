/* import { getBaseUrl } from "../../helper/envHelper"; */

/* const BASE_URL = getBaseUrl();
 */

export const loginGoogleUser = async () => {
    console.log("Enviando petición GET a:", `$https://s17-14-t-php-react-production.up.railway.app/api/sessions/google`);
    window.location.href = `https://s17-14-t-php-react-production.up.railway.app/api/sessions/google`;
}


/* export const loginGoogleUserCallback = async () => {
    try {
        console.log('Enviando solicitud de callback...');
        const response = await fetch(`https://s17-14-t-php-react-production.up.railway.app/api/sessions/google/callback`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Respuesta:', response);
        const data = await response.json();
        console.log('Datos recibidos:', data);

        if (response.ok) {
            if (data.token && data.redirectURL) {
                localStorage.setItem('authToken', data.token);
                console.log('Token guardado:', data.token);
                console.log('Redirigiendo a:', data.redirectURL);
                window.location.href = data.redirectURL;
            } else {
                console.error('Token o redirectURL no presentes en la respuesta');
            }
        } else {
            console.error('Respuesta del servidor no es ok');
        }

        return data;
    } catch (error) {
        console.error('Error en la autenticación con Google:', error);
        throw error;
    }
}; */

