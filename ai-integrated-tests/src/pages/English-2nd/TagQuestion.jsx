import Titles from "../../components/Titles";
import CancelCross from "../../components/CancelCross";
import { useState, useEffect } from "react";
import InputField from "../../components/InputField";
import { api } from "../../api/client";

export default function TagQuestion() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState("idle");
  const [explanation, setExplanation] = useState('')
  const [isQuizComplete, setIsQuizComplete] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  
  const user = JSON.parse(localStorage.getItem('user'));
  
  // Fetch questions on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const result = await api.getPracticeQuestions('tag-questions', user.id);
        if (result != "No need!") setQuestions(result.questions)
          else return (<div>You don't need to practice this, you are good at this!</div>)
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
        userAnswer
      );
      

      if (result.correct) {
        setIsAnswerCorrect("correct");
        setCorrectAnswers(correctAnswers + 1);
      } else {
        setIsAnswerCorrect("wrong");
      }
      console.log("Explanation:", result.explanation["grammatical"]);
      // setExplanation(result.explanation)
      setExplanation(result.explanation["grammatical"])
      console.log(explanation)
      
      console.log("New overall level:", result.new_overall_level);
    } catch (error) {
      console.error("Error checking answer:", error);
    }
  };

  const handleNextQuestion = () => {
    setUserAnswer("");
    setIsAnswerCorrect("idle");
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizComplete(true);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh",
        fontFamily: "Irish Grover",
        fontSize: "2rem"
      }}>
        Loading questions...
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh",
        fontFamily: "Irish Grover",
        fontSize: "2rem"
      }}>
        No questions available
      </div>
    );
  }

  if (isQuizComplete) {
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
              <p>You answered <strong>{correctAnswers}</strong> out of <strong>{questions.length}</strong> questions correctly.</p>
              <p>Score: <strong>{Math.round((correctAnswers / questions.length) * 100)}%</strong></p>
            </div>
            <button
              onClick={() => {
                setIsQuizComplete(false);
                setCurrentQuestionIndex(0);
                setCorrectAnswers(0);
                setUserAnswer("");
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
          </div>
        </div>
      </div>
    );
  }
  
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
          <h3
            style={{
              fontFamily: "Indie Flower",
              fontSize: "24px",
              marginBottom: "20px",
            }}
          >
            {currentQuestion.question}, {isAnswerCorrect == "idle" ? "______": <span style={{textDecoration: "underline", color: ( isAnswerCorrect == "correct" ? "#C7C369" : "#F5745D")}}>{userAnswer}</span>} ?
          </h3>

          {isAnswerCorrect == "idle" ? (
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
          ) : isAnswerCorrect == "correct" ? (
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
              </div><h3
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
          ) : (
            <div
              style={{
                marginTop: "20px",
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
              <h3
                style={{
                  fontFamily: "Indie Flower",
                  width: "50%",
                  textAlign: "center",
                }}
              >
                {explanation}
              </h3>

              <InputField
                userAnswer={userAnswer}
                handleKeyPress={handleKeyPress}
                setUserAnswer={setUserAnswer}
              />

              <button
                onClick={() => {
                  setUserAnswer("");
                  setIsAnswerCorrect("idle");
                }}
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

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            {questions.map((question, index) => (
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
              ></div>
            ))}
          </div>
        </div>
      </div> 
    </div>
  );
}