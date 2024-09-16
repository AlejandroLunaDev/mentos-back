// services/getUsers.js

export const getUsers = async () => {
    const response = await fetch('https://s17-14-t-php-react-production.up.railway.app/api/users');
    
    if (!response.ok) {
      throw new Error('Error al traer los datos de los mentores');
    }
  
    return await response.json();
  };
  