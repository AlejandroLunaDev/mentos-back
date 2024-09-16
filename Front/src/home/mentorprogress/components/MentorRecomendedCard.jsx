/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';

export default function MentorRecomendedCard({ mentor }) {
  // Destructura las propiedades del objeto mentor
  const { category } = mentor;

  // Asignar un valor predeterminado a `category` si no está presente
  const categoryText = category ? category[0] : 'Área Tecnológica';

  return (
    <article className='w-[588px] h-[258px] bg-gray-100 rounded-lg flex gap-4 justify-center items-center flex-col border-[2px] border-gray-200'>
      <header>
        <h2 className='text-md font-semibold'>Continúa perfeccionándote en el área de {categoryText}</h2>
      </header>
      <div>
        <figure>
          <img src="./img/mentorgroup.png" alt="Grupo de mentores" />
        </figure>
        <p className="text-xs text-[#707172] mt-4">¡Hay más de 3.000 Mentores en el área disponibles!</p>
      </div>
      <button className="bg-gradient-primary p-2 rounded-lg text-white border-2 border-[#AA5BFF] ">
        Explorar Mentores en {categoryText}
      </button>
    </article>
  );
}

// Agregar PropTypes para validar las propiedades
MentorRecomendedCard.propTypes = {
  mentor: PropTypes.shape({
    category: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
