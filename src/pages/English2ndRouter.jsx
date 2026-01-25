import TagQuestion from "./English-2nd/TagQuestion";
import SubstitutionTable from "./English-2nd/SubstitutionTable";
import GapFilling from "./English-2nd/GapFilling";
import { useParams } from "react-router";

export default function English2ndRouter() {
  const { topic } = useParams();

  if (topic === "tag-questions") return <TagQuestion />;
  if (topic === "substitution-table") return <SubstitutionTable />;
  if (topic === "gap-filling") return <GapFilling/>
}
