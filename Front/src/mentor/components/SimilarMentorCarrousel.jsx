/* eslint-disable react/prop-types */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../MentorCarousel.css"; // Importar el CSS personalizado
import { useState, useEffect } from "react";
import { getUsers } from "../../common/service/users/getUsers";
import { useNavigate } from "react-router-dom";

export default function SimilarMentorCarrousel({ mentor }) {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate(); // Instancia del hook useNavigate

  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await getUsers();

        // Verifica si el mentor tiene una categoría antes de filtrar
        if (mentor && mentor.category) {
          const mentorCategories = mentor.category || [];
          const matchingUsers = users.filter(user =>
            user.category && user.category.some(cat => mentorCategories.includes(cat))
          );

          // Excluir al mentor actual del carrusel
          const filteredUsersList = matchingUsers.filter(user => user._id !== mentor._id);

          setFilteredUsers(filteredUsersList);
        } else {
          // Si no hay mentor o categoría, no mostramos usuarios
          setFilteredUsers([]);
        }
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    }

    fetchUsers();
  }, [mentor]); // Dependencia actualizada a "mentor"

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true, // Ajusta la altura del carrusel según el contenido
  };

  const handleSlideClick = (userId) => {
    navigate(`/mentor/${userId}`); // Navegar a la ruta del mentor
  };

  return (
    <div className="bg-white">
      {filteredUsers.length > 0 ? (
        <Slider {...settings}>
          {filteredUsers.map(user => (
            <div key={user._id} className="mentor-slide">
              <div
                className="slider flex flex-col p-2 w-80 h-80 rounded-lg bg-white cursor-pointer"
                onClick={() => handleSlideClick(user._id)} // Manejar el clic
              >
                <img
                  src={user.avatar}
                  alt={`${user.first_name} ${user.last_name}`}
                  className="w-full object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {user.first_name} {user.last_name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {user.category && user.category.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="text-center text-gray-600">No se encontraron mentores similares.</div>
      )}
    </div>
  );
}
