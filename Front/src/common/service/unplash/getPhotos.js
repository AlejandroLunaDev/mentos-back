export const getCategoryPhoto = async (category, apiKeyPhoto) => {
    try {
      const apiPhotoURL = `https://api.unsplash.com/search/photos?query=${category}&client_id=${apiKeyPhoto}`;
      const res = await fetch(apiPhotoURL);
      const data = await res.json();
      return data.results[4]?.urls?.small || '';
    } catch (error) {
      console.error('Error al obtener datos de la foto:', error);
      return null;
    }
  };