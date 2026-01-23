import TagQuestion from "./English-2nd/TagQuestion";
import { useParams } from "react-router";

export default function English2ndRouter() {
  const { topic } = useParams();

  if (topic === "tag-questions") return <TagQuestion />;
}
