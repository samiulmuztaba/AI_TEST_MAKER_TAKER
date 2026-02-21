import { useState } from "react";
import CancelCross from "../../components/CancelCross";
import Titles from "../../components/Titles";
import UserBadge from "../../components/UserBadge";

// ------------------------ Section Components ------------------------
function IntroComponent({ hns }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px 90px",
        border: "2px dashed #A9DC97",
        borderRadius: "20px",
      }}
    >
      <h2
        style={{
          fontFamily: "Irish Grover",
          fontSize: "22px",
          textAlign: "center",
          marginBottom: "20px",
          opacity: "0.7",
        }}
      >
        Have you ever heard a British man say things like:
      </h2>

      {/* Quote card */}
      <div
        style={{
          background: "#FFF3CF",
          border: "2px dashed #A9DC97",
          borderRadius: "18px",
          padding: "16px 28px",
          boxShadow: "4px 4px 0px #A9DC97",
          marginBottom: "24px",
          width: "40%",
        }}
      >
        <h3
          style={{
            fontFamily: "Indie Flower",
            background: "#A9DC97",
            padding: "6px 16px",
            borderRadius: "10px",
            margin: 0,
            fontSize: "24px",
            color: "#2D6A1F",
            letterSpacing: "0.5px",
          }}
        >
          "It's cold, innit?"
        </h3>
      </div>

      {/* Body text */}
      <p
        style={{
          fontFamily: "Indie Flower",
          fontSize: "17px",
          color: "#5C3D11",
          textAlign: "center",
          maxWidth: "460px",
          lineHeight: "1.7",
          margin: "0",
        }}
      >
        That little <strong>innit</strong> at the end? That's a tag question.
        Fun fact, keep it to yourself 😄
      </p>

      {/* Bangla card */}
      <div
        style={{
          background: "#FFF0C2",
          border: "2px solid #F5D77E",
          borderRadius: "14px",
          padding: "14px 24px",
          marginTop: "16px",
          marginBottom: "8px",
          maxWidth: "460px",
          width: "100%",
          textAlign: "center",
          boxShadow: "2px 2px 0px #F0C040",
        }}
      >
        <p
          style={{
              fontFamily: "Indie Flower",
            fontSize: "17px",
            color: "#5C3D11",
            margin: 0,
            lineHeight: "1.7",
          }}
        >
          You actually use them in Bangla too —{" "}
          <strong style={{ fontSize: "19px" }}>"ভালো, তাই না?"</strong>
        </p>
      </div>

      <p
        style={{
          fontFamily: "Indie Flower",
          fontSize: "17px",
          color: "#7A5230",
          textAlign: "center",
          maxWidth: "460px",
          lineHeight: "1.7",
          marginTop: "10px",
        }}
      >
        That <strong>"তাই না"</strong>? Same idea. Let's learn how English does
        it.
      </p>
      <button
        onClick={hns}
        style={{
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          background: "#626D58",
          color: "#FFF3CF",
          cursor: "pointer",
          fontSize: "16px",
          fontFamily: "Irish Grover",
        }}
        >
        Let's learn this!
      </button>
    </div>
  );
}

// ------------------------ Rules Components ------------------------
function FirstRule({ hns }) {
  return (
    <div>
      <h2>First Rule</h2>
      <button onClick={hns}>got it?</button>
    </div>
  );
}

function SecondRule({ hns }) {
  return (
    <div>
      <h2>Second Rule</h2>
      <button onClick={hns}>got it?</button>
    </div>
  );
}

function ThirdRule({ hns }) {
  return (
    <div>
      <h2>Third Rule</h2>
      <button onClick={hns}>got it?</button>
    </div>
  );
}

function RulesEnd({hns}){
    return (
        <div>
            <h2>Congrats, you learned it all</h2>
            <button onClick={hns}>Let's do some exercises</button>
        </div>
    )
}

function RulesComponent({ hns }) {
  const [currentRule, setCurrentRule] = useState(0);


  const handleNextRule = () => {
    setCurrentRule((prev) => prev + 1);
  };

  const rules = [
    <FirstRule hns={handleNextRule} />,
    <SecondRule hns={handleNextRule} />,
    <ThirdRule hns={handleNextRule} />,
    <RulesEnd hns={hns}/>
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px 90px",
        border: "2px dashed #A9DC97",
        borderRadius: "20px",
        gap: "20px",
      }}
    >
      {/* Progress bar — only shown during actual rules */}
      {currentRule > 0 && (
        <div style={{ display: "flex", gap: "6px", width: "100%" }}>
          {rules.map((_, index) => (
            <div
              key={index}
              style={{
                flex: 1,
                height: "8px",
                borderRadius: "10px",
                background: index < currentRule ? "#626D58" : "#E8D9A0",
                transition: "background 0.3s ease",
              }}
            />
          ))}
        </div>
      )}

      {currentRule === 0 ? (
        <>
          <h2
            style={{
              fontFamily: "Irish Grover",
              fontSize: "22px",
              textAlign: "center",
              opacity: "0.7",
              margin: 0,
            }}
          >
            Let's start by learning some rules!
          </h2>
          <button
            onClick={handleNextRule}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              background: "#626D58",
              color: "#FFF3CF",
              cursor: "pointer",
              fontSize: "16px",
              fontFamily: "Irish Grover",
            }}
          >
            Sure!
          </button>
        </>
      ) : (
        rules[currentRule - 1]
      )}
    </div>
  );
}

function PracticesComponent({ hns }) {
  return (
    <div>
      <div></div>
    </div>
  );
}

function ConclusionComponent({ hns }) {
  return (
    <div>
      <div></div>
    </div>
  );
}

export default function TagQuestionLesson() {
  const [currentSection, setCurrentSection] = useState(0);

  const handleNextSection = () => {
    setCurrentSection((prev) => prev + 1);
  };

  const sections = [
    <IntroComponent hns={handleNextSection} />,
    <RulesComponent hns={handleNextSection} />,
    <PracticesComponent hns={handleNextSection} />,
    <ConclusionComponent hns={handleNextSection} />,
  ];
  return (
    <div
      style={{
        background: "#FFF3CF",
        paddingBottom: "100px",
        minHeight: "109vh",
      }}
    >
      <Titles title="Tag Questions Lesson" margin={true} />
      <CancelCross />
      <UserBadge haveToDealWithCross={true} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "80px",
          gap: "1.5px",
        }}
      >
        {sections[currentSection]}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {sections.map((sec) => (
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                ...(sec == sections[currentSection]
                  ? {
                      background: "#626D58",
                    }
                  : {
                      border: "1px solid #626D58",
                      background: "transparent",
                    }),
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
