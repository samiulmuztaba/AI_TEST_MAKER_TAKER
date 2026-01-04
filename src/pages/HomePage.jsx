import { Link } from "react-router";
import BoxCard from "../components/BoxCard";
import Titles from "../components/Titles";

function HomePage() {
  const boxes = [
    { id: 1, title: "Bengali 1st", type: "bengali-1st" },
    { id: 2, title: "Bengali 2nd", type: "bengali-2nd" },
    { id: 3, title: "English 1st", type: "english-1st" },
    { id: 4, title: "English 2nd", type: "english-2nd" },
  ];

  return (
    <div
      style={{
        background: "#ffF3Cf",
        minHeight: "100vh",
        padding: "150px 20px",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Titles title="AI TEST MAKER-TAKER" />
        <div
          style={{
            display: "grid",
            gap: "20px",
            marginTop: "100px",
          }}
        >
          {boxes.map((box) => (
            <BoxCard key={box.id} title={box.title} type={box.type} />
          ))}
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          right: "0",
          background: "#fff3Cf",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
          borderTop: "1px solid #A9DC97",
        }}
      >
        <p
          style={{
            margin: "0",
            fontFamily: "'Indie Flower', cursive",
            fontSize: "1.2rem",
          }}
        >
          Already have a question and answer? Let's see how much you deserve!
        </p>
        <span
          style={{
            fontSize: "2.5rem",
            transform: "scaleX(1.5)",
            display: "inline-block",
            fontWeight: "300",
          }}
        >
          ⇝
        </span>
        <button
          style={{
            background: "#626D58",
            color: "white",
            border: "none",
            padding: "12px 24px",
            fontFamily: "Irish Grover",
            fontSize: "1.1rem",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#333";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#626D58";
          }}
        >
          Score my Answer
        </button>
      </div>
    </div>
  );
}

export default HomePage;
