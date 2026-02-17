import Titles from "../../components/Titles";
import CancelCross from "../../components/CancelCross";
import { useState, useEffect } from "react";
import InputField from "../../components/InputField";
import { api } from "../../api/client";
import { Link } from "react-router";

export default function TagQuestion() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState("idle");
  const [explanation, setExplanation] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [hasTriedOnce, setHasTriedOnce] = useState(false); // <-- KEY

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const result = await api.getPracticeQuestions("tag_questions", user.id);
        if (result !== "No need!") setQuestions(result.questions);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [user.id]);

  const handleSubmit = async () => {
    try {
      const currentQuestion = questions[currentQuestionIndex];
      const result = await api.checkAnswer(
        currentQuestion.id,
        user.id,
        userAnswer,
      );

      setExplanation(result.explanation["grammatical"]);
      setCorrectAnswer(result.answer);

      if (result.correct) {
        setIsAnswerCorrect("correct");
        setCorrectAnswers((prev) => prev + 1);
      } else {
        if (hasTriedOnce) {
          // Second wrong attempt — reveal explanation
          setIsAnswerCorrect("revealed");
        } else {
          // First wrong attempt — just show wrong, let them retry
          setIsAnswerCorrect("wrong");
          setHasTriedOnce(true);
        }
      }
    } catch (error) {
      console.error("Error checking answer:", error);
    }
  };

  const handleNextQuestion = () => {
    setUserAnswer("");
    setIsAnswerCorrect("idle");
    setHasTriedOnce(false); // reset for next question!
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "Irish Grover",
          background: '#FFF3CF',
          fontSize: "2rem",
        }}
      >
        Loading questions...
      </div>
    );

  if (!questions)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "Irish Grover",
          fontSize: "2rem",
          background: '#FFF3CF'
        }}
      >
        <CancelCross/>
        No questions available for you to practice now!
      </div>
    );

  if (isQuizComplete)
    return (
      <div>
        <CancelCross />
        <Titles title="Quiz Complete!" margin={true} />
        <div
          style={{
            marginTop: "80px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "auto",
            marginBottom: "100px",
          }}
        >
          <div
            style={{
              padding: "40px 60px",
              borderRadius: "15px",
              background: "#A9DC97",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                fontSize: "60px",
                background: "#C7C369",
                borderRadius: "50%",
                color: "#A9DC97",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✓
            </div>
            <h2
              style={{
                fontFamily: "Indie Flower",
                fontSize: "32px",
                textAlign: "center",
              }}
            >
              Great Job!
            </h2>
            <div
              style={{
                fontSize: "24px",
                fontFamily: "Indie Flower",
                textAlign: "center",
              }}
            >
              <p>
                You answered <strong>{correctAnswers}</strong> out of{" "}
                <strong>{questions.length}</strong> correctly.
              </p>
              <p>
                Score:{" "}
                <strong>
                  {Math.round((correctAnswers / questions.length) * 100)}%
                </strong>
              </p>
            </div>
            <button
              onClick={() => {
                setIsQuizComplete(false);
                setCurrentQuestionIndex(0);
                setCorrectAnswers(0);
                setUserAnswer("");
                setHasTriedOnce(false);
              }}
              style={{
                padding: "10px 30px",
                border: "none",
                borderRadius: "5px",
                background: "#626D58",
                color: "#FFF3CF",
                cursor: "pointer",
                fontSize: "16px",
                fontFamily: "Irish Grover",
              }}
            >
              Retake Quiz
            </button>
            <Link to="/">
              <button
                style={{
                  padding: "10px 30px",
                  border: "none",
                  borderRadius: "5px",
                  background: "#626D58",
                  color: "#FFF3CF",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontFamily: "Irish Grover",
                }}
              >
                Go home
              </button>
            </Link>
          </div>
        </div>
      </div>
    );

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <CancelCross />
      <Titles title="Tag Questions" margin={true} />
      <div
        style={{
          marginTop: "80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "auto",
          marginBottom: "100px",
        }}
      >
        <div
          style={{
            padding: "20px 60px",
            borderRadius: "15px",
            background: "#A9DC97",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Question display */}
          <h3
            style={{
              fontFamily: "Indie Flower",
              fontSize: "24px",
              marginBottom: "20px",
            }}
          >
            {currentQuestion.question},{" "}
            {isAnswerCorrect === "idle" || isAnswerCorrect === "wrong" ? (
              "______"
            ) : (
              <span
                style={{
                  textDecoration: "underline",
                  color: isAnswerCorrect === "correct" ? "#C7C369" : "#F5745D",
                }}
              >
                {userAnswer}
              </span>
            )}{" "}
            ?
          </h3>

          {/* IDLE — first attempt */}
          {isAnswerCorrect === "idle" && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <InputField
                userAnswer={userAnswer}
                handleKeyPress={handleKeyPress}
                setUserAnswer={setUserAnswer}
              />
              <button
                onClick={handleSubmit}
                style={{
                  width: "50px",
                  height: "35px",
                  border: "none",
                  borderRadius: "5px",
                  background: "#626D58",
                  color: "#FFF3CF",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              >
                →
              </button>
            </div>
          )}

          {/* CORRECT */}
          {isAnswerCorrect === "correct" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    fontSize: "30px",
                    background: "#C7C369",
                    borderRadius: "50%",
                    color: "#A9DC97",
                  }}
                >
                  ✓
                </div>
                <h3 style={{ fontFamily: "Indie Flower" }}>That's correct!</h3>
              </div>
              <h3
                style={{
                  fontFamily: "Indie Flower",
                  width: "50%",
                  textAlign: "center",
                }}
              >
                {explanation}
              </h3>
              <button
                onClick={handleNextQuestion}
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
                Next Question →
              </button>
            </div>
          )}

          {/* WRONG — first attempt, no explanation yet */}
          {isAnswerCorrect === "wrong" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <div
                style={{
                  padding: "10px 15px",
                  background: "#F5745D",
                  borderRadius: "50%",
                  color: "#A9DC97",
                }}
              >
                ✗
              </div>
              <h3 style={{ fontFamily: "Indie Flower", textAlign: "center" }}>
                Not quite, try again!
              </h3>
              <InputField
                userAnswer={userAnswer}
                handleKeyPress={handleKeyPress}
                setUserAnswer={setUserAnswer}
              />
              <button
                onClick={handleSubmit}
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
                Try Again →
              </button>
            </div>
          )}

          {/* REVEALED — second wrong attempt, show explanation + correct answer */}
          {isAnswerCorrect === "revealed" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <div
                style={{
                  padding: "10px 15px",
                  background: "#F5745D",
                  borderRadius: "50%",
                  color: "#A9DC97",
                }}
              >
                ✗
              </div>
              <h3 style={{ fontFamily: "Indie Flower", textAlign: "center" }}>
                The correct answer was:{" "}
                <span style={{ color: "#626D58" }}>{correctAnswer}</span>
              </h3>
              <h3
                style={{
                  fontFamily: "Indie Flower",
                  width: "60%",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                {explanation}
              </h3>
              <button
                onClick={handleNextQuestion}
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
                Next Question →
              </button>
            </div>
          )}

          {/* Progress dots */}
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            {questions.map((_, index) => (
              <div
                key={index}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  ...(index === currentQuestionIndex
                    ? { background: "#626D58" }
                    : {
                        border: "1px solid #626D58",
                        background: "transparent",
                      }),
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
