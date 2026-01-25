import { useState, useEffect } from "react";
import Titles from "../../components/Titles";
import CancelCross from "../../components/CancelCross";
import DndBox from "../../components/DndBox";

export default function SubstitutionTable() {
  const column1 = ["Education", "It", "Nobody", "The purpose of education"];
  const column2 = ["is", "can prosper", "enables"];
  const column3 = [
    "the training for proper growth",
    "the liberation of prejudice",
    "our minds and refines our sensibility",
    "in life without education",
    "the process by which our mind develops",
  ];

  // Track 5 sentences, each sentence has 3 parts
  const [sentences, setSentences] = useState([
    { id: 1, parts: [] },
    { id: 2, parts: [] },
    { id: 3, parts: [] },
    { id: 4, parts: [] },
    { id: 5, parts: [] },
  ]);

  const correctSentences = ["Education is the training for proper growth"]

  const [draggedContent, setDraggedContent] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [currentGivenAnswer, setCurrentGivenAnswer] = useState(null);


  const allGivenAnswers = []

  const handleDragStart = (e, content) => {
    setDraggedContent(content);
  };

  const handleDrop = (e, sentenceId) => {
    e.preventDefault();
    if (!draggedContent) return;

    setSentences(
      sentences.map((sentence) => {
        if (sentence.id === sentenceId && sentence.parts.length < 3 && !sentence.parts.includes(draggedContent)) {
          return { ...sentence, parts: [...sentence.parts, draggedContent] };
        }
        return sentence;
      }),
    );

    setDraggedContent(null);
  };

  useEffect(() => {
    if (sentences[currentQuestionIndex - 1]?.parts.length === 3) {
      setShowArrowB(true);
    }
  }, [sentences, currentQuestionIndex]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeWord = (sentenceId, index) => {
    setSentences(
      sentences.map((sentence) => {
        if (sentence.id === sentenceId) {
          return {
            ...sentence,
            parts: sentence.parts.filter((_, i) => i !== index),
          };
        }
        return sentence;
      }),
    );
  };



  const handleNextQ = (e) => {
    e.preventDefault();
    setCurrentGivenAnswer((sentences[currentQuestionIndex - 1].parts).join(" "))
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setShowArrowB(false);
  };

  const [showArrowB, setShowArrowB] = useState(false);

  return (
    <div style={{ marginBottom: "250px" }}>
      <Titles title="Substitution Table" margin={true} />
      <CancelCross />

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p style={{ fontFamily: "Indie Flower", fontSize: "1.2rem" }}>
          Make 5 sentences by dragging words from the columns below
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          marginTop: "50px",
          alignItems: "flex-start",
          justifyContent: "center",
          fontFamily: "Indie Flower",
          fontSize: "1.3rem",
        }}
      >
        <div
          className="column1"
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            padding: "0px 10px",
            borderRight: "1px solid black",
          }}
        >
          {column1.map((content, index) => (
            <DndBox
              key={index}
              content={content}
              onDragStart={handleDragStart}
            />
          ))}
        </div>
        <div
          className="column2"
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            padding: "0px 10px",
            borderRight: "1px solid black",
          }}
        >
          {column2.map((content, index) => (
            <DndBox
              key={index}
              content={content}
              onDragStart={handleDragStart}
            />
          ))}
        </div>
        <div
          className="column3"
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            padding: "0px 10px",
          }}
        >
          {column3.map((content, index) => (
            <DndBox
              key={index}
              content={content}
              onDragStart={handleDragStart}
            />
          ))}
        </div>
      </div>

      <div
        className="answer-pad"
        style={{
          marginTop: "100px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {sentences.map((sentence) => {
          if (sentence.id == currentQuestionIndex)
            return (
              <div
                key={sentence.id}
                onDrop={(e) => handleDrop(e, sentence.id)}
                onDragOver={handleDragOver}
                style={{
                  display: "flex",
                  // flexDirection: "column",
                  fontFamily: "Indie Flower",
                  // alignSelf: "center",
                  // justifySelf: 'center',
                  alignItems: "center",
                  justifyContent: "left",
                  marginTop: "20px",
                  gap: "10px",
                  fontSize: "1.3rem",
                  minWidth: "60%",
                  maxHeight: "30px",
                  padding: "10px",
                  borderBottom: "2px dashed #ccc",
                  borderRadius: "10px",
                }}
              >
                <p>{sentence.id}.</p>
                {sentence.parts.map((part, index) => (
                  <div
                    key={index}
                    onClick={() => removeWord(sentence.id, index)}
                    style={{ cursor: "pointer" }}
                  >
                    <DndBox content={part} isDraggable={false} />
                  </div>
                ))}
              </div>
            );
        })}
        {/* {console.log(sentences[currentQuestionIndex].parts.length)} */}
        {showArrowB && (
          <button
            onClick={handleNextQ}
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
        )}
        <div
          style={{
            display: "flex",
            gap: "10px",
            // marginTop: "20px",
          }}
        >
          {sentences.map((sentence) => (
            <div
              key={sentence.id}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                ...(sentence.id === currentQuestionIndex
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
  );
}
