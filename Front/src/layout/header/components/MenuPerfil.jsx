import { useAuth } from "../../../common/hook/useAuth";

const MenuPerfilModal = () => {
  const { logout } = useAuth();
  const handleLogoutClick = async () => {
    try {
      // Llama al método de inicio de sesión con Google
      await logout();
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    }
  };
  return (
    <>
      <div className="fixed">
        <div className="absolute top-[35px] left-[201px] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-violeta"></div>
        <div className="absolute top-full mt-11  -right-[230px] w-[148px] bg-white bg-opacity-80 border-2 border-neutral-200 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg overflow-hidden transition-all duration-200 ease-in-out">
          {/* Triángulo de globo en la parte superior izquierda */}

          <div className="flex flex-wrap gap-4 p-4 ">
            <a href="#" className=" text-sm font-semibold text-black hover:text-violeta2">
              Mi perfil
            </a>
            <a href="#" className=" text-sm font-semibold text-black hover:text-violeta2">
              Notificaciones
            </a>
            <a href="#" className=" text-sm font-semibold text-black hover:text-violeta2">
              Dashboard
            </a>
            <button onClick={handleLogoutClick}   className=" text-sm font-semibold text-neutral-500 hover:text-violeta">
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuPerfilModal;
