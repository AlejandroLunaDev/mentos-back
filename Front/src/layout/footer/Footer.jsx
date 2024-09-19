import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-8 px-4 lg:px-[100px] md:px-8 ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-6 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center mb-4">
            {/*<h2 className="font-bold text-xl">Mentos</h2>*/}
            <div className="ml-2">
              <img src="/public/icons/logo.svg" alt="Logo" />
            </div>
          </div>
          <p className="mb-6 font-size-16">
            Únete a una red de mentores líderes de la industria que ofrecen
            asesoramiento estratégico. Eleva tu desarrollo profesional con
            mentorías personalizadas.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              aria-label="Facebook"
              className=" text-black hover:text-gray-600"
            >
              <FontAwesomeIcon icon={faFacebook} className="size-[33px]" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-black hover:text-gray-600"
            >
              <FontAwesomeIcon icon={faInstagram} className="size-[33px]" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-black hover:text-gray-600"
            >
              <FontAwesomeIcon icon={faLinkedin} className="size-[33px]" />
            </a>
            <a
              href="#"
              aria-label="X"
              className="text-black hover:text-gray-600"
            >
              <FontAwesomeIcon icon={faXTwitter} className="size-[33px]" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-bold font-size-20 mb-4">Nosotros</h3>
          <ul className="space-y-2 font-size-16">
            <li>
              <a href="#" className="hover:underline">
                Quiénes somos
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Sostenibilidad
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Trabaja con nosotros
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold font-size-20 mb-4">Plataforma</h3>
          <ul className="space-y-2 font-size-16">
            <li>
              <a href="#" className="hover:underline">
                Explorar mentores
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Reserva una sesión
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Testimonios
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold font-size-20 mb-4">Legales</h3>
          <ul className="space-y-2 font-size-16">
            <li>
              <a href="#" className="hover:underline">
                Política de privacidad
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Términos y condiciones
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold font-size-20 mb-4">Ayuda</h3>
          <ul className="space-y-2 font-size-16">
            <li>
              <a href="#" className="hover:underline">
                Preguntas frecuentes
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contactos
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-8 flex justify-between items-center border-t-2 border-black ">
        <p className="text-md mt-8 text-black">©2024 Mentos</p>
        <hr />
        <p className="text-md mt-8 text-black">Equipo de desarrollo</p>
      </div>
    </footer>
  );
};

export default Footer;
