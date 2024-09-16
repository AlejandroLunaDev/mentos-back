import { getBaseUrl } from "../../helper/envHelper"; 

const BASE_URL = getBaseUrl();
console.log(BASE_URL);

export const getUsers = async () => {
    const response = await fetch(`${BASE_URL}/api/users`);
    
    if (!response.ok) {
      throw new Error('Error al traer los datos de los mentores');
    }
  
    return await response.json();
  };
  