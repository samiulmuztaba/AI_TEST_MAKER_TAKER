import Titles from "../components/Titles";
import CancelCross from "../components/CancelCross";
import { Link } from "react-router";

function English2ndInterface() {
  const topics = [
    "Gap Filling with Clues",
    "Substitution Table",
    "Right Form of Verbs",
    "Tag Questions",
  ];

  const getTopicRoute = (topic) => {
    const routeMap = {
      "Gap Filling with Clues": "gap-filling",
      "Substitution Table": "substitution-table", 
      "Right Form of Verbs": "right-form-verbs",
      "Tag Questions": "tag-questions"
    };
    
    return `${routeMap[topic]}`; 
  };

  return (
    <div style={{ height: "auto", marginBottom: "100px" }}>
      <CancelCross />
      <Titles title="English 2nd" margin={true} />
      <div style={{ marginTop: "80px" }}>
        {topics.map((topic, index) => (
          <Link 
            key={index}
            to={getTopicRoute(topic)}
            style={{ textDecoration: "none" }} 
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  background: "#A9DC97",
                  padding: "30px 40px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "all 0.2s",
                  width: "50%",
                  borderRadius: "20px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.background = "#626D58";
                  e.currentTarget.querySelector("h3").style.color = "#FFF3CF";
                  e.currentTarget.querySelector(".arrow").style.color =
                    "#FFF3CF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = "#A9DC97";
                  e.currentTarget.querySelector("h3").style.color = "black";
                  e.currentTarget.querySelector(".arrow").style.color = "black";
                }}
              >
                <h3
                  style={{
                    color: "black",
                    margin: "0",
                    fontSize: "1.8rem",
                    fontFamily: "'Irish Grover', cursive",
                    transition: "color 0.2s",
                  }}
                >
                  {topic}
                </h3>
                <div
                  className="arrow"
                  style={{
                    color: "black",
                    border: "none",
                    fontSize: "2.8rem",
                    fontWeight: "",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "background 0.2s",
                  }}
                >
                  →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default English2ndInterface;