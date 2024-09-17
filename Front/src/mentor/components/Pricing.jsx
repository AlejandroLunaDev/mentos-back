/* eslint-disable react/prop-types */
import { useState } from 'react';
import { addMentortoUser } from '../../common/service/users/addMentortoUser';
import Swal from 'sweetalert2'; // Importamos SweetAlert2
import 'sweetalert2/dist/sweetalert2.min.css'; // Asegúrate de importar los estilos de SweetAlert2
import { useNavigate } from 'react-router-dom';

export default function Pricing({ mentor }) {
  const { pricing, _id: mentorId } = mentor; // Extraemos el mentorId
  //console.log(mentor);
  
  // Asegurarse de que pricing esté definido y sea un array
  const sortedPricing = (pricing || []).sort((a, b) => a - b);

  // Manejar los casos en los que hay menos de tres precios
  const basic = sortedPricing[0]?.toFixed(2) || '0.00';
  const premium = sortedPricing[1]?.toFixed(2) || '0.00';
  const pack = sortedPricing[2]?.toFixed(2) || '0.00';
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('basic');

  const handleAddMentor = async () => {
    try {
      // Obtén el id del usuario desde localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user ? user.id : null;

      if (!userId) {
        console.error('No se encontró el ID del usuario en localStorage');
        return;
      }

      // Llamamos a la función para agregar el mentor
      const response = await addMentortoUser(userId, mentorId);
      const mentors = JSON.parse(localStorage.getItem('mentors')) || [];

      if (!mentors.includes(mentorId)) {
        mentors.push(mentorId);
        localStorage.setItem('mentors', JSON.stringify(mentors));
      }

      // Mostrar alerta de éxito con SweetAlert2
      Swal.fire({
        title: '¡Pago realizado!',
        text: 'En breve, tu mentor se pondrá en contacto contigo.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        background: '#fff',
        customClass: {
          popup: 'rounded-lg shadow-lg',
          confirmButton: 'bg-gradient-primary text-white py-2 px-4 rounded-lg',
        },
      }).then(() => {
        // Redirigir a /dashboard después de que el usuario cierre la alerta
        navigate('/dashboard');
      });

      //console.log('Mentor agregado:', response);
    } catch (error) {
      console.error('Error al agregar el mentor:', error);

      // Mostrar alerta de error si algo falla
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al procesar tu solicitud. Intenta nuevamente más tarde.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg border">
      {/* Solapas */}
      <div className="flex justify-around mb-4">
        <button
          className={`px-4 py-2 font-semibold text-sm ${
            activeTab === 'basic'
              ? 'border-b-4 border-[#AA58FF] text-[#AA58FF]'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('basic')}
        >
          Básico
        </button>
        <button
          className={`px-4 py-2 font-semibold text-sm ${
            activeTab === 'premium'
              ? 'border-b-4 border-[#AA58FF] text-[#AA58FF]'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('premium')}
        >
          Premium
        </button>
        <button
          className={`px-4 py-2 font-semibold text-sm ${
            activeTab === 'pack'
              ? 'border-b-4 border-[#AA5BFF] text-[#AA5BFF]'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('pack')}
        >
          Pack
        </button>
      </div>

      {/* Cuerpo de la solapa seleccionada */}
      <div>
        {activeTab === 'basic' && (
          <div>
            <h3 className="text-xl font-bold">${basic} / Mensual</h3>
            <div className='mt-4 flex flex-col gap-1'>
              <p className="text-md font-semibold">Mentoría 1:1</p>
              <div className='flex gap-1 items-center'>
                <img src="/icons/call-dropped.svg" alt="" />
                <p className='text-xs'>45 minutos, 2 sesiones por semana</p>
              </div>
              <div className='flex gap-1 items-center'>
                <img src="/icons/message-circle.svg" alt="" />
                <p className='text-xs'>Acceso al chat 24/7</p>
              </div>
              <div className='flex gap-1 items-center'>
                <img src="/icons/time-circle.svg" alt="" />
                <p className='text-xs'>Respuestas en 24 horas o menos</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'premium' && (
          <div>
            <h3 className="text-xl font-bold">${premium} / Mensual</h3>
            <div className='mt-4 flex flex-col gap-1'>
              <p className="text-md font-semibold">Mentoría 1:1</p>
              <div className='flex gap-1 items-center'>
                <img src="./icons/call-dropped.svg" alt="" />
                <p className='text-xs'>2 horas, 2 sesiones por semana</p>
              </div>
              <div className='flex gap-1 items-center'>
                <img src="./icons/message-circle.svg" alt="" />
                <p className='text-xs'>Acceso al chat 24/7</p>
              </div>
              <div className='flex gap-1 items-center'>
                <img src="./icons/time-circle.svg" alt="" />
                <p className='text-xs'>Respuestas en 24 horas o menos</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pack' && (
          <div>
            <h3 className="text-xl font-bold">${pack} / Mensual</h3>
            <div className='mt-4 flex flex-col gap-1'>
              <p className="text-md font-semibold">Mentoría 1:1</p>
              <div className='flex gap-1 items-center'>
                <img src="./icons/call-dropped.svg" alt="" />
                <p className='text-xs'>Ilimitado</p>
              </div>
              <div className='flex gap-1 items-center'>
                <img src="./icons/message-circle.svg" alt="" />
                <p className='text-xs'>Acceso al chat 24/7</p>
              </div>
              <div className='flex gap-1 items-center'>
                <img src="./icons/time-circle.svg" alt="" />
                <p className='text-xs'>Respuestas inmediata</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleAddMentor}
        className='mt-6 bg-gradient-primary text-white text-sm py-1 px-4 border-2 border-violeta hover:bg-violeta2 rounded-tr-lg rounded-bl-lg whitespace-nowrap select-none w-full'
      >
        Contratar
      </button>
    </div>
  );
}
