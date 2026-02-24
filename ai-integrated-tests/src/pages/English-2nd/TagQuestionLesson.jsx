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

// ------------------------ Shared PracticeBlock ------------------------
function PracticeBlock({ hns, practices, teaserHTML }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({ verb: "", subject: "" });
  const [submitted, setSubmitted] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);

  const practice = practices[current];
  const isCorrect =
    answers.verb.toLowerCase() === practice.correctVerb &&
    answers.subject.toLowerCase() === practice.correctSubject;

  const handleNext = () => {
    if (current + 1 < practices.length) {
      setCurrent((prev) => prev + 1);
      setAnswers({ verb: "", subject: "" });
      setSubmitted(false);
    } else {
      setShowTeaser(true);
    }
  };

  const tokenStyle = (highlight) => ({
    padding: "4px 12px",
    borderRadius: "8px",
    fontFamily: "Irish Grover",
    fontSize: "18px",
    color: "#FFF3CF",
    background: highlight === "subject" ? "#928644d2" : "#928644",
    border: `2px solid ${highlight === "subject" ? "#A9DC97" : "#F5D77E"}`,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        animation: "fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      }}
    >
      <h2 style={{ fontFamily: "Irish Grover", color: "#626D58", margin: 0 }}>
        Can you do this one?
      </h2>

      {/* Sentence + input */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span
          style={{
            fontFamily: "Irish Grover",
            fontSize: "20px",
            color: "#5C3D11",
          }}
        >
          {practice.sentence},
        </span>
        <span style={{ fontSize: "20px" }}>→</span>
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <input
            type="text"
            value={answers.verb}
            onChange={(e) => setAnswers({ ...answers, verb: e.target.value })}
            placeholder="verb"
            style={{
              ...tokenStyle("verb"),
              maxWidth: "70px",
              border: submitted
                ? answers.verb.toLowerCase() === practice.correctVerb
                  ? "2px solid #A9DC97"
                  : "2px solid #b85c5c"
                : "2px solid #F5D77E",
            }}
          />
          <input
            type="text"
            value={answers.subject}
            onChange={(e) =>
              setAnswers({ ...answers, subject: e.target.value })
            }
            placeholder="sub"
            style={{
              ...tokenStyle("subject"),
              maxWidth: "70px",
              border: submitted
                ? answers.subject.toLowerCase() === practice.correctSubject
                  ? "2px solid #A9DC97"
                  : "2px solid #b85c5c"
                : "2px solid #A9DC97",
            }}
          />
          <span
            style={{
              fontFamily: "Irish Grover",
              fontSize: "20px",
              color: "#5C3D11",
            }}
          >
            ?
          </span>
        </div>
      </div>

      {/* Submit */}
      {!submitted && (
        <button
          onClick={() => setSubmitted(true)}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            background: "#626D58",
            color: "#FFF3CF",
            cursor:
              !answers.verb || !answers.subject ? "not-allowed" : "pointer",
            opacity: !answers.verb || !answers.subject ? 0.5 : 1,
            fontSize: "16px",
            fontFamily: "Irish Grover",
          }}
        >
          Check →
        </button>
      )}

      {/* Result */}
      {submitted && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            animation: "fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
          }}
        >
          {isCorrect ? (
            <>
              <p
                style={{
                  fontFamily: "Indie Flower",
                  fontSize: "17px",
                  color: "#5a8c4e",
                  margin: 0,
                }}
              >
                ✓ Correct!
              </p>

              {/* Visual explanation */}
              {!practice.isTeaser && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Indie Flower",
                      fontSize: "15px",
                      color: "#5C3D11",
                      margin: 0,
                      textAlign: "center",
                    }}
                  >
                    {practice.explanation}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{ ...tokenStyle("subject"), fontSize: "16px" }}
                    >
                      {practice.sentence.split(" ")[0]}
                    </span>
                    <span style={{ ...tokenStyle("verb"), fontSize: "16px" }}>
                      {practice.isNegative ? "isn't" : "is"}
                    </span>
                    <span
                      style={{
                        fontFamily: "Irish Grover",
                        fontSize: "16px",
                        color: "#5C3D11",
                      }}
                    >
                      {practice.sentence.split(" ")[2]}
                    </span>
                  </div>
                  <div style={{ fontSize: "20px", color: "#626D58" }}>↓</div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span style={{ ...tokenStyle("verb"), fontSize: "16px" }}>
                      {practice.correctVerb}
                    </span>
                    <span
                      style={{ ...tokenStyle("subject"), fontSize: "16px" }}
                    >
                      {practice.correctSubject}
                    </span>
                  </div>
                </div>
              )}

              {showTeaser && (
                <div
                  style={{
                    animation:
                      "fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Indie Flower",
                      fontSize: "15px",
                      color: "#8b7c4e",
                      fontStyle: "italic",
                      maxWidth: "360px",
                    }}
                  >
                    {teaserHTML}
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
                      marginTop: "12px",
                    }}
                  >
                    On to Rule 2 →
                  </button>
                </div>
              )}

              {!showTeaser && (
                <button
                  onClick={handleNext}
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
                  Next →
                </button>
              )}
            </>
          ) : (
            <>
              <p
                style={{
                  fontFamily: "Indie Flower",
                  fontSize: "17px",
                  color: "#b85c5c",
                  margin: 0,
                }}
              >
                ✗ Not quite. Remember — take verb + subject, flip the polarity!
              </p>
              <button
                          onClick={() => setSubmitted(true)}
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
                Check again
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ------------------------ Rules Components ------------------------
function FirstRule({ hns }) {
  const [step, setStep] = useState(null);
  const [hover, setHover] = useState(false);
  const [unclear, setUnclear] = useState(false);
  const [clear, setClear] = useState(false);
  const [unclearOption, setUnclearOption] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep(0);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const clarifications = {
    "I don't get the verb+subject flip":
      "Think of it like this — in the sentence we have Subject then Verb. In the tag we just swap them: Verb then Subject. Like flipping a pair!",
    "I don't understand polarity":
      "Polarity just means positive or negative. 'He is honest' is positive — no 'not' anywhere. So the tag must be negative — 'isn't'. Always the opposite!",
    "What even is a tag question?":
      "It's just a mini question you stick at the end of a sentence to confirm something. Like saying 'right?' or 'তাই না?' in Bangla!",
    "The example confused me":
      "'He is honest, isn't he?' — 'He is honest' is the statement. 'isn't he?' is the tag. We took 'is' and 'He', swapped them, and flipped 'is' to 'isn't'. That's it!",
  };

  const practices = [
    {
      sentence: "He isn't honest",
      isNegative: true,
      correctVerb: "is",
      correctSubject: "he",
      explanation:
        "The sentence was negative this time, so we flip to positive!",
    },
    {
      sentence: "She is happy",
      isNegative: false,
      correctVerb: "isn't",
      correctSubject: "she",
      explanation: "Positive sentence — flip to negative. You're getting it!",
    },
  ];

  const teaser = <span> 👀 Quick thought — what about <strong>"Nobody came"</strong>
                    ? Why would the tag be <strong>"did they?"</strong> and not{" "}
                    <strong>"didn't nobody?"</strong> That's Rule 2...</span>

  const next = () => setStep((prev) => prev + 1);

  const btnStyle = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    background: hover ? "#8b7c4e" : "#626D58",
    color: "#FFF3CF",
    cursor: "pointer",
    fontSize: "16px",
    fontFamily: "Irish Grover",
    animation: "fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <h2 style={{ color: "#626D58", fontFamily: "Irish Grover", margin: "0" }}>
        Rule 1: The Core Mechanic
      </h2>

      {unclear ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            animation: "fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
          }}
        >
          {Object.keys(clarifications).map((option) => (
            <button
              key={option}
              onClick={() => setUnclearOption(option)}
              style={{
                background:
                  unclearOption === option ? "#626D58" : "transparent",
                border: unclearOption === option ? "none" : "1px solid #8b7c4e",
                borderRadius: "8px",
                padding: "6px 14px",
                fontFamily: "Indie Flower",
                fontSize: "15px",
                color: unclearOption === option ? "#FFF3CF" : "#8b7c4e",
                cursor: "pointer",
              }}
            >
              {option}
            </button>
          ))}
          {unclearOption && (
            <p
              style={{
                fontFamily: "Indie Flower",
                fontSize: "16px",
                color: "#5C3D11",
                textAlign: "center",
                maxWidth: "400px",
                animation:
                  "fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
              }}
            >
              💡 {clarifications[unclearOption]}
            </p>
          )}
          <button
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={hns}
            style={{ ...btnStyle, marginTop: "12px" }}
          >
            {hover ? "Yes!" : "Got it now?"}
          </button>
        </div>
      ) : clear ? (
        <PracticeBlock hns={hns} practices={practices} teaserHTML={teaser} />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {/* Step 0: Just show the full sentence */}
          {step === 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "Irish Grover",
                animation:
                  "fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
              }}
            >
              <span style={{ fontSize: "22px", color: "#5C3D11" }}>
                He is honest,
              </span>
              <span
                style={{
                  fontSize: "22px",
                  color: "#5C3D11",
                  opacity: step >= 1 ? 1 : 0,
                  transition: "opacity 0.5s ease",
                }}
              >
                isn't he?
              </span>
            </div>
          )}

          {step === 0 && (
            <button onClick={next} style={btnStyle}>
              Okay...
            </button>
          )}

          {/* Step 1: Point at the tag */}
          {step >= 1 && (
            <div
              style={{
                animation:
                  "fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
              }}
            >
              <p
                style={{
                  fontFamily: "Indie Flower",
                  fontSize: "17px",
                  color: "#5C3D11",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                👆 See that <strong>"isn't he?"</strong> at the end? That's the{" "}
                <strong>tag</strong>.
              </p>
            </div>
          )}

          {step === 1 && (
            <button onClick={next} style={btnStyle}>
              Hmm....
            </button>
          )}

          {/* Step 2: Highlight where it came from */}
          {step >= 2 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                animation:
                  "fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
              }}
            >
              <p
                style={{
                  fontFamily: "Indie Flower",
                  fontSize: "17px",
                  color: "#5C3D11",
                  margin: 0,
                  textAlign: "center",
                }}
              >
                Now look closely — where did <strong>"isn't he"</strong> come
                from?
              </p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span
                  style={{
                    padding: "4px 12px",
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
                    padding: "4px 12px",
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
              <div style={{ fontSize: "22px", color: "#626D58" }}>↓</div>
              <div style={{ display: "flex", gap: "8px" }}>
                <span
                  style={{
                    padding: "4px 12px",
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
                    padding: "4px 12px",
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
              </div>
              <p
                style={{
                  fontFamily: "Indie Flower",
                  fontSize: "15px",
                  color: "#8b7c4e",
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                We took the verb and subject from the sentence — verb goes first
                in the tag!
              </p>
            </div>
          )}

          {step === 2 && (
            <button onClick={next} style={btnStyle}>
              Oh interesting!
            </button>
          )}

          {/* Step 3: Polarity flip discovery */}
          {step >= 3 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                animation:
                  "fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
              }}
            >
              <p
                style={{
                  fontFamily: "Indie Flower",
                  fontSize: "17px",
                  color: "#5C3D11",
                  margin: 0,
                  textAlign: "center",
                }}
              >
                But wait — <strong>"is"</strong> became <strong>"isn't"</strong>
                . Why?
              </p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span
                    style={{
                      padding: "6px 14px",
                      borderRadius: "8px",
                      fontFamily: "Irish Grover",
                      fontSize: "17px",
                      color: "#FFF3CF",
                      background: "#5a8c4e",
                      border: "2px solid #A9DC97",
                    }}
                  >
                    + positive
                  </span>
                  <p
                    style={{
                      fontFamily: "Irish Grover",
                      color: "#8b7c4e",
                      margin: 0,
                      fontSize: "14px",
                    }}
                  >
                    statement
                  </p>
                </div>
                <span
                  style={{
                    fontSize: "28px",
                    color: "#626D58",
                    fontWeight: "bold",
                  }}
                >
                  →
                </span>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span
                    style={{
                      padding: "6px 14px",
                      borderRadius: "8px",
                      fontFamily: "Irish Grover",
                      fontSize: "17px",
                      color: "#FFF3CF",
                      background: "#b85c5c",
                      border: "2px solid #e07070",
                    }}
                  >
                    − negative
                  </span>
                  <p
                    style={{
                      fontFamily: "Irish Grover",
                      color: "#8b7c4e",
                      margin: 0,
                      fontSize: "14px",
                    }}
                  >
                    tag
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontFamily: "Indie Flower",
                  fontSize: "15px",
                  color: "#8b7c4e",
                  margin: 0,
                  fontStyle: "italic",
                  textAlign: "center",
                }}
              >
                The sentence was positive, so the tag flips to negative. Always
                opposite!
              </p>
            </div>
          )}

          {step === 3 && (
            <button onClick={next} style={btnStyle}>
              Makes sense!
            </button>
          )}

          {/* Step 4: Done */}
          {step >= 4 && (
            <div
              style={{
                animation:
                  "fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                width: "50%",
              }}
            >
              <p
                style={{
                  fontFamily: "Indie Flower",
                  fontSize: "17px",
                  color: "#5C3D11",
                  margin: 0,
                }}
              >
                🎉 That's the core mechanic! Verb + subject, flipped polarity.
              </p>
              <button
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => {
                  setClear(true);
                  setHover(false);
                }}
                style={{ ...btnStyle, marginTop: "12px" }}
              >
                {hover ? "Yes!" : "Got it?"}
              </button>
              {!unclear && (
                <button
                  onClick={() => setUnclear(true)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Indie Flower",
                    fontSize: "15px",
                    color: "#8b7c4e",
                    textDecoration: "underline",
                    marginTop: "8px",
                  }}
                >
                  still unclear?
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SecondRule({ hns }) {
  const [step, setStep] = useState(null);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setStep(0);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <h2 style={{ color: "#626D58", fontFamily: "Irish Grover", margin: "0" }}>
        Rule 2: Pronouns
      </h2>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {/* Step 0: Just show the full sentence */}
          {step === 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "20px",
                fontFamily: "Irish Grover",
                animation:
                  "fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
              }}
            >
              <span style={{ fontSize: "22px", color: "#5C3D11" }}>
                Tim likes coding, doesn't Tim?
              </span>
              <button
                style={{
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  background: hover ? "#8b7c4e" : "#626D58",
                  color: "#FFF3CF",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontFamily: "Irish Grover",
                  animation:
                    "fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => setStep(1)}
              >
                {hover ? "Yeah.." : "🤔 Suspicious...?"}
              </button>
            </div>
          )}
          {(step >= 1 && step <=2) && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "20px",
                fontFamily: "Irish Grover",
                animation:
                  "fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
              }}
            >
              <span style={{ fontSize: "22px", color: "#5C3D11" }}>
                Wait a minute... this sounds kinda off, doesn't it?
              </span>
              {step === 1 && (
                <button
                  onClick={() => { setStep(2); setHover(false); }}
                  style={{
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    background: "#626D58",
                    color: "#FFF3CF",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontFamily: "Irish Grover",
                    animation:
                      "fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                  }}
                >
                  Heyy wait, "it"! 👆
                </button>
              )}
            </div>
          )}
          {step === 2 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "12px",
                animation:
                  "fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                background: "#FFF0C2",
                border: "2px solid #F5D77E",
                borderRadius: "14px",
                padding: "16px 24px",
                maxWidth: "460px",
                textAlign: "center",
                boxShadow: "2px 2px 0px #F0C040",
              }}
            >
              <span style={{ fontSize: "28px" }}>💡</span>
              <span
                style={{
                  fontSize: "18px",
                  color: "#5C3D11",
                  fontFamily: "Indie Flower",
                  lineHeight: "1.7",
                }}
              >
                Heyy, we just used a pronoun —{" "}
                <strong
                  style={{
                    color: "#2D6A1F",
                    background: "#A9DC97",
                    padding: "2px 8px",
                    borderRadius: "6px",
                  }}
                >
                  "it"
                </strong>
                ! In tags we use pronouns instead of repeating the subject.
              </span>
              <button
                onClick={() => setStep(3)}
                style={{
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  background: "#626D58",
                  color: "#FFF3CF",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontFamily: "Irish Grover",
                  animation:
                    "fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                }}
              >
                Oooh...
              </button>
            </div>
          )}
          {step === 3 && (
            <div style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "20px",
                fontFamily: "Irish Grover",
                animation:
                  "fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
              }}>
              <span style={{ fontSize: "22px", color: "#5C3D11" }}>
                Soooo, let's go to the first example
              </span>
              <div style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "20px",
                animation:
                  "fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                background: "#FFF0C2",
                border: "2px solid #F5D77E",
                borderRadius: "14px",
                padding: "16px 24px",
                maxWidth: "460px",
                textAlign: "center",
                boxShadow: "2px 2px 0px #F0C040",
              }}>
                <span>We'll use the pronoun:</span>
                
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center'
                }}><span
                  style={{
                    padding: "4px 12px",
                    borderRadius: "8px",
                    fontFamily: "Irish Grover",
                    fontSize: "18px",
                    color: "#FFF3CF",
                    background: "#928644d2",
                    border: "2px solid #A9DC97",
                  }}
                >
                  Tim
                </span>
                →
                <span
                  style={{
                    padding: "4px 12px",
                    borderRadius: "8px",
                    fontFamily: "Irish Grover",
                    fontSize: "18px",
                    color: "#FFF3CF",
                    background: "#928644d2",
                    border: "2px solid #A9DC97",
                  }}
                >
                  he
                </span></div>
              </div>
              <span style={{ fontSize: "22px", color: "#5C3D11" }}>
                It'll be like this:
              </span>
              <div style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center'
                }}><span
                  style={{
                    padding: "4px 12px",
                    borderRadius: "8px",
                    fontFamily: "Irish Grover",
                    fontSize: "18px",
                    color: "#FFF3CF",
                    background: "#928644d2",
                    border: "2px solid #A9DC97",
                  }}
                >
                  Tim
                </span>
                <span
                  style={{
                    padding: "4px 12px",
                    borderRadius: "8px",
                    fontFamily: "Irish Grover",
                    fontSize: "18px",
                    color: "#FFF3CF",
                    background: "#928644",
                    border: "2px solid #F5D77E",
                  }}
                >
                  likes
                </span>
                <span>→</span>
                <span
                  style={{
                    padding: "4px 12px",
                    borderRadius: "8px",
                    fontFamily: "Irish Grover",
                    fontSize: "18px",
                    color: "#FFF3CF",
                    background: "#928644",
                    border: "2px solid #F5D77E",
                  }}
                >
                  doesn't
                </span>
                <span
                  style={{
                    padding: "4px 12px",
                    borderRadius: "8px",
                    fontFamily: "Irish Grover",
                    fontSize: "18px",
                    color: "#FFF3CF",
                    background: "#928644d2",
                    border: "2px solid #A9DC97",
                  }}
                >
                  he
                </span>?</div>
                <button
                style={{
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  background: hover ? "#8b7c4e" : "#626D58",
                  color: "#FFF3CF",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontFamily: "Irish Grover",
                  animation:
                    "fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => setStep(4)}
              >
                {hover ? "Yeah!" : "Got it?"}
              </button>
            </div>
          )}
        </div>
      </div>
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
          {sections.map((sec, index) => (
            <div
              key={index}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                ...(index === currentSection
                  ? { background: "#626D58" }
                  : { border: "1px solid #626D58", background: "transparent" }),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
