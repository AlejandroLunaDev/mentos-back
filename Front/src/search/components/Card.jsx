/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import averageAndCommetsNum from "../../common/helper/averageAndCommetsNum";
import visibleSkill from "../../common/helper/visibleSkill";
import TopBanner from "../../common/components/TopMentor";
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
    const visibleSkills = visibleSkill(mentor.skills, 30);
    setVisibleSkills(visibleSkills.visible);
    setRemainingCount(visibleSkills.remaining);
  }, [mentor.skills]);

  const lastPrice = mentor.pricing.length - 1;
  return (
    <div onClick={() => navigate(`/mentor/${mentor._id}`)} className="overflow-hidden drop-shadow-lg w-[792px] rounded-lg border-[1px] border-[#EAEAEA] bg-white h-[273px] cursor-pointer">
      <div className="flex h-full p-5">
        <div className="relative">
          <img
            src={mentor.avatar}
            alt={mentor.first_name}
            className="w-[214px] h-[226px] rounded-md object-cover"
          />
          {mentor.top && <TopBanner />}
        </div>

        <div className="w-[538px] pl-8">
          <div className="flex justify-between items-start">
            <div className="">
              <h3 className="text-2xl font-semibold">{mentor.mentory ? mentor.mentory : "Clase Generica"}
              </h3>
              <div className="flex flex-wrap py-1">
                <p className="text-black font-normal">
                  {mentor.first_name} {mentor.last_name}
                </p>
                <div className="flex items-center ml-2">
                  <span className="text-xs font-semibold h-4 text-black ml-1">
                    {average}
                  </span>
                  <span className="text-xs font-semibold h-4 text-[#292B2D] ml-1">
                    ({comentNum})
                  </span>
                  <img
                    src="./icons/star.svg"
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                </div>
              </div>
            </div>

            <button className="flex absolute top-[21px] right-[21px] items-center border-violeta border-[0.5px] justify-center w-[44px] h-[44px] bg-[#F1E5FDA6] rounded-full backdrop-blur-md">
              <img
                src="./icons/heartCard.svg"
                className="w-6 h-6 text-violeta transition-transform"
              />
            </button>
          </div>
          <hr className="border-t-1 border-[#9D9D9E] mt-1" />
          <p className="mt-2 font-normal h-[69px] text-sm text-[#545557]">
            {mentor.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-2 mb-1">
            <ul className="flex flex-wrap gap-1 pt-1 top-[323px] h-[22px] left-4">
              {visibleSkills.map((item, index) => (
                <li
                  key={index}
                  className="px-1 py-[2px] border-[#545557] border-[1px] h-[22px] text-[#545557] font-semibold text-xs rounded-sm backdrop-blur-xl bg-white"
                >
                  {item}
                </li>
              ))}
              {remainingCount > 0 && (
                <li className="pl-1 py-[2px] pr-[6px] border-[#545557] border-[1px] h-[22px] text-[#545557] font-semibold text-xs rounded-sm backdrop-blur-xl bg-white">
                  +{remainingCount}
                </li>
              )}
            </ul>
          </div>

          <div className="flex justify-between w-[509px] items-center py-2">
            <button className="text-sm font-semibold w-[378px] h-[42px] bg-gradient-primary text-blanco py-1.5 px-4 rounded-tr-lg rounded-bl-lg cursor-pointer select-none">
              Ver Mentor
            </button>
            <div className="flex justify-end  text-nowrap ">
              <p className="text-black text-xl font-semibold">
                 ${mentor.pricing[0]} - ${mentor.pricing[lastPrice]} 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
