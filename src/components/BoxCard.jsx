import { Link } from "react-router";

function BoxCard({ title }) {
  return (
    <Link to={`/generator/${title}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "#A9DC97",
          padding: "30px 40px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <h3
          style={{
            color: "black",
            margin: "0",
            fontSize: "1.8rem",
            fontFamily: "'Irish Grover', cursive",
          }}
        >
          {title}
        </h3>
        <button
          style={{
            color: "#fff3Cf",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            border: "none",
            background: "black",
            fontSize: "28px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#333";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "black";
          }}
        >
          →
        </button>
      </div>
    </Link>
  );
}

export default BoxCard;