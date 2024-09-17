/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import TopBanner from "./TopMentor";
import averageAndCommetsNum from "../helper/averageAndCommetsNum";
import visibleSkill from "../helper/visibleSkill";
import { useNavigate } from "react-router-dom";

const Card = ({ mentor }) => {
  const [visibleSkills, setVisibleSkills] = useState([]);
  const [remainingCount, setRemainingCount] = useState(0);
  const navigate = useNavigate();

  // Calcular el promedio de puntajes
  const [average, setAverage] = useState(0);
  const [comentNum, setComentNum] = useState(0);

  useEffect(() => {
    const averageAndCommets = averageAndCommetsNum(mentor.reviews);
    setAverage(averageAndCommets.average); // Redondear a 1 decimal
    setComentNum(averageAndCommets.countComents);
  }, [mentor.reviews]);

  useEffect(() => {
    const visibleSkills = visibleSkill(mentor.skills, 23);
    setVisibleSkills(visibleSkills.visible);
    setRemainingCount(visibleSkills.remaining);
  }, [mentor.skills]);

  const lastPrice = mentor.pricing.length - 1;

  return (
    <div onClick={() => navigate(`/mentor/${mentor._id}`)} className="w-[384px] h-[353px] cursor-pointer">
      <div className="relative overflow-hidden rounded-xl shadow-lg">
        {/* Mostrar TopBanner solo si average > 4.5 y comentNum >= 3 */}
        {mentor.top && <TopBanner />}

        <img
          src={mentor.avatar}
          alt="name"
          className="w-[384px] h-[353px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <button className="absolute top-[8px] left-[324px] flex items-center border-violeta border-[0.5px] justify-center size-[44px] bg-white/30 rounded-full backdrop-blur-md">
          <img
            src="./icons/heartCard.svg"
            className="size-6 text-violeta transition-transform "
          />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4 cursor-pointer">
          <h2 className="text-base font-semibold top-[275px] h-6 text-white left-[16px]">
            {mentor.mentory ? mentor.mentory : "Clase Generica"}
          </h2>
          <div className="flex gap-2 left-4 top-[301px]">
            <p className="text-white/90 text-xs font-normal h-4">
              {mentor.first_name} {mentor.last_name}
            </p>
            <div className="ml-1 flex items-center gap-[2px]">
              <span className="text-xs font-normal h-4 text-white ml-1">
                {average}
              </span>
              <span className="text-xs font-normal h-4 text-neutral-300 ml-1">
                ({comentNum})
              </span>
              <img
                src="./icons/star.svg"
                className="size-4 transition-transform "
              />
            </div>
          </div>

          <div className="flex">
            <ul className="flex flex-wrap gap-1 pt-1 top-[323px] h-[22px] left-4">
              {visibleSkills.map((item, index) => (
                <li
                  key={index}
                  className="px-1 py-[2px] border-violeta border-[1px] h-[22px] text-white font-normal text-xs rounded-sm backdrop-blur-xl bg-violeta/20"
                >
                  {item}
                </li>
              ))}
              {remainingCount > 0 && (
                <li className="pl-1 py-[2px] pr-[6px] border-violeta border-[1px] h-[22px] text-white font-normal text-xs rounded-sm backdrop-blur-xl bg-violeta/20">
                  +{remainingCount}
                </li>
              )}
            </ul>
          </div>
          <div className="absolute flex text-nowrap top-[57px] left-[253px] mr-[10px] gap-[10px]">
            <p className="text-white text-xl gap-[10px] font-semibold">
            ${mentor.pricing[0]} - ${mentor.pricing[lastPrice]} 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
