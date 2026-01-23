// // import Titles from "../../components/Titles";
// // import CancelCross from "../../components/CancelCross";

// // export default function TagQuestion() {
// //   const questions = [
// //     "Something is happening",
// //     "No, it's nothing",
// //     "Stop Talking",
// //     "I am scared",
// //   ];
// //   return (
// //     <div>
// //       <CancelCross />
// //       <Titles title="Tag Questions" margin={true} />
// //       <div
// //         style={{
// //           marginTop: "80px",
// //           display: "flex",
// //           justifyContent: "center",
// //           alignItems: "center",
// //         }}
// //       >
// //         {questions.map((question) => {
// //           return (
// //             <div
// //               style={{
// //                 padding: "20px 60px",
// //                 borderRadius: "15px",
// //                 background: "#A9DC97",
// //                 display: "flex",
// //                 flexDirection: "column",
// //                 justifyContent: "center",
// //                 alignItems: "center",
// //               }}
// //             >
// //               <h3 style={{ fontFamily: "Indie Flower", fontSize: "24px" }}>
// //                 {question}, ______?
// //               </h3>
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   flexDirection: "row",
// //                   justifyContent: "center",
// //                   alignItems: "center",
// //                   gap: "10px",
// //                 }}
// //               >
// //                 <input
// //                   type="text"
// //                   style={{
// //                     width: "150px",
// //                     height: "30px",
// //                     border: "2px solid #626D58",
// //                     borderRadius: "5px",
// //                   }}
// //                 />
// //                 <button
// //                   style={{
// //                     width: "50px",
// //                     height: "35px",
// //                     border: "none",
// //                     borderRadius: "5px",
// //                     background: "#626D58",
// //                     color: "#FFF3CF",
// //                   }}
// //                 >
// //                   →
// //                 </button>
// //               </div>
// //               <div></div>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }

// import Titles from "../../components/Titles";
// import CancelCross from "../../components/CancelCross";
// import { useState } from "react";
// import InputField from "../../components/InputField";

// export default function TagQuestion() {
//   const questions = [
//     "Something is happening",
//     "No, it's nothing",
//     "Stop Talking",
//     "I am scared",
//   ];
//   const answers = ["isn't it", "is it", "will you", "aren't I"]
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userAnswer, setUserAnswer] = useState("");
//   const [isAnswerCorrect, setIsAnswerCorrect] = useState(0)

//   const handleSubmit = () => {
//     // Here you would check the answer if needed
//     // For now, just move to the next question

//     if (userAnswer === answers[currentQuestionIndex]) setIsAnswerCorrect(true)
//         else setIsAnswerCorrect(false)
//     console.log(isAnswerCorrect)

//     setUserAnswer(""); // Clear the input
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       // All questions completed - you could show a completion message
//       alert("All questions completed!");
//       setCurrentQuestionIndex(0); // Reset to start
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSubmit();
//     }
//   };

//   return (
//     <div>
//       <CancelCross />
//       <Titles title="Tag Questions" margin={true} />
//       <div
//         style={{
//           marginTop: "80px",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <div
//           style={{
//             padding: "20px 60px",
//             borderRadius: "15px",
//             background: "#A9DC97",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           {/* <div style={{ marginBottom: "15px", fontFamily: "Arial", fontSize: "16px" }}>
//             Question {currentQuestionIndex + 1} of {questions.length}
//           </div> */}

//           <h3 style={{ fontFamily: "Indie Flower", fontSize: "24px", marginBottom: "20px" }}>
//             {questions[currentQuestionIndex]}, ______?
//           </h3>

//           {isAnswerCorrect === 0 ? (<div
//             style={{
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "center",
//               alignItems: "center",
//               gap: "10px",
//             }}
//           >
//             <InputField userAnswer={userAnswer} handleKeyPress={handleKeyPress} setUserAnswer={setUserAnswer}/>
//             <button
//               onClick={handleSubmit}
//               style={{
//                 width: "50px",
//                 height: "35px",
//                 border: "none",
//                 borderRadius: "5px",
//                 background: "#626D58",
//                 color: "#FFF3CF",
//                 cursor: "pointer",
//                 fontSize: "20px",
//               }}
//             >
//               →
//             </button>
//           </div>) : isAnswerCorrect ? (<div>
//             <div>✓</div>
//             <h3>that's correct!</h3>
//           </div>) : (<div style={{
//             display: "flex",
//             flexDirection: "row",
//           }}>
//             <div>x</div>
//             <h3 style={{fontFamily: "Indie Flower"}}>noooo duuude, you are so dumb!</h3>
//             <button
//               onClick={handleSubmit}
//               style={{
//                 padding: "10px 10px",
//                 border: "none",
//                 borderRadius: "5px",
//                 background: "#626D58",
//                 color: "#FFF3CF",
//                 cursor: "pointer",
//                 fontSize: "20px",
//                 fontFamily: "Irish Grover",
//               }}
//             >
//               Try Again →
//             </button>
//           </div>)}
//           <div style={{
//             display: "flex",
//             gap: "10px",
//             marginTop: "20px",
//           }}>{questions.map(question => {
//             return <div style={{
//                 width: "10px",
//                 height: "10px",
//                 borderRadius: "50%",
//                 ...(questions[currentQuestionIndex] === question ? {background: "#626D58"} : {border: "1px solid #626D58"})
//             }}></div>
//           })}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

import Titles from "../../components/Titles";
import CancelCross from "../../components/CancelCross";
import { useState } from "react";
import InputField from "../../components/InputField";

export default function TagQuestion() {
  const questions = [
    "Something is happening",
    "No, it's nothing",
    "Stop Talking",
    "I am scared",
  ];
  const answers = ["isn't it", "is it", "will you", "aren't I"];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(0);

  const handleSubmit = () => {
    if (userAnswer.trim().toLowerCase() === answers[currentQuestionIndex]) {
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
    }
  };

  const handleNextQuestion = () => {
    setUserAnswer("");
    setIsAnswerCorrect(0);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("All questions completed!");
      setCurrentQuestionIndex(0);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

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
            {questions[currentQuestionIndex]}, ______?
          </h3>

          {isAnswerCorrect === 0 ? (
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
          ) : isAnswerCorrect ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
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
                Noo duude, that’ was easy, ‘something’ isn’t plural, you gotta
                fix your grammer first
              </h3>

              <InputField
                userAnswer={userAnswer}
                handleKeyPress={handleKeyPress}
                setUserAnswer={setUserAnswer}
              />

              <button
                onClick={() => {
                  setUserAnswer("");
                  setIsAnswerCorrect(0);
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
