import { useState } from "react";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-lg shadow-lg border-b bg-[#FAFAFA] border-gray-300">
      <button
        className="h-[52px] rounded-lg w-full text-left p-4 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold">{question}</span>
        {/* Cambia el botón interior por un <div> */}
        <div className="h-6 w-6 bg-gradient-primary rounded-full flex justify-center items-center">
          <span className="text-white font-semibold text-xl">
            {isOpen ? "-" : "+"}
          </span>
        </div>
      </button>
      {isOpen && <div className="p-4 text-gray-600">{answer}</div>}
    </div>
  );
};

export default FAQItem;
