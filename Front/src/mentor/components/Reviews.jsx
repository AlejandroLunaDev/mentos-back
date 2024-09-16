/* eslint-disable react/prop-types */
import { FaStar, FaRegStar } from 'react-icons/fa'; // Importar las estrellas de react-icons
import { CiFaceSmile, CiFaceFrown, CiFaceMeh } from "react-icons/ci";
import { AiOutlineExclamationCircle } from "react-icons/ai"; // Importar un ícono para el mensaje de sin reseñas

// Componente para mostrar la barra de porcentaje
function PercentageBar({ rating }) {
  const percentage = (rating / 5) * 100;
  return (
    <div className="w-full bg-gray-200 rounded-lg h-2">
      <div className="h-full bg-gradient-primary rounded-lg" style={{ width: `${percentage}%` }} />
    </div>
  );
}

// Componente principal
export default function Reviews({ mentor }) { // Desestructurando mentor aquí
  const { reviews } = mentor;

  // Inicializar un objeto para almacenar los totales de cada categoría
  const categoryTotals = {};

  // Verificar si hay reseñas
  if (!reviews || reviews.length === 0) {
    return (
      <section className="p-4 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <AiOutlineExclamationCircle className="text-4xl text-gray-500 mb-2" />
          <p className="text-lg text-gray-500">Aún no ha recibido ninguna reseña.</p>
        </div>
      </section>
    );
  }

  // Recorrer todas las reviews y calcular el total y el conteo de cada categoría
  reviews.forEach((review) => {
    review.categories.forEach((category) => {
      if (!categoryTotals[category.name]) {
        categoryTotals[category.name] = { total: 0, count: 0 };
      }
      categoryTotals[category.name].total += category.rating;
      categoryTotals[category.name].count += 1;
    });
  });

  // Calcular el promedio para cada categoría
  const categoryAverages = Object.keys(categoryTotals).map((categoryName) => {
    const { total, count } = categoryTotals[categoryName];
    return { name: categoryName, average: count > 0 ? total / count : 0 };
  });

  // Mostrar solo las primeras 4 categorías
  const categoriesToShow = categoryAverages.slice(0, 4);

  return (
    <section className="p-4">
      <header>
        <div className="grid grid-cols-2 gap-4">
          {categoriesToShow.map((category, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-md capitalize">{category.name}</p>
                <p>{(category.average * 20).toFixed(2)}%</p>
              </div>
              <PercentageBar rating={category.average} />
            </div>
          ))}
        </div>
      </header>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Comentarios</h2>
        {reviewsCard(reviews)}
      </div>
    </section>
  );
}

// Mostrar la review card
function reviewsCard(reviews) {
  return (
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg p-4">
          <div className="flex items-center mb-2">
            {/* Avatar, nombre y apellido del mentee */}
            <img src={review.mentee.avatar} alt={review.mentee.first_name} className="w-10 h-10 rounded-full mr-4" />
            <div>
              <p className="text-md font-semibold">
                {review.mentee.first_name} {review.mentee.last_name}
              </p>
              <p className="text-sm text-[#AA5BFF]">Mentee</p>
            </div>
          </div>

          {/* Mostrar estrellas según el overallRating */}
          <div className="flex justify-between items-center mb-2">
            {renderStars(review.overallRating)}
            <p className="text-sm text-gray-500">
              {new Date(review.date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </p>
          </div>

          {/* Mensaje de la review */}
          <p className="text-md">{review.message}</p>

          {/* Mostrar categorías con caritas */}
          <div className="flex gap-2 mb-2">
            {review.categories.slice(0, 4).map((category, index) => (
              <div key={index} className="flex gap-2 items-center border p-2 mt-5 rounded-lg border-[#AA5BFF] bg-[#AA5BFF] bg-opacity-50 ">
                {renderFace(category.rating)}
                <p className="text-sm text-gray-700 capitalize ">{category.name}:</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Función para mostrar estrellas
function renderStars(rating) {
  const fullStars = Math.floor(rating); // Estrellas llenas
  const hasHalfStar = rating % 1 !== 0; // Ver si hay media estrella
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Estrellas vacías

  return (
    <div className="flex items-center">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-400" />
        ))}

      {hasHalfStar && <FaStar className="text-yellow-400" />}

      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-yellow-400" />
        ))}
    </div>
  );
}

// Función para mostrar la carita según el porcentaje
function renderFace(rating) {
  const percentage = (rating / 5) * 100;

  if (percentage < 25) {
    return <CiFaceFrown className="text-2xl" />;
  } else if (percentage >= 25 && percentage <= 60) {
    return <CiFaceMeh className="text-2xl" />;
  } else {
    return <CiFaceSmile className="text-2xl" />;
  }
}
