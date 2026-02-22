import { useParams } from "react-router";
import TagQuestion from "./English-2nd/TagQuestion";
import SubstitutionTable from "./English-2nd/SubstitutionTable";
import GapFilling from "./English-2nd/GapFilling";
import TagQuestionRouter from "./English-2nd/TagQuestions/TagQuestionRouter";

export default function English2ndRouter() {
  const { topic } = useParams();

  if (topic === "tag-questions") return <TagQuestionRouter />;
  if (topic === "substitution-table") return <SubstitutionTable />;
  if (topic === "gap-filling") return <GapFilling />;
}