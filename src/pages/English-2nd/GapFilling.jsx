import Titles from "../../components/Titles";
import CancelCross from "../../components/CancelCross";
import DndBox from "../../components/DndBox";

export default function GapFilling() {
  const clues = ["something", "has", "to", "be", "here", "so", "you", "know!"];
  const passage =
    "Honesty is a great virtue. It (a) ______ a person respected by all. A dishonest man may (b) ______ success for a short time, but in the long run he (c) ______. So, we should always be (d) ______ and (e) ______ the truth.";

  return (
    <div style={{ marginBottom: "150px" }}>
      <CancelCross />
      <Titles title="Gap Filling With Clues" margin={true} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
          marginTop: "50px",
        }}
      >
        <div
          style={{
            fontSize: "1.2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            marginTop: "50px",
          }}
        >
          {clues.map((clue) => (
            <DndBox content={clue} />
          ))}
        </div>
        <div
          style={{
            width: "50%",
            padding: "30px",
            background: "#A9DC97",
            display: "inline-flex",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: "20px",
            fontFamily: "Indie Flower",
            fontSize: "1.2rem",
          }}
        >
          {passage.split(" ").map((word) => {
            if (!word.includes("_")) return word + " "
            else return <div></div>
          })}
        </div>
        <button
          style={{
            //   width: "50px",
            // height: "35px",
            border: "none",
            borderRadius: "5px",
            background: "#626D58",
            color: "#FFF3CF",
            cursor: "pointer",
            fontSize: "1.2rem",
            fontFamily: "Irish Grover",
            padding: "10px 15px",
          }}
        >
          Submit →
        </button>
      </div>
    </div>
  );
}
