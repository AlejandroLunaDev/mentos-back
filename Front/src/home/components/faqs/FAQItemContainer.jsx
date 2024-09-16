import React from 'react';
import FAQItem from './FAQItem';

function FAQItemContainer() {
    const faqs = [     
        {
            question: '¿Cómo contratar un mentor?',
            answer: 'Para contratar un mentor, simplemente explora las categorías disponibles o utiliza la función de búsqueda para encontrar al mentor ideal. Una vez seleccionado, revisa su perfil y haz clic en "Contratar". Podrás elegir entre las diferentes opciones de sesiones y completar el pago de forma segura.'
        },
        {
            question: '¿Qué métodos de pago acepta Mentos?',
            answer: 'Aceptamos varios métodos de pago, incluyendo tarjetas de crédito, débito y servicios de pago en línea como PayPal. Todos los pagos se procesan de manera segura y confiable.'
        },
        {
            question: '¿Puedo programar una sesión de prueba antes de contratar?',
            answer: 'Algunos mentores ofrecen la opción de una sesión de prueba o introductoria a un costo reducido o incluso gratuita. Puedes verificar esta opción en el perfil del mentor antes de contratar.'
        },
        {
            question: '¿Cómo puedo comunicarme con mi mentor?',
            answer: 'Una vez que contrates a un mentor, podrás comunicarte con él o ella a través de nuestra plataforma. Disponemos de herramientas de mensajería integradas para facilitar tu interacción y aprendizaje.'
        },
        {
            question: '¿Puedo cancelar o reprogramar una sesión?',
            answer: 'Sí, puedes cancelar o reprogramar una sesión directamente desde la plataforma. Sin embargo, te recomendamos revisar la política de cancelación de cada mentor, ya que algunos podrían requerir un aviso previo o cobrar una tarifa por cancelación tardía.'
        },
    ];

    return (
        <div className="flex gap-4 flex-col items-center justify-center min-h-screen  bg-gray-50  ">
            <h1 className="text-[40px] text-gray-500 font-semibold text-center mt-12 ">¿Dudas?</h1>
            <h2 className="text-[48px] font-semibold text-center text-purple-600 mb-6"><span className='text-black'>Consulta nuestras </span> FAQs</h2>
            <div className=" flex flex-col w-full px-[120px] min-h-[324px] gap-4  ">
                {faqs.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
            <div className="mt-8 ">
                <button className="bg-gradient-primary w-[384px] text-white px-6 py-3 rounded-lg mb-[58px] hover:bg-purple-700">
                    Ponte en contacto con Nosotros
                </button>
            </div>
        </div>
    );
}

export default FAQItemContainer;


