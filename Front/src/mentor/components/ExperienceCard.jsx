import { FaBriefcase } from 'react-icons/fa';
import { useState } from 'react';

export default function ExperienceCard(mentor ) {
  const { experience } = mentor.mentor;

  // Estado para controlar si se muestran todos o solo 2
  const [showAll, setShowAll] = useState(false);

  // Función para formatear la fecha
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
    });
  };

  // Función para cambiar el estado de mostrar todo o no
  const toggleShowAll = () => setShowAll((prev) => !prev);

  // Si no se debe mostrar todo, se limita a los primeros 2
  const experienceToDisplay = showAll ? experience : experience.slice(0, 2);

  return (
    <article className="border-2 shadow-lg px-8 py-4 rounded-xl">
      <header className="flex justify-between">
        <h2 className="text-2xl font-semibold">Experiencia</h2>
        {experience.length > 2 && (
          <button onClick={toggleShowAll} className="text-[#AA5BFF] underline">
            {showAll ? 'Ver menos' : 'Ver todas'}
          </button>
        )}
      </header>
      {experienceToDisplay.length > 0 ? (
        experienceToDisplay.map((edu) => (
          <div key={edu._id} className="my-4 flex justify-between">
            <div className="flex gap-4 items-center">
              <FaBriefcase className="text-[#AA5BFF] text-4xl" />
              <div>
                <h3 className="text-lg font-semibold">{edu.title}</h3>
                <p>{edu.place}</p>
              </div>
            </div>
            <p className="font-semibold">
              {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
            </p>
          </div>
        ))
      ) : (
        <p>No hay formación registrada.</p>
      )}
    </article>
  );
}
