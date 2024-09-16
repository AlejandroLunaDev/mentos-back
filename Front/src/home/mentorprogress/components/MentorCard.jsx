/* eslint-disable react/prop-types */
import { IoTimeOutline } from 'react-icons/io5';
import PropTypes from 'prop-types';

export default function MentorCard({ mentor }) {
  // Destructura las propiedades del objeto mentor
  const {
    first_name,
    last_name,
    avatar,
    category,
    rating = [],
  } = mentor;

  // Construir el nombre completo
  const nombre_completo = `${first_name} ${last_name}`;

  // Determinar el rating
  const puntaje = rating.length > 0 ? rating[0].puntaje : 0;

  return (
    <article className='w-[588px] h-[258px] flex p-4 bg-[#DCC0FB] rounded-lg gap-4 shadow-lg'>
      <figure className='w-2/5'>
        <img
          className='w-full h-full object-cover rounded-lg'
          src={avatar}  // Cambiado a `avatar`
          alt={nombre_completo}
        />
      </figure>
      <div className='w-3/5 flex flex-col'>
        <header className='flex flex-col gap-2'>
          <div className='flex justify-between'>
            <h2 className='text-sm font-bold'>{category ? category[0] : 'Sin Categoría'}</h2>
            <img className='w-3 mr-[3px]' src='./icons/alert.svg' alt='alert' />
          </div>
          <div className='flex justify-between'>
            <h3 className='text-sm text-girs font-normal'>{nombre_completo}</h3>
            <div className='flex items-center gap-1'>
              <span>{puntaje}</span> {/* Cambiado a `puntaje` */}
              <span>({rating.length})</span>
              <div>
                <img className='h-4' src='./icons/star.svg' alt='' />
              </div>
            </div>
          </div>
        </header>
        <div className='flex flex-col justify-between flex-grow'>
          <div className='text-xs font-semibold flex flex-col gap-2 mt-6'>
            <div className='flex gap-1 items-center'>
              <IoTimeOutline />
              <p className='text-[#383838]'>Tiempo Restante:</p>
              <p className='text-black'>1:30 horas</p>
            </div>
            <div className='flex gap-1'>
              <img src='./icons/calendar.svg' alt='calendar-Icon' />
              <p className='text-[#383838]'>Próxima Reunión</p>
              <p className='text-black'>Martes 24, Septiembre</p>
            </div>
          </div>
          <button className='hover:border-[2px] flex gap-4 items-center justify-center border-[1px] border-black rounded-lg w-full p-2'>
            <img src='./icons/eye.svg' alt='arrow-right' />
            <span>Ver mentoría</span>
          </button>
        </div>
      </div>
    </article>
  );
}

// Agregar PropTypes para validar las propiedades
MentorCard.propTypes = {
  mentor: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.arrayOf(PropTypes.string),
    rating: PropTypes.arrayOf(PropTypes.shape({
      puntaje: PropTypes.number,
    })),
  }).isRequired,
};
