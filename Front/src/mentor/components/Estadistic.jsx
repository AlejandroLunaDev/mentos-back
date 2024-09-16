

export default function Estadistic() {
  return (
    <article className="border shadow-lg p-6 rounded-md flex flex-col gap-4">
        <div className="flex gap-2">
            <img src="/icons/rocket.svg" alt="" />
            <div>
                <h3 className="font-semibold">3165 Miutos</h3>
                <small>Minutos de mentorías</small>
            </div>
        </div>
        <div className="flex gap-2">
            <img src="/icons/star-frame.svg" alt="" />
            <div>
                <h3 className="font-semibold">200 Sesiones</h3>
                <small>Mentorías realizadas</small>
            </div>
        </div>
        <small className="text-center text-[#AA5BFF] cursor-pointer">Ver todos</small>
    </article>
  )
}
