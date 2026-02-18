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
  const user = JSON.parse(localStorage.getItem("user"));
  const first_word = user.username[0].toUpperCase();

  return (
    <div
      style={{
        width: '101%',
        background: "#ffF3Cf",
        minHeight: "100vh",
        margin: "0",
        padding: "0",
        overflowX: 'hidden'
      }}
    >
      <Link to={`/user/${user.id}`}>
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          display: "flex",
          alignSelf: "right",
          cursor: "pointer",
          position: "absolute",
          top: "30px",
          right: "80px",
          fontFamily: "Irish Grover",
          gap: "20px",
          color: 'black'
        }}
      >
        <div
          style={{
            background: "#626D58",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFF3CF",
            fontSize: "1.1rem",
            flexShrink: 0,
          }}
        >
          {first_word}
        </div>
        <h2>{user.username}</h2>
      </div>
      </Link>
      <div
        style={{ maxWidth: "800px", margin: "0 auto", padding: "150px 20px" }}
      >
        <Titles title="AI TEST MAKER-TAKER" />
        <div
          style={{
            display: "grid",
            gap: "20px",
            marginTop: "100px",
            fontFamily: "Irish Grover",
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
            fontWeight: "100",
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
