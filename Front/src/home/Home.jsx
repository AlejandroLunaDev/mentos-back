import Categories from "./components/Categories/Categories";
import Hero from "./components/hero/Hero";
import ListMentors from "./components/ListMentors/ListMentors";
import CarouselMentors from "./components/CarouselMentors/CarouselMentors";
import FAQItemContainer from "./components/faqs/FAQItemContainer";
import MentorProgress from "./mentorprogress/MentorProgress";
import { getAllMentor, getAllMentorTop, getMentors } from "../redux/actions/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMentors());
    dispatch(getAllMentor());
    dispatch(getAllMentorTop());
  }, [dispatch]);

  // Verificar si hay un usuario en localStorage
  const hasUser = localStorage.getItem('user') !== null;

  return (
    <section className="">
      <section className="bg-[#FAFAFA]">
        <Hero />
      </section>
      {hasUser && (
        <section className="flex justify-center bg-[#FAFAFA]">
          <MentorProgress />
        </section>
      )}
      <section className="bg-[#FAFAFA]">
        <Categories />
      </section>
      <CarouselMentors />
      <ListMentors />
      <FAQItemContainer />
    </section>
  );
}
