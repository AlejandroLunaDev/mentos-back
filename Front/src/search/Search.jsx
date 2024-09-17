import { useEffect, useState } from "react";
import Card from "./components/Card";
import styles from "./Search.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import {
  FilterByCategory,
  FilterByPriceRange,
  FilterBySkills,
  getAllMentor,
  orderByName,
} from "../redux/actions/actions";

const MentorSearchAndFilter = () => {
  const allMentors = useSelector((state) => state.allMentors);
  const allMentorsCopy = useSelector((state) => state.allMentorsCopy);
  const categoriesArray = useSelector((state) => state.categories);
  const allSkills = useSelector((state) => state.skills);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [suggestedSkills, setSuggestedSkills] = useState([]);

  const [orderIcon, setOrderIcon] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true); // Estado para desplegar categorías
  const [isSkillsOpen, setIsSkillsOpen] = useState(true); // Estado para desplegar habilidades
  const [isPriceOpen, setIsPriceOpen] = useState(true); // Estado para desplegar precio
  const [maxPrice, setMaxPrice] = useState(500); // Estado para desplegar precio

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category"); // Categoria selecionada en home

  const minPrice = priceRange[0];

  const dispatch = useDispatch();

  const categories = [
    {
      title: "Todas",
      items: categoriesArray,
    },
  ];

  useEffect(() => {
    if (category) {
      setSelectedCategories([category]);
      dispatch(FilterByCategory(category));
    } else {
      dispatch({ type: "RESET_FILTER" });
    }
  }, [category, dispatch]);
  
 /*  useEffect(() => {
    dispatch({ type: "RESET_FILTER" }); // Reinicia el filtro
    dispatch(FilterByPriceRange(priceRange));
  }, [priceRange, dispatch]);
 */
  useEffect(() => {
    if (!allMentorsCopy || allMentorsCopy.length === 0) {
      setSelectedCategories([]);
      dispatch(getAllMentor()); // Cargar los mentores si no están en el estado
    }
  }, [dispatch, allMentorsCopy]);

  useEffect(() => {
    if (maxPrice <= priceRange[1]) {
      setMaxPrice(priceRange[1]);
    }
    if (priceRange[1] > maxPrice) {
      setPriceRange([priceRange[0], maxPrice]);
    }

    updateSliderBackground(priceRange[1]);
  }, [maxPrice, priceRange]);

  const toggleCategory = (category3) => {
    // Si la categoría ya está seleccionada, deseleccionarla
    if (selectedCategories.includes(category3)) {
      setSelectedCategories([]);
      dispatch({ type: "RESET_FILTER" }); // Reinicia el filtro
    } else {
      // Si no está seleccionada, reemplaza la categoría anterior con la nueva
      dispatch({ type: "RESET_FILTER" }); // Reinicia el filtro
      setSelectedCategories([category3]);
      dispatch(FilterByCategory(category3)); // Filtra por la nueva categoría seleccionada
    }
  };
  const toggleSkill = (skill) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];

    setSelectedSkills(updatedSkills);
    setSearchTerm(""); // Limpiar el input después de seleccionar una habilidad
    setSuggestedSkills([]); // Limpiar las sugerencias

    if (updatedSkills.length === 0) {
      dispatch({ type: "RESET_FILTER" });
      if (selectedCategories.length > 0) {
        dispatch(FilterByCategory(selectedCategories[0]));
      }
    } else {
      dispatch(FilterBySkills(updatedSkills));
    }
  };

  const orderMentor = () => {
    if (orderIcon) {
      dispatch(orderByName("A"));
      setOrderIcon(false);
    } else {
      dispatch(orderByName("D"));
      setOrderIcon(true);
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSkills([]);
    setPriceRange([0, 500]);
    dispatch({ type: "RESET_FILTER" }); // Reinicia el estado con todos los mentores
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filtrar habilidades según el término de búsqueda
    const filteredSkills = allSkills.filter(
      (skill) =>
        typeof skill === "string" && skill.toLowerCase().includes(value)
    );
    setSuggestedSkills(filteredSkills); // Mostrar las sugerencias filtradas

    // Si no hay habilidades seleccionadas, filtrar solo por el término de búsqueda
    if (selectedSkills.length === 0) {
      dispatch({ type: "FILTER_BY_SKILLS", payload: value });
    }
  };

  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value);
    setPriceRange([priceRange[0], newValue]);

    updateSliderBackground(newValue);
  };
  const updateSliderBackground = (value) => {
    const percentage = ((value - minPrice) / (maxPrice - minPrice)) * 100;
    const slider = document.getElementById("price-range-slider");
    if (slider) {
      slider.style.background = `linear-gradient(to right, #AA5BFF ${percentage}%, #BDBDBE ${percentage}%)`;
    }
  };


  return (
    <div className="relative mx-auto p-4 flex mt-[80px] flex-col md:flex-row gap-8">
      <div className="w-5/6 md:w-3/4">
        <form onSubmit={(e) => e.preventDefault()} className="mb-4 ml-12">
          <div className="relative flex items-center border-[1.5px] w-[87%] pl-4 h-[52px] border-[#BDBDBE] rounded-md">
            <img src="./icons/lupa.svg" className="" />
            <input
              type="text"
              placeholder="Busca por habilidades"
              value={searchTerm}
              onChange={handleInputChange}
              className="pl-3 pr-4 py-2 w-5/6 outline-none"
            />
          </div>
        </form>

        <div className="flex justify-between items-start w-[87%] ml-12">
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((category) => (
              <span
                key={category}
                className="flex h-[25px] items-center pl-2 pr-1 text-[#545557] border-[#545557] border-[1px] text-sm font-semibold rounded-[4px] backdrop-blur-xl"
              >
                {category}
                <button
                  onClick={() => toggleCategory(category)}
                  className="flex rounded-full w-[16px] h-[16px] bg-gradient-primary items-center justify-center ml-[7px] text-white"
                >
                  &times;
                </button>
              </span>
            ))}
            {selectedSkills.map((skills) => (
              <span
                key={skills}
                className="flex h-[25px] items-center pl-2 pr-1 text-[#545557] border-[#545557] border-[1px] text-sm font-semibold rounded-[4px] backdrop-blur-xl"
              >
                {skills}
                <button
                  onClick={() => toggleSkill(skills)}
                  className="flex rounded-full w-[16px] h-[16px] bg-gradient-primary items-center justify-center ml-[7px] text-white"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>

          <button
            onClick={clearFilters}
            className="text-gray-500 hover:text-gray-700 mr-11"
          >
            Limpiar Filtros
          </button>
        </div>

        <div className="mb-4 w-[87%] ml-12">
          <h2 className="text-sm font-semibold mb-1 mt-8 text-[#545557]">
            {allMentorsCopy.length} Resultados
          </h2>
          <div className="flex justify-between ">
            <p className="text-black font-semibold text-lg ">
              Resultados búsqueda {selectedCategories}
            </p>
            {/* Colocar un limite de escritura en el buscador */}

            <div
              className="flex flex-nowrap mr-12 h-[21px] cursor-pointer "
              onClick={orderMentor}
            >
              <button className="text-sm text-[#545557] font-semibold">
                Ordenar Por{" "}
              </button>
              <img
                src="./icons/orderArrow.svg"
                className={`ml-2  size-5  ${orderIcon ? "rotate-180" : ""}`}
              />
            </div>
          </div>
        </div>
        <div className="space-y-4 ml-12">
          {allMentorsCopy.map((mentor) => (
            <Card key={mentor._id} mentor={mentor} />
          ))}
        </div>
      </div>

      <div className=" fixed top-[100px] right-[10px] w-2/6">
        {/* Categorías */}
        <div className="mb-4">
          <div
            className="flex items-center justify-between w-full p-2 font-semibold bg-gray-100 rounded-t-lg cursor-pointer"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          >
            Categorías
            <img
              src="./icons/triangle.svg"
              className={`h-4 w-4 transform transition-transform ${
                isCategoryOpen ? "rotate-180" : ""
              }`}
            />
          </div>
          {isCategoryOpen && (
            <div className="p-2 border border-t-0 rounded-b-lg select-none bg-white">
              {categories.map((category) => (
                <div key={category.title} className="mb-4">
                  <h3 className="font-semibold text-violeta mb-2">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className={`cursor-pointer px-1  border-[#545557] border-[1px] h-[22px] text-sm rounded-[4px] backdrop-blur-xl ${
                          selectedCategories.includes(item)
                            ? "bg-gradient-primary text-white"
                            : "bg-white text-[#545557]"
                        }`}
                        onClick={() => toggleCategory(item)}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Habilidades */}
        <div className="mb-4  bg-white">
          <div
            className="flex items-center justify-between w-full p-2 font-semibold bg-gray-100 rounded-t-lg cursor-pointer"
            onClick={() => setIsSkillsOpen(!isSkillsOpen)}
          >
            Habilidades
            <img
              src="./icons/triangle.svg"
              className={`h-4 w-4 transform transition-transform ${
                isSkillsOpen ? "rotate-180" : ""
              }`}
            />
          </div>
          {isSkillsOpen && (
            <div className="p-2 border border-t-0 rounded-b-lg bg-white">
              <div className="relative flex items-center border-[1.5px] w-[87%] h-[48px] border-[#BDBDBE] rounded-md">
                <img src="./icons/lupa.svg" className="ml-3" />
                <input
                  type="text"
                  placeholder="Busca por habilidades"
                  value={searchTerm}
                  onChange={handleInputChange}
                  className="pl-3 pr-4 w-5/6  text-[#2E2E2E] placeholder:font-semibold placeholder:text-sm placeholder:text-[#545557] outline-none"
                />
                {suggestedSkills.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-[#BDBDBE] rounded-md max-h-40 overflow-y-auto z-10">
                    {suggestedSkills.map((skill) => (
                      <div
                        key={skill}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => toggleSkill(skill)} // Seleccionar la habilidad al hacer clic
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {selectedSkills.length > 0 && (
                <div className="flex flex-wrap gap-2 top-14 left-0 right-0 mt-2 rounded-md max-h-40">
                  {selectedSkills.map((skill) => (
                    <span
                      key={skill}
                      className={`cursor-pointer px-1 border-[#7b7e84] border-[1px] h-[22px] text-sm rounded-[4px] backdrop-blur-xl ${
                        selectedSkills.includes(skill)
                          ? "bg-gradient-primary text-white"
                          : "bg-white text-[#545557]"
                      }`}
                      onClick={() => toggleSkill(skill)} // Al hacer clic, se elimina o añade la skill
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        {/* Precio */}
        <div className="">
          <div
            className={`flex items-center justify-between w-full p-2 font-semibold bg-gray-100 rounded-t-lg cursor-pointer`}
            onClick={() => setIsPriceOpen(!isPriceOpen)}
          >
            Precio
            <img
              src="./icons/triangle.svg"
              className={`h-4 w-4 transform transition-transform ${
                isPriceOpen ? "rotate-180" : ""
              }`}
            />
          </div>
          {isPriceOpen && (
            <div>
              <div className="flex items-center justify-center">
                <input
                  type="range"
                  id="price-range-slider"
                  min={priceRange[0]}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={handleSliderChange}
                  className={` ${styles.input}  appearance-none mt-4 rounded-[8px]`}
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-600">{priceRange[0]}</span>
                <span className="text-sm text-gray-600">{priceRange[1]}</span>
                <span className="text-sm text-gray-600">Max</span>
              </div>

              <div className="mt-4 flex justify-between mr-6 ml-3">
                <div className="flex flex-nowrap items-center gap-5">
                  <label
                    htmlFor="min-price"
                    className="block text-sm font-semibold text-[#707172]"
                  >
                    Desde
                  </label>
                  <input
                    type="number"
                    id="min-price"
                    value={priceRange[0]}
                    onChange={(e) => {
                      const newMin = parseInt(e.target.value);
                      if (newMin <= priceRange[1]) {
                        setPriceRange([newMin, priceRange[1]]);
                      }
                    }}
                    className="mt-1 w-24 h-[40px] text-center border border-[#BDBDBE] rounded"
                  />
                </div>

                <div className="flex flex-nowrap  items-center gap-5 ">
                  <label
                    htmlFor="max-price"
                    className="block text-sm font-semibold text-[#707172]"
                  >
                    Hasta
                  </label>
                  <input
                    type="number"
                    id="max-price"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const newMax = parseInt(e.target.value);
                      if (newMax >= priceRange[0]) {
                        setPriceRange([priceRange[0], newMax]);
                      }
                    }}
                    className="mt-1 w-24  h-[40px] border   text-center  border-[#BDBDBE] rounded"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorSearchAndFilter;
