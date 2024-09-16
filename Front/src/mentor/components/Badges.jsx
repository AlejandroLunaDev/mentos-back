export default function Badges() {
    const infoCard = [
      { title: 'Comunicador efectivo', description: 'El 81% de los usuarios están de acuerdo en que la comunicación es excelente.', img: '/icons/star-shine.svg' },
      { title: 'Presencia constante', description: 'Más del 40% de los usuarios destacan la resolución de dudas.', img: '/icons/user-check.svg' },
    ];
  
    return (
      <article className="flex gap-2 mt-2">
        {infoCard.map((card, index) => (
          <div key={index} className="flex items-center space-x-4 p-8  shadow-xl rounded-xl border-2">
            <img src={card.img} alt={card.title} className="w-12 h-12" />
            <div>
              <h3 className="text-md font-semibold text-[#AA58FF]">{card.title}</h3>
              <p>{card.description}</p>
            </div>
          </div>
        ))}
      </article>
    );
  }
  