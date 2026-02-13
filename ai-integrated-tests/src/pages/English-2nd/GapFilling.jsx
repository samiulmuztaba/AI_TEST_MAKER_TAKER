// import Titles from "../../components/Titles";
// import CancelCross from "../../components/CancelCross";
// import DndBox from "../../components/DndBox";

// export default function GapFilling() {
//   const clues = ["something", "has", "to", "be", "here", "so", "you", "know!"];
//   const passage =
//     "Honesty is a great virtue. It (a) ______ a person respected by all. A dishonest man may (b) ______ success for a short time, but in the long run he (c) ______. So, we should always be (d) ______ and (e) ______ the truth.";

//   return (
//     <div style={{ marginBottom: "150px" }}>
//       <CancelCross />
//       <Titles title="Gap Filling With Clues" margin={true} />
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: "40px",
//           marginTop: "50px",
//         }}
//       >
//         <div
//           style={{
//             fontSize: "1.2rem",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: "20px",
//             marginTop: "50px",
//           }}
//         >
//           {clues.map((clue) => (
//             <DndBox content={clue} />
//           ))}
//         </div>
//         <div
//           style={{
//             width: "50%",
//             padding: "30px",
//             background: "#A9DC97",
//             display: "inline-flex",
//             flexDirection: "row",
//             alignItems: "center",
//             borderRadius: "20px",
//             fontFamily: "Indie Flower",
//             fontSize: "1.2rem",
//           }}
//         >
//           {passage.split(" ").map((word) => {
//             if (!word.includes("_")) return word + " "
//             else return <div></div>
//           })}
//         </div>
//         <button
//           style={{
//             //   width: "50px",
//             // height: "35px",
//             border: "none",
//             borderRadius: "5px",
//             background: "#626D58",
//             color: "#FFF3CF",
//             cursor: "pointer",
//             fontSize: "1.2rem",
//             fontFamily: "Irish Grover",
//             padding: "10px 15px",
//           }}
//         >
//           Submit →
//         </button>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import Titles from "../../components/Titles";
import CancelCross from "../../components/CancelCross";
import { DndContext, DragOverlay, useDroppable } from '@dnd-kit/core';
import DraggableBox from "../../components/DraggableBox"


// Droppable Zone (blank in passage)
function DropZone({ id, content }) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  const style = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "100px",
    height: "40px",
    background: isOver ? "#C7C369" : (content? "#A9DC97": "#FFF"),
    border: "2px dashed #626D58",
    borderRadius: "15px",
    padding: "0 10px",
    margin: "0 8px",
    verticalAlign: "middle",
    transition: "all 0.2s",
  };

  return (
    <span ref={setNodeRef} style={style}>
      {/* {content ? (
        <span style={{
          fontFamily: "Indie Flower",
          padding: "0px 20px",
          borderRadius: "15px",
          color: "#A9DC97",
          // background: "#626D58",
        }}>
          {content}
        </span>
      ) : (
        <span style={{ 
          fontFamily: "Irish Grover",
          color: "#626D58",
          fontSize: "1rem"
        }}>
          {id}
        </span>
      )} */}
      <span style={{ 
          fontFamily: "Irish Grover",
          color: "#626D58",
          fontSize: "1rem"
        }}>
          {content? content : id}
        </span>
    </span>
  );
}

export default function GapFilling() {
  const clues = [
    { id: "clue-makes", content: "makes" },
    { id: "clue-gain", content: "gain" },
    { id: "clue-falls", content: "falls" },
    { id: "clue-honest", content: "honest" },
    { id: "clue-speak", content: "speak" },
  ];
  
  const [answers, setAnswers] = useState({
    a: null,
    b: null,
    c: null,
    d: null,
    e: null
  });

  const [activeId, setActiveId] = useState(null);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (over && over.id.match(/^[a-e]$/)) {
      const content = active.id.replace("clue-", "");
      
      setAnswers({
        ...answers,
        [over.id]: content
      });
    }
    
    setActiveId(null);
  };


  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div style={{ marginBottom: "150px" }}>
        <CancelCross />
        <Titles title="Gap Filling With Clues" margin={true} />
        
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "60px",
            marginTop: "80px",
            padding: "0 40px",
          }}
        >
          {/* Clues Section */}
          <div style={{ textAlign: "center" }}>
            <p style={{ 
              fontFamily: "Indie Flower", 
              fontSize: "1.3rem",
              marginBottom: "20px",
              fontWeight: "bold"
            }}>
              Drag words to fill the blanks:
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
                flexWrap: "wrap",
                minHeight: "60px",
              }}
            >
              {clues.map((clue) => (
                <DraggableBox key={clue.id} id={clue.id} content={clue.content} />
              ))}
            </div>
          </div>
          
          {/* Passage Section */}
          <div
            style={{
              maxWidth: "700px",
              padding: "40px",
              background: "#A9DC97",
              borderRadius: "20px",
              fontFamily: "Indie Flower",
              fontSize: "1.3rem",
              lineHeight: "2.8",
            }}
          >
            Honesty is a great virtue. It <DropZone id="a" content={answers.a} /> a person respected by all. 
            A dishonest man may <DropZone id="b" content={answers.b} /> success for a short time, but in the 
            long run he <DropZone id="c" content={answers.c} />. So, we should always be <DropZone id="d" content={answers.d} /> and{" "}
            <DropZone id="e" content={answers.e} /> the truth.
          </div>
          
          {/* Submit Button */}
          {Object.values(answers).every(val => val !== null) && (
            <button
              style={{
                border: "none",
                borderRadius: "15px",
                background: "#626D58",
                color: "#FFF3CF",
                cursor: "pointer",
                fontSize: "1.3rem",
                fontFamily: "Irish Grover",
                padding: "15px 40px",
              }}
            >
              Submit Answer →
            </button>
          )}
        </div>
      </div>
      
      {/* Drag Overlay (shows what you're dragging) */}
      <DragOverlay>
        {activeId ? (
          <div style={{
            fontFamily: "Indie Flower",
            padding: "8px 16px",
            borderRadius: "15px",
            background: "#A9DC97",
            opacity: 0.8,
          }}>
            {activeId.replace("clue-", "")}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}