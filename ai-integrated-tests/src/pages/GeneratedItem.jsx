import Titles from "../components/Titles";
import CancelCross from "../components/CancelCross";
import ReactMarkdown from 'react-markdown'

function GeneratedItem(props) {
  
  const downloadMarkdown = () => {
    // Create a Blob from the markdown content
    const blob = new Blob([props.response], { type: 'text/markdown' });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `exam-${Date.now()}.md`; // filename with timestamp
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        padding: "80px 20px",
        width: "inherit",
        display: "flex",
        gap: "10px",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        background: "#FFF3CF",
      }}
    >
      <CancelCross />
      <Titles title="Ready!" />
      <div
        style={{
          width: "500px",
          height: "500px",
          background: "#FFF",
          border: "1px solid #626D58",
          borderRadius: "10px",
          padding: "20px",
          overflow: "auto",
        }}
      >
        <ReactMarkdown>{props.response}</ReactMarkdown>
      </div>

      <button
        onClick={downloadMarkdown}
        style={{
          fontFamily: "Irish Grover",
          padding: "15px 40px",
          border: "none",
          borderRadius: "10px",
          background: "#626D58",
          color: "#FFF3CF",
          fontSize: "1.25rem",
          marginTop: "20px",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#A9DC97";
          e.currentTarget.style.color = "#000";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#626D58";
          e.currentTarget.style.color = "#FFF3CF";
        }}
      >
        Download MD
      </button>

      <button
        style={{
          fontFamily: "Irish Grover",
          padding: "15px 40px",
          border: "none",
          borderRadius: "10px",
          background: "#626D58",
          color: "#FFF3CF",
          cursor: "pointer",
          fontSize: "1.25rem",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#A9DC97";
          e.currentTarget.style.color = "#000";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#626D58";
          e.currentTarget.style.color = "#FFF3CF";
        }}
      >
        Start Timer
      </button>

      <button
        style={{
          fontFamily: "Irish Grover",
          padding: "15px 40px",
          border: "none",
          borderRadius: "10px",
          background: "#626D58",
          color: "#FFF3CF",
          cursor: "pointer",
          fontSize: "1.25rem",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#A9DC97";
          e.currentTarget.style.color = "#000";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#626D58";
          e.currentTarget.style.color = "#FFF3CF";
        }}
      >
        Submit Answers
      </button>
    </div>
  );
}

export default GeneratedItem;