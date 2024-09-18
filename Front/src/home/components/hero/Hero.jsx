import { useAuth } from '../../../common/hook/useAuth';

export default function Hero() {
  const { user } = useAuth();
  const name = user?.decodedToken?.first_name;

  return (
    <div className=" h-[330px] w-full flex items-center px-[120px] justify-between bg-[#FAFAFA] pt-[120px] pb-[50px] ">
      <div>
        {user && (
          <small className='text-[22px] text-[#292B2D] font-bold '>
            Hola {name}✌
          </small>
        )}

        <h1 className=' text-5xl text-[#AA5BFF] font-bold '>
          ¿Qué vas a aprender hoy?{' '}
        </h1>
      </div>
      <div className='relative flex justify-center items-center '>
        <div className='absolute w-full h-full backdrop-blur-md z-10'></div>
        <img
          className='absolute  z-20 '
          src='./img/adelante.png'
          alt='foto-adelante'
        />
        <img className=' ' src='./img/atras.png' alt='foto-atras' />
        <div className='absolute z-30  w-full h-full'>
          <div className='relative w-full h-full'>
            <p className='absolute  -right-[90px] top-28 font-bold'>
              97% de Usuarios satisfechos
            </p>
            <p className='absolute -left-10 bottom-14 font-bold'>
              + 15.000 Mentores
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
