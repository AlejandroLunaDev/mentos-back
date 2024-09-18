import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../redux/actions/actions";

const Banner = () => (
  <div className="col-span-3  bg-gray-900 text-white p-6 rounded-lg mb-6 relative overflow-hidden">
    <h2 className=" flex justify-center items-center text-4xl mt-10 font-semibold mb-2  text-violeta z-10 relative">
      Empecemos a aprender
    </h2>
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="absolute top-4 left-4 w-12 h-12 border-4 border-gray-700 rounded-full"></div>
      <div className="absolute top-4 right-4 w-8 h-8 bg-purple-500 rounded-full"></div>
      <div className="absolute bottom-4 left-1/4 w-16 h-16 border-8 border-gray-700 rounded-full"></div>
    </div>
  </div>
);

const MentorshipItem = ({ image, title }) => (
  <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow mb-2">
    <div className="flex items-center">
      <img src={image} alt={title} className="w-10 h-10 rounded-full mr-3" />
      <span>{title}</span>
    </div>
    <img
      src="./icons/triangle.svg"
      className="w-5 h-5 -rotate-90 text-gray-400"
    />
  </div>
);

const EventItem = ({ date, time, title }) => (
  <div className="text-center px-10 py-6 rounded-lg shadow">
    <div className="font-bold">{date}</div>
    <div className="text-sm text-gray-500 mb-2">{time}</div>
    <div className="text-sm">{title}</div>
  </div>
);

const NoteItem = ({ icon, count, title, subtitle }) => (
  <div className="bg-white p-4 rounded-lg shadow text-center">
    {icon}
    <div className="text-3xl font-bold mt-2">{count}</div>
    <div className="text-sm font-medium">{title}</div>
    <div className="text-xs text-gray-500">{subtitle}</div>
  </div>
);

const ProgressCircle = ({ percentage, title }) => (
  <div className="flex flex-col items-center">
    <div className="relative">
      <svg className="w-20 h-20">
        <circle
          className="text-gray-200"
          strokeWidth="5"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
        <circle
          className="text-purple-500"
          strokeWidth="5"
          strokeDasharray={30 * 2 * Math.PI}
          strokeDashoffset={30 * 2 * Math.PI * (1 - percentage / 100)}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
        {percentage}%
      </span>
    </div>
    <span className="mt-2 text-sm">{title}</span>
  </div>
);

const PopularMentorship = ({ image, name, title }) => (
  <div className="flex flex-col items-center ">
    <img src={image} alt={name} className="w-16 h-16 rounded-full mb-2" />
    <span className="text-sm font-medium">{name}</span>
    <span className="text-xs text-gray-500">{title}</span>
  </div>
);

export default function UserDashboard() {
  const user = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserById(user._id));
  }, [dispatch, user._id]);
  console.log("datos usuario: ", user);
  return (
    <div className="max-w-[1440px] mx-auto mt-[80px] mb-10 px-12">
      <h1 className="text-2xl font-bold mb-6">Hola {user.first_name} 👋</h1>
      <div className=" grid grid-cols-4  gap-4">
        <Banner />

        <div className="p-4  rounded-lg  mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Mis mentorias</h3>
            <a href="#" className="text-purple-600 text-sm">
              Ver todas
            </a>
          </div>
          {user.mentors ? (
            <MentorshipItem
              key={user.mentors[0]._id}
              image={user.mentors[0].avatar}
              title={user.mentors[0].mentory}
            />
          ) : (
            /* user.mentors.map((mentor) => (
              <MentorshipItem
                key={mentor._id}
                image={mentor.avatar}
                title={mentor.mentory}
              />
            )) */
            <p>No hay mentorias</p>
          )}
          <MentorshipItem
            image="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            title="Diseño Gráfico Profesional"
          />
        </div>
        <div className="col-span-3 bg-white p-4  mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Eventos</h3>
            <div>
              <button className="p-1  rounded-full mr-2">
                <img src="./icons/arrowL.svg" className="w-5 h-5" />
              </button>
              <button className="p-1 rounded-full">
                <img src="./icons/arrowR.svg" className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <EventItem
              date="12.09.24"
              time="18:00 - 19:00"
              title="Diseño gráfico"
            />
            <EventItem
              date="18.09.24"
              time="18:00 - 19:00"
              title="Diseño gráfico"
            />
            <EventItem
              date="24.09.24"
              time="18:00 - 19:00"
              title="Diseño gráfico"
            />
            <EventItem date="Próximo" time="0:00 - 0:00" title="Sin evento" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Mentorias en progreso</h3>
            <a href="#" className="text-purple-600 text-sm">
              Ver todas
            </a>
          </div>
          <div className="flex justify-around">
            <ProgressCircle percentage={25} title="Diseño Gráfico" />
            <ProgressCircle percentage={0} title="Matemáticas" />
          </div>
        </div>
        <div className="col-span-3 bg-white p-4 rounded-lg ">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Notas pendientes</h3>
            <a href="#" className="text-purple-600 text-sm">
              Ver todas
            </a>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <NoteItem
              icon={
                <img
                  src="./icons/fileText.svg"
                  className="w-8 h-8 text-purple-500 mx-auto"
                />
              }
              count={2}
              title="Mensajes sin leer"
              subtitle="En 10 días"
            />
            <NoteItem
              icon={
                <img
                  src="./icons/fileText.svg"
                  className="w-8 h-8 text-purple-500 mx-auto"
                />
              }
              count={1}
              title="Revisión portfolio"
              subtitle="Mejora de portfolio"
            />
            <NoteItem
              icon={
                <img
                  src="./icons/fileText.svg"
                  className="w-8 h-8 text-purple-500 mx-auto"
                />
              }
              count={3}
              title="Sesiones en vivo"
              subtitle="Mes octubre"
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg ">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Mentorias populares</h3>
            <span className="text-sm text-gray-500">
              De acuerdo a tus guardados
            </span>
          </div>
          <div className="flex justify-around">
            <PopularMentorship
              image="https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?q=80&w=1341&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              name="Luis Do"
              title="Matemáticas Inicial"
            />
            <PopularMentorship
              image="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              name="Ayelén Cuentas"
              title="Matemáticas Financieras"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
