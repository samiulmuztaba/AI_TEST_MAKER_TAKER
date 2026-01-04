import Titles from "../components/Titles";
import CancelCross from "../components/CancelCross";

function BenGenerated() {
  return (
    <div
      style={{
        padding: "80px 20px",
        width: "inherit",
        display: "flex",
        gap: "10px",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        background: "#FFF3CF",
      }}
    >
      <CancelCross />
      <Titles title="Ready!" />
      <div
        style={{
          width: "500px",
          height: "500px",
          background: "#FFF",
          border: "1px solid #626D58",
          borderRadius: "10px",
        }}
      ></div> {/* <-- this div will be replaced with actual exam paper */}
      <button
        style={{
          fontFamily: "Irish Grover",
          padding: "15px 40px",
          border: "none",
          borderRadius: "10px",
          background: "#626D58",
          color: "#FFF3CF",
          fontSize: "1.25rem",
          marginTop: "20px",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#A9DC97";
          e.currentTarget.style.color = "#000";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#626D58";
          e.currentTarget.style.color = "#FFF3CF";
        }}
      >
        Save PDF
      </button>

      <button
        style={{
          fontFamily: "Irish Grover",
          padding: "15px 40px",
          border: "none",
          borderRadius: "10px",
          background: "#626D58",
          color: "#FFF3CF",
          cursor: "pointer",
          fontSize: "1.25rem",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#A9DC97";
          e.currentTarget.style.color = "#000";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#626D58";
          e.currentTarget.style.color = "#FFF3CF";
        }}
      >
        Start Timer
      </button>

      <button
        style={{
          fontFamily: "Irish Grover",
          padding: "15px 40px",
          border: "none",
          borderRadius: "10px",
          background: "#626D58",
          color: "#FFF3CF",
          cursor: "pointer",
          fontSize: "1.25rem",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#A9DC97";
          e.currentTarget.style.color = "#000";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#626D58";
          e.currentTarget.style.color = "#FFF3CF";
        }}
      >
        Submit Answers
      </button>
    </div>
  );
}

export default BenGenerated;
