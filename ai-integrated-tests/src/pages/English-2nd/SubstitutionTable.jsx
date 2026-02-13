import { useState, useEffect } from "react";
import Titles from "../../components/Titles";
import CancelCross from "../../components/CancelCross";
import { DndContext, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core';

// Draggable word from columns
function DraggableWord({ id, content }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
    data: { content }, // Pass content in data
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : 1,
    fontFamily: "Indie Flower",
    fontSize: "1.06rem",
    padding: "10px 20px",
    borderRadius: "15px",
    background: "#A9DC97",
    cursor: "grab",
    userSelect: "none",
    touchAction: "none",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {content}
    </div>
  );
}

// Drop zone for sentence
function SentenceDropZone({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  const style = {
    display: "flex",
    fontFamily: "Indie Flower",
    alignItems: "center",
    justifyContent: "left",
    gap: "10px",
    fontSize: "1.3rem",
    minWidth: "60%",
    minHeight: "50px",
    padding: "10px",
    borderBottom: isOver ? "2px solid #626D58" : "2px dashed #ccc",
    borderRadius: "10px",
    background: isOver ? "rgba(169, 220, 151, 0.1)" : "transparent",
    transition: "all 0.2s",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

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

  const [sentences, setSentences] = useState([
    { id: 1, parts: [] },
    { id: 2, parts: [] },
    { id: 3, parts: [] },
    { id: 4, parts: [] },
    { id: 5, parts: [] },
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [activeId, setActiveId] = useState(null);
  const [showArrowB, setShowArrowB] = useState(false);

  // Check if current sentence is complete
  useEffect(() => {
    const currentSentence = sentences[currentQuestionIndex - 1];
    setShowArrowB(currentSentence?.parts.length === 3);
  }, [sentences, currentQuestionIndex]);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (over && over.id.toString().startsWith('sentence-')) {
      const sentenceId = parseInt(over.id.replace('sentence-', ''));
      const content = active.data.current.content;
      
      setSentences(sentences.map((sentence) => {
        if (sentence.id === sentenceId && 
            sentence.parts.length < 3 && 
            !sentence.parts.includes(content)) {
          return { ...sentence, parts: [...sentence.parts, content] };
        }
        return sentence;
      }));
    }
    
    setActiveId(null);
  };

  const removeWord = (sentenceId, index) => {
    setSentences(sentences.map((sentence) => {
      if (sentence.id === sentenceId) {
        return {
          ...sentence,
          parts: sentence.parts.filter((_, i) => i !== index),
        };
      }
      return sentence;
    }));
  };

  const handleNextQ = () => {
    if (currentQuestionIndex < 5) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowArrowB(false);
    } else {
      alert("All sentences completed!");
    }
  };

  // Get all words that are already used
  const usedWords = sentences[currentQuestionIndex - 1]?.parts || [];

  // Filter available words
  const availableCol1 = column1.filter(word => !usedWords.includes(word));
  const availableCol2 = column2.filter(word => !usedWords.includes(word));
  const availableCol3 = column3.filter(word => !usedWords.includes(word));

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
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
            style={{
              display: "flex",
              gap: "10px",
              flexDirection: "column",
              padding: "0px 10px",
              borderRight: "1px solid black",
            }}
          >
            {availableCol1.map((content, index) => (
              <DraggableWord
                key={`col1-${index}`}
                id={`col1-${content}`}
                content={content}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexDirection: "column",
              padding: "0px 10px",
              borderRight: "1px solid black",
            }}
          >
            {availableCol2.map((content, index) => (
              <DraggableWord
                key={`col2-${index}`}
                id={`col2-${content}`}
                content={content}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexDirection: "column",
              padding: "0px 10px",
            }}
          >
            {availableCol3.map((content, index) => (
              <DraggableWord
                key={`col3-${index}`}
                id={`col3-${content}`}
                content={content}
              />
            ))}
          </div>
        </div>

        <div
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
            if (sentence.id === currentQuestionIndex) {
              return (
                <SentenceDropZone key={sentence.id} id={`sentence-${sentence.id}`}>
                  <p>{sentence.id}.</p>
                  {sentence.parts.map((part, index) => (
                    <div
                      key={index}
                      onClick={() => removeWord(sentence.id, index)}
                      style={{
                        cursor: "pointer",
                        padding: "5px 10px",
                        borderRadius: "15px",
                        background: "#A9DC97",
                        fontFamily: "Indie Flower",
                      }}
                    >
                      {part}
                    </div>
                  ))}
                </SentenceDropZone>
              );
            }
            return null;
          })}

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

          <div style={{ display: "flex", gap: "10px" }}>
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

      <DragOverlay>
        {activeId ? (
          <div style={{
            fontFamily: "Indie Flower",
            fontSize: "1.06rem",
            padding: "10px 20px",
            borderRadius: "15px",
            background: "#A9DC97",
            opacity: 0.8,
          }}>
            {activeId.split('-').slice(1).join('-')}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}