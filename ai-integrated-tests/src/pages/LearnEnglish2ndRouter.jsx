import { useParams } from "react-router";
import TagQuestionRouter from "./English-2nd/TagQuestions/TagQuestionRouter";

export default function LearnEnglish2ndRouter() {
  const { topic } = useParams();

  if (topic === "tag-questions") return <TagQuestionRouter />;
}