import { useState, useEffect } from "react";
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
  const [showPolarity, setShowPolarity] = useState(false);
    const [showExample, setShowExample] = useState(false)

  // trigger it after the main diagram renders
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPolarity(true);
      setShowExample(true)
    }, 2000); // 2 seconds
    return () => clearTimeout(timer); // cleanup
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
      }}
    >
      <h2
        style={{
          fontFamily: "Irish Grover",
          fontSize: "22px",
          color: "#5C3D11",
          opacity: 0.8,
          margin: 0,
        }}
      >
        The Core Mechanic
      </h2>

      {/* Diagram */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            justifyContent: "center",
          }}
        >
          {/* Left: Subject + Verb */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "8px" }}>
              <div
                style={{
                  padding: "10px 18px",
                  border: "2px solid #A9DC97",
                  borderRadius: "10px",
                  fontFamily: "Irish Grover",
                  fontSize: "17px",
                  color: "#FFF3CF",
                  background: "#928644d2",
                }}
              >
                Subject
              </div>
              <div
                style={{
                  padding: "10px 18px",
                  border: "2px solid #F5D77E",
                  borderRadius: "10px",
                  fontFamily: "Irish Grover",
                  fontSize: "17px",
                  color: "#FFF3CF",
                  background: "#928644",
                }}
              >
                Verb
              </div>
            </div>
            <p
              style={{
                fontFamily: "Irish Grover",
                color: "#8b7c4e",
                margin: "0",
              }}
            >
              statement
            </p>
          </div>
          {/* Arrow */}
          <div
            style={{ fontSize: "32px", color: "#626D58", fontWeight: "bold" }}
          >
            →
          </div>

          {/* Right: Verb + Subject (flipped order) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "8px" }}>
              <div
                style={{
                  padding: "10px 18px",
                  border: "2px solid #F5D77E",
                  borderRadius: "10px",
                  fontFamily: "Irish Grover",
                  fontSize: "17px",
                  color: "#FFF3CF",
                  background: "#928644",
                }}
              >
                Verb
              </div>
              <div
                style={{
                  padding: "10px 18px",
                  border: "2px solid #A9DC97",
                  borderRadius: "10px",
                  fontFamily: "Irish Grover",
                  fontSize: "17px",
                  color: "#FFF3CF",
                  background: "#928644d2",
                }}
              >
                Subject
              </div>
            </div>
            <p
              style={{
                fontFamily: "Irish Grover",
                color: "#8b7c4e",
                margin: "0",
              }}
            >
              tag question
            </p>
          </div>
        </div>
        <p>
          <i>
            take the subject and verb, then place verb first and subject after
            it in the tag part
          </i>
        </p>
      </div>

      {/* Polarity row */}
      {showPolarity && (
        <div
          style={{
            animation: "fadeIn 2.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              justifyContent: "center",
              marginTop: "16px",
            }}
          >
            {/* Left: Positive */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  padding: "10px 18px",
                  border: "2px solid #A9DC97",
                  borderRadius: "10px",
                  fontFamily: "Irish Grover",
                  fontSize: "17px",
                  color: "#FFF3CF",
                  background: "#5a8c4e",
                }}
              >
                + positive
              </div>
              <p
                style={{
                  fontFamily: "Irish Grover",
                  color: "#8b7c4e",
                  margin: "0",
                }}
              >
                statement
              </p>
            </div>

            <div
              style={{ fontSize: "32px", color: "#626D58", fontWeight: "bold" }}
            >
              →
            </div>

            {/* Right: Negative tag */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  padding: "10px 18px",
                  border: "2px solid #e07070",
                  borderRadius: "10px",
                  fontFamily: "Irish Grover",
                  fontSize: "17px",
                  color: "#FFF3CF",
                  background: "#b85c5c",
                }}
              >
                − negative
              </div>
              <p
                style={{
                  fontFamily: "Irish Grover",
                  color: "#8b7c4e",
                  margin: "0",
                }}
              >
                tag
              </p>
            </div>
          </div>

          {/* And the reverse */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  padding: "10px 18px",
                  border: "2px solid #e07070",
                  borderRadius: "10px",
                  fontFamily: "Irish Grover",
                  fontSize: "17px",
                  color: "#FFF3CF",
                  background: "#b85c5c",
                }}
              >
                − negative
              </div>
              <p
                style={{
                  fontFamily: "Irish Grover",
                  color: "#8b7c4e",
                  margin: "0",
                }}
              >
                statement
              </p>
            </div>

            <div
              style={{ fontSize: "32px", color: "#626D58", fontWeight: "bold" }}
            >
              →
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  padding: "10px 18px",
                  border: "2px solid #A9DC97",
                  borderRadius: "10px",
                  fontFamily: "Irish Grover",
                  fontSize: "17px",
                  color: "#FFF3CF",
                  background: "#5a8c4e",
                }}
              >
                + positive
              </div>
              <p
                style={{
                  fontFamily: "Irish Grover",
                  color: "#8b7c4e",
                  margin: "0",
                }}
              >
                tag
              </p>
            </div>
          </div>
          <p>
            <i>
              Remember to change the polarity to the opposite of the statement's
              verb
            </i>
          </p>
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "8px",
          animation: "fadeIn 2.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        }}
      >
        <p
          style={{
            fontFamily: "Irish Grover",
            color: "#8b7c4e",
            margin: 0,
            fontSize: "16px",
          }}
        >
          For example:
        </p>

        {/* Statement */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", borderRadius: '10px', borderBottom: '2px dashed #ccc', padding: '2px 0px' }}>
          <span
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              fontFamily: "Irish Grover",
              fontSize: "18px",
              color: "#FFF3CF",
              background: "#928644d2",
              border: "2px solid #A9DC97",
            }}
          >
            He
          </span>
          <span
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              fontFamily: "Irish Grover",
              fontSize: "18px",
              color: "#FFF3CF",
              background: "#928644",
              border: "2px solid #F5D77E",
            }}
          >
            is
          </span>
          <span
            style={{
              fontFamily: "Irish Grover",
              fontSize: "18px",
              color: "#5C3D11",
            }}
          >
            honest
          </span>
        </div>

        {/* Arrow */}
        <div style={{ fontSize: "24px", color: "#626D58", fontWeight: "bold" }}>
          →
        </div>

        {/* Tag */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", borderRadius: '10px', borderBottom: '2px dashed #ccc', padding: '2px 0px' }}>
          <span
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              fontFamily: "Irish Grover",
              fontSize: "18px",
              color: "#FFF3CF",
              background: "#b85c5c",
              border: "2px solid #e07070",
            }}
          >
            isn't
          </span>
          <span
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              fontFamily: "Irish Grover",
              fontSize: "18px",
              color: "#FFF3CF",
              background: "#928644d2",
              border: "2px solid #A9DC97",
            }}
          >
            he
          </span>
          <span
            style={{
              fontFamily: "Irish Grover",
              fontSize: "18px",
              color: "#5C3D11",
            }}
          >
            ?
          </span>
        </div>
      </div>

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
        Got it?
      </button>
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

function RulesEnd({ hns }) {
  return (
    <div>
      <h2>Congrats, you learned it all</h2>
      <button onClick={hns}>Let's do some exercises</button>
    </div>
  );
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
    <RulesEnd hns={hns} />,
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
