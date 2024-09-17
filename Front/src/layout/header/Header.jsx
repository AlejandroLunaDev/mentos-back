import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import MenuMentoriasModal from "./components/MenuMentorias";
import MenuPerfilModal from "./components/MenuPerfil";
import { useAuth } from "../../common/hook/useAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  //const [showModal, setShowModal] = useState(false);
  const [isMenuMentoriasOpen, setIsMenuMentoriasOpen] = useState(false);
  const [isMenuPerfilOpen, setIsMenuPerfilOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { user, loginWithGoogle } = useAuth();
  const navigate = useNavigate(); // Hook para redirigir

  const isLoggedIn = !!user?.decodedToken;

  const handleNavigateClickHome = () => {
    navigate(`/`);
  };

  const handleLoginClick = async () => {
    try {
      // Llama al método de inicio de sesión con Google
      await loginWithGoogle();
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };
  return (
    <div className="min-[80px]">
      <nav className="fixed top-0 left-0 right-0 backdrop-blur-md bg-white/60 z-50">
        <div className="max-w-full mx-auto py-[10px] px-4 sm:px-6 lg:px-2">
          <div className="flex items-center justify-between h-16 mx-12 ">
            <div className="flex ">
              <div className="flex-shrink-0">
                <img
                  src="./icons/logo.svg"
                  className="flex  cursor-pointer select-none"
                  alt="mentos logo"
                  onClick={() => handleNavigateClickHome()}
                />
              </div>
              <div className="hidden md:block relative">
                <div className="ml-10 flex items-baseline gap-6">
                  <a
                    href="/"
                    className="text-black hover:text-violeta2 py-3 rounded-md text-base font-semibold cursor-pointer select-none"
                  >
                    Inicio
                  </a>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => setIsMenuMentoriasOpen(!isMenuMentoriasOpen)}
                  >
                    <a className="text-black hover:text-violeta2 pr-2 py-3 rounded-md text-base font-semibold cursor-pointer select-none">
                      Mentorías
                    </a>
                    <BiChevronDown
                      className={`transition-transform duration-200 ${isMenuMentoriasOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                  <a
                    href="#"
                    className="text-black hover:text-violeta2 py-3 rounded-md text-base font-semibold cursor-pointer select-none"
                  >
                    Ayuda
                  </a>
                </div>

                {isMenuMentoriasOpen && <MenuMentoriasModal />}
              </div>
            </div>
            <div className="flex flex-row gap-6 h-[42px] items-right">
              {window.location.pathname !== "/search" && (
                <div className="flex items-center w-[360px] border-violeta border-2 rounded-lg">
                  <FaSearch className="ml-2 text-black" />
                  <input
                    type="search"
                    placeholder="Buscar mentoría..."
                    className="bg-violeta text-sm font-medium placeholder-black bg-clip-text text text-violeta py-1 px-4 flex-1 outline-none"
                  />
                </div>
              )}

              {isLoggedIn ? (
                <div className="flex flex-nowrap gap-6 items-center">
                  <div className="flex items-center bg-transparent rounded-full">
                    <img className="" src="./icons/heart.svg" alt="" />
                  </div>
                  <div
                    className="flex gap-4 cursor-pointer select-none"
                    onClick={() => setIsMenuPerfilOpen(!isMenuPerfilOpen)}
                  >
                    <div className="flex items-center">
                      <img
                        src={user.decodedToken.avatar}
                        alt="User Avatar"
                        className=" h-10 rounded-full"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm text-black font-medium">
                        {user.decodedToken.first_name}{" "}
                        {user.decodedToken.last_name}
                      </span>
                      <span className="text-xs text-[#252729] text-muted-foreground">
                        {user.decodedToken.role.charAt(0).toUpperCase() +
                          user.decodedToken.role.slice(1)}
                      </span>
                    </div>
                    <BiChevronDown
                      className={`text-black transition-transform duration-200 ${isMenuPerfilOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                  {isMenuPerfilOpen && <MenuPerfilModal />}
                </div>
              ) : (
                <div className="flex gap-6">
                  <button
                    onClick={handleLoginClick}
                    className="bg-white text-sm font-semibold bg-gradient-primary bg-clip-text text-transparent py-1 px-4 border-2 border-violeta hover:bg-violeta2 rounded-tr-lg rounded-bl-lg whitespace-nowrap cursor-pointer select-none"
                  >
                    Iniciar Sesión
                  </button>
                  <button className="bg-white text-sm font-semibold bg-gradient-primary text-blanco py-1.5 px-4 hover:bg-violeta2 rounded-tr-lg rounded-bl-lg cursor-pointer select-none">
                    Registrarse
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
