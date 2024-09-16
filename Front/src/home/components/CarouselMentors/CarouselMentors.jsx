import { useEffect, useState } from "react";
import Card from "../../../common/components/CardMentor";
import { useSelector } from "react-redux";

// Función para obtener mentores al azar
const getRandomMentors = (mentors, count = 9) => {
  const shuffled = [...mentors].sort(() => 0.5 - Math.random()); // Crea una copia antes de ordenar
  return shuffled.slice(0, count);
};

const CarouselMentors = () => {
  const allTopMentors = useSelector((state) => state.mentorsTop);

  const [randomMentors, setRandomMentors] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Obtener 9 mentores aleatorios cuando el componente se monta
  useEffect(() => {
    if (allTopMentors.length > 0) {
      setRandomMentors(getRandomMentors(allTopMentors, 9));
    }
  }, [allTopMentors]);

  // Función para actualizar el número de tarjetas a mostrar según el tamaño de la pantalla
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 780) {
        setItemsPerPage(1); // Mostrar 1 tarjeta si la pantalla es más chica.
      } else {
        setItemsPerPage(3); // Mostrar 3 tarjetas si es más grande
      }
    };
    // Ejecuta la función al cargar el componente y cuando la ventana cambia de tamaño
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    // Limpia el listener al desmontar el componente
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Avanzar una tarjeta
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      // Verifica si el nuevo índice sobrepasa el número de elementos disponibles
      return newIndex < randomMentors.length ? newIndex : prevIndex;
    });
  };

  // Retroceder una tarjeta
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      return newIndex >= 0 ? newIndex : prevIndex; // No retroceder más allá del inicio
    });
  };

  return (
    <div className="relative w-full min-h-[500px] flex flex-col bg-[#FAFAFA] justify-center items-center">
      <div className="">
        <h1 className="text-[46px] font-semibold text-center text-[#707172]">
          Inspírate
        </h1>
        <div className="flex flex-wrap items-center justify-center text-center">
          <h1 className="text-[56px] font-semibold mb-6 text-center">
            Con nuestros Mentores
          </h1>
          <h1 className="text-[56px] font-semibold mb-6 text-center bg-gradient-primary bg-clip-text text-transparent py-1 px-4 hover:bg-violeta2 rounded-tr-lg rounded-bl-lg whitespace-nowrap select-none">
            Destacados
          </h1>
        </div>
      </div>

      <div className="overflow-hidden xl:w-[1212px] md:w-[384px] bg-[#FAFAFA] flex flex-col">
        <div className="pb-3 flex flex-row-reverse bg-[#FAFAFA] rounded-full">
          <button
            className={`p-2 rounded-full ${currentIndex >= randomMentors.length - itemsPerPage ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={nextSlide}
            aria-label="Siguiente mentor"
            disabled={currentIndex >= randomMentors.length - itemsPerPage}
          >
            <img src="./icons/arrowR.svg" className="size-[42px]" />
          </button>
          <button
            className={`p-2 rounded-full ${currentIndex <= 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={prevSlide}
            aria-label="Mentor anterior"
            disabled={currentIndex <= 0}
          >
            <img src="./icons/arrowL.svg" className="size-[42px]" />
          </button>
        </div>

        {/* Tarjetas del carrusel */}
        <div className="flex gap-[30px] justify-center">
          {randomMentors
            .slice(currentIndex, currentIndex + itemsPerPage) // Mostrar tarjetas dentro del rango visible
            .map((mentor, index) => (
              <div key={index}>
                <Card mentor={mentor} />
              </div>
            ))}
        </div>
      </div>

      {/* Indicadores de navegación */}
      <div className="flex justify-center mt-4 w-[250px] space-x-2">
        {Array.from({ length: Math.ceil(randomMentors.length - 2) }).map(
          (_, index) => (
            <button
              key={index}
              className={`w-4 h-2 rounded-sm ${index === Math.floor(currentIndex) ? "bg-[#545454]" : "bg-[#D9D9D9]"}`}
              onClick={() => setCurrentIndex(index * itemsPerPage)}
              aria-label={`Ir a la tarjeta ${index + 1}`}
            />
          )
        )}
      </div>
    </div>
  );
};

export default CarouselMentors;
