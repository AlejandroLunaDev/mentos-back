export const addMentortoUser = async (userId, mentorId) => {
    const response = await fetch(`https://s17-14-t-php-react-production.up.railway.app/api/users/${userId}/mentors/${mentorId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}) // No necesitas enviar `mentorId` en el cuerpo, ya está en la URL
    });

    if (!response.ok) {
        throw new Error('Error al agregar el mentor');
    }

    const data = await response.json();
    return data;
};
