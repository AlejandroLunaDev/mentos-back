import { useState, useEffect } from "react";
import MentorCard from "./components/MentorCard";
import MentorRecomendedCard from "./components/MentorRecomendedCard";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../common/service/users/getUsers";
import { useAuth } from "../../common/hook/useAuth";

export default function MentorProgress() {
  const [mentor, setMentor] = useState(null); // Almacena el primer mentor coincidente
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Función para cargar los usuarios y mentores
    const loadMentors = async () => {
      try {
        // Obtener todos los usuarios
        const allUsers = await getUsers();


        // Obtener IDs de mentores desde localStorage y del objeto user
        const localStorageMentors = JSON.parse(localStorage.getItem("mentors")) || [];
        const userMentors = user?.decodedToken.mentors || [];
        const mentorIds = [...new Set([...localStorageMentors, ...userMentors])]; // Combina y elimina duplicados


        if (mentorIds.length > 0) {
          // Encontrar el primer mentor que coincida con el primer ID
          const firstMentorId = mentorIds[0];
          const matchedMentor = allUsers.find(user => user._id === firstMentorId);

          setMentor(matchedMentor || null); // Almacena el mentor o null si no se encuentra
        } else {
          setMentor(null); // Si no hay IDs de mentores, asegura que mentor sea null
        }
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
        setMentor(null); // En caso de error, asegura que mentor sea null
      }
    };

    loadMentors();
  }, [user]); // Incluye 'user' en las dependencias para actualizar cuando cambie

  return (
    <div className="my-12 bg-[#FAFAFA]">
      <header className="mb-6 bg-[#FAFAFA]">
        <small className="text-base text-[#707172]">Progreso</small>
        <h1 className="text-lg font-bold">Mi mentor</h1>
      </header>

      {mentor ? (
        <div className="flex gap-6">
          <MentorCard mentor={mentor} />
          <MentorRecomendedCard mentor={mentor} />
        </div>
      ) : (
        // Si no hay mentor, mostramos el mensaje y botón
        <div className="text-center flex flex-col items-center gap-4">
          <h2 className="text-lg font-bold text-[#252729]">
            Aún no tienes un mentor asignado, ¡tu próximo gran paso está a un solo clic!
          </h2>
          <p className="text-sm text-[#707172] font-semibold">
            Elige un mentor y empieza a transformar tu futuro
          </p>
          <button
            onClick={() => { navigate('/search'); }}
            className="bg-white text-sm font-semibold bg-gradient-primary bg-clip-text text-transparent py-2 px-4 border-2 border-violeta hover:bg-violeta2 rounded-tr-lg rounded-bl-lg whitespace-nowrap cursor-pointer select-none"
          >
            <span className="text-md font-semibold">Buscar mentor</span>
          </button>
        </div>
      )}
    </div>
  );
}
