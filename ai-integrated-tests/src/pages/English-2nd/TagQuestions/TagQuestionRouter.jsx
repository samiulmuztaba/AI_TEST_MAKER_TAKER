import { useParams } from "react-router";
import Lesson1 from "./Lesson1";
import Lesson2 from "./Lesson2";
import Lesson3 from "./Lesson3";
import Lesson4 from "./Lesson4";
import Lesson5 from "./Lesson5";
import Lesson6 from "./Lesson6";

export default function TagQuestionRouter() {
  const { lesson } = useParams();

  if (lesson === "1") return <Lesson1 />;
  if (lesson === "2") return <Lesson2 />;
  if (lesson === "3") return <Lesson3 />;
  if (lesson === "4") return <Lesson4 />;
  if (lesson === "5") return <Lesson5 />;
  if (lesson === "6") return <Lesson6 />;

  return <Lesson1 />; // default
}