import Titles from "../components/Titles";
import CancelCross from "../components/CancelCross";

function BenAnalysis() {
  return (
    <div
      style={{
        background: "#ffF3Cf",
        minHeight: "100vh",
        padding: "100px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CancelCross />
      <Titles title="Answer Analysis" />
      <h1 style={{ fontFamily: "Indie Flower", marginTop: "50px" }}>You got</h1>
      <div style={{ display: "flex", gap: "10px" }}>
        <div
          style={{
            border: "2px solid #000",
            borderRadius: "50%",
            width: "100px",
            height: "100px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Kalam",
            fontSize: "1.75rem"
          }}
        >
          <span
            style={{
            }}
          >
            87
          </span>
          <div style={{
            height: "2px",
            width: "70%",
            background: "black",
            transform: "rotate(-15deg)"
          }}></div>
          <span>100</span>
        </div>
        {/* it should be like 87/100 */}
        <div style={{
            width: "1px",
            background: "black"
        }}></div>
        <div
          style={{
            border: "2px solid #000",
            borderRadius: "50%",
            width: "100px",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Kalam",
          }}
        >
          <span style={{ fontSize: "3rem" }}>
            A<sup>+</sup>
          </span>
        </div>
      </div>
    </div>
  );
}

export default BenAnalysis;
