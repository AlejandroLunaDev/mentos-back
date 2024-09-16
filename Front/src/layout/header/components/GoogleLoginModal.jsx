

const GoogleLoginModal = ({ showModal, setShowModal }) => {
  const handleGoogleLogin = () => {
    // Redirigir al backend para el login con Google
    window.location.href = "redirecion al back";
  };

  return (
    <>
      {showModal ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Fondo oscuro semitransparente */}
          <div className="fixed inset-0 bg-gray-800 opacity-75"></div>
          {/* Contenido del modal con animación */}
          <div className={`bg-white rounded-lg p-8 space-x-6 shadow-lg z-10 transform transition-transform duration-300 ${showModal ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
            <button
              onClick={handleGoogleLogin}
              className="bg-white text-lg text-purple py-2 px-4 border-2 border-purple hover:bg-blue-600 rounded"
            >
              Iniciar sesión con Google
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="bg-white text-lg text-purple py-2 px-4 border-2 border-purple hover:bg-blue-600 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default GoogleLoginModal;
