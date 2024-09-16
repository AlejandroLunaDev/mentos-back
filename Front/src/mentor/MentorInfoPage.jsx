import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Badges from './components/Badges';
import ExperienceCard from './components/ExperienceCard';
import EducationCard from './components/EducationCard';
import Pricing from './components/Pricing';
import Estadistic from './components/Estadistic';
import SimilarMentorCarrousel from './components/SimilarMentorCarrousel';
import Reviews from './components/Reviews';
import averageAndCommetsNum from '../common/helper/averageAndCommetsNum';




export default function MentorInfoPage() {
  const { id } = useParams(); // Obteniendo la ID desde la URL
  const [mentor, setMentor] = useState(null); // Cambié el estado a un solo mentor
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('general'); // Estado para las solapas

  useEffect(() => {
    // Reemplaza 'getMentorById' con la función que haga la solicitud correcta
    fetch(`https://s17-14-t-php-react-production.up.railway.app/api/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMentor(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]); // Efecto se dispara cuando cambia el id

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!mentor) return <p>No se encontró ningún mentor.</p>;

  // Calcular promedio de las calificaciones y cantidad de reseñas
  const reviews = mentor.reviews || [];

  const normalizedAverageRating = averageAndCommetsNum(reviews); 


  const experience = mentor.experience && mentor.experience[0];
  const title = experience?.title || 'Sin título';
  const place = experience?.place || 'Sin lugar';

  return (
    <section className='my-24 bg-[#FAFAFA] relative'>
      <div className=' z-20 pt-28 relative'>
        <div className='w-full px-[120px] '>
          <header className='px-[120px] mb-5 flex justify-between'>
            <div className='w-full flex gap-4 items-center'>
              <figure className='w-[330px] h-[256px] p-2 bg-white rounded-lg'>
                <img className=' w-full h-full rounded-md' src={mentor.avatar} alt='mentor' />
              </figure>
              <div className='flex justify-between w-full'>
                <div>
                  <h1 className='font-bold text-2xl'>{mentor.category}</h1>
                  <p className='text-sm text-[#545557] '>
                    {mentor.first_name} {mentor.last_name}, {title} en {place}
                  </p>
                  <div className='flex items-center gap-1'>
                    <img src='/icons/star.svg' className='' alt='star' />
                    <span className='text-sm font-semibold h-4 '>{normalizedAverageRating.average}</span>
                    <span className='text-sm font-normal h-4 text-neutral-300'>
                      ({normalizedAverageRating.countComents} reseñas)
                    </span>
                  </div>
                </div>
                <figure>
                  <img src='/icons/heartCard.svg' alt='' />
                </figure>
              </div>
            </div>
          </header>

          {/* Solapas */}
          <article className='flex bg-white shadow-xl'>
            <div className='w-9/12 p-4 mt-4 '>
              <div className='flex'>
                <button
                  onClick={() => setActiveTab('general')}
                  className={`px-4 py-2 font-semibold text-xl ${
                    activeTab === 'general'
                      ? 'border-b-4 border-[#AA58FF] text-[#AA58FF]'
                      : 'text-gray-500'
                  }`}
                >
                  General
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-4 py-2 font-semibold text-xl ${
                    activeTab === 'reviews'
                      ? 'border-b-4 border-[#AA58FF] text-[#AA58FF]'
                      : 'text-gray-500'
                  }`}
                >
                  Reseñas
                </button>
              </div>

              {/* Contenido de la solapa activa */}
              {activeTab === 'general' && (
                <div className='mt-6'>
                  <article>
                    <div className='flex flex-col gap-4'>
                      <p className='text-gray-500 text-base mb-4'>{mentor.description}</p>
                      <div>
                        <h3 className='font-bold my-4'>Categorías</h3>
                        <ul className='flex gap-1'>
                          {mentor.category &&
                            mentor.category.map((category, index) => (
                              <li key={index}>{category}, </li>
                            ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className='font-bold my-4'>Habilidades</h3>
                        <ul className='flex gap-1'>
                          {mentor.skills &&
                            mentor.skills.map((skill, index) => (
                              <li className='border border-gray-500 px-1 rounded-sm' key={index}>
                                {skill}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                    <section className='w-full '>
                      <div className='flex justify-between items-center mt-8'>
                        <h2 className='font-bold text-xl text-gray-600'>Insignias</h2>
                        <small className='text-[#AA5BFF] cursor-pointer '>
                          ¿Qué significa esto?
                        </small>
                      </div>
                      <p className='bg-gradient-secondary text-white p-2 w-full mt-4 rounded-lg text-xl font-semibold'>
                        Mentor Top en {mentor.category}
                      </p>
                    </section>
                    <section className='flex flex-col gap-8'>
                      <Badges />
                      <ExperienceCard mentor={mentor} />
                      <EducationCard mentor={mentor} />
                    </section>
                  </article>
                </div>
              )}

              {/* Contenido de la solapa de reseñas */}
              {activeTab === 'reviews' && (
                <div className='mt-6'>
                  <Reviews mentor={mentor} />
                </div>
              )}
            </div>
            <aside className='p-6 flex flex-col gap-4 w-3/12'>
              <header>
                <h2 className='text-xl font-semibold'>Planes de mentoría</h2>
                <small>Agenda una sesión 1:1 según tus necesidades</small>
              </header>
              <Pricing mentor={mentor} />
              <h2 className='text-xl font-semibold'>Estadísticas de la comunidad</h2>
              <Estadistic />
              <h2 className='text-xl font-semibold'>Mentorías similares</h2>
              <SimilarMentorCarrousel mentor={mentor} />
            </aside>
          </article>
        </div>
      </div>
      <img className='w-full absolute top-0 z-10' src='/img/mentorinfohead.png' alt='' />
    </section>
  );
}
