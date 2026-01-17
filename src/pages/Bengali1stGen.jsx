import { useState } from "react";
import Titles from "../components/Titles";
import CancelCross from "../components/CancelCross";
import { InferenceClient } from "@huggingface/inference";
import LoadingAnimation from "./LoadingAnimation";

function Bengali1stInterface() {
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const chapters = [
    "প্রত্যুপ্রকার",
    "সুভা",
    "আমি-আঁটির ভেঁপু",
    "বই পড়া",
    "জীবন বিনিময়",
    "উমর ফারুক",
    "সেইদিন এই মাঠ",
  ];

  const moreChapters = [
    "Chapter 8",
    "Chapter 9",
    "Chapter 10",
    "Chapter 11",
    "Chapter 12",
  ];

  const toggleChapter = (chapter) => {
    if (selectedChapters.includes(chapter)) {
      setSelectedChapters(selectedChapters.filter((c) => c !== chapter));
    } else {
      setSelectedChapters([...selectedChapters, chapter]);
    }
  };

  const toggleType = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const callAPI = async () => {
    setLoading(true);
    setProgress(0);

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 0.9) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 0.1;
      });
    }, 500);

    try {
      const client = new InferenceClient(import.meta.env.VITE_HF_TOKEN);

      const chatCompletion = await client.chatCompletion({
        model: "deepseek-ai/DeepSeek-R1",
        messages: [
          {
            role: "user",
            content: `Generate questions for chapters: ${selectedChapters.join(", ")} and types: ${selectedTypes.join(", ")}`,
          },
        ],
      });

      setResponse(chatCompletion.choices[0].message.content);
      clearInterval(progressInterval);
      setProgress(1);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error occurred: " + error.message);
      clearInterval(progressInterval);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "80px 20px",
        background: "#fff3Cf",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CancelCross />
      
      {loading ? (
        <LoadingAnimation percentage={progress} />
      ) : (
        <div style={{ maxWidth: "600px", width: "100%" }}>
          <Titles title="Bengali 1st" />

          {/* Chapter Selection */}
          <div style={{ marginTop: "50px", textAlign: "center" }}>
            <p
              style={{
                fontFamily: "Indie Flower",
                fontSize: "1.15rem",
                marginBottom: "20px",
                fontWeight: "bold",
              }}
            >
              Select Chapters:
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "15px",
                justifyContent: "center",
              }}
            >
              {chapters.map((chapter) => (
                <div
                  key={chapter}
                  onClick={() => toggleChapter(chapter)}
                  style={{
                    padding: "10px 20px",
                    background: selectedChapters.includes(chapter)
                      ? "#626D58"
                      : "#A9DC97",
                    color: selectedChapters.includes(chapter)
                      ? "#fff3Cf"
                      : "black",
                    cursor: "pointer",
                    fontFamily: "Tiro Bangla",
                    fontSize: "1.06rem",
                    transition: "background 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    borderRadius: "15px",
                  }}
                >
                  {selectedChapters.includes(chapter) && (
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "#fff3Cf",
                        fontFamily: "Irish Grover",
                      }}
                    >
                      x
                    </span>
                  )}
                  {chapter}
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowPopup(true)}
              style={{
                padding: "10px 20px",
                background: "#626D58",
                color: "white",
                border: "none",
                borderRadius: "15px",
                cursor: "pointer",
                fontFamily: "Indie Flower",
                fontSize: "1rem",
                marginTop: "15px",
              }}
            >
              Others
            </button>
          </div>

          {/* Type Selection */}
          <div style={{ marginTop: "50px", textAlign: "center" }}>
            <p
              style={{
                fontFamily: "Indie Flower",
                fontSize: "1.15rem",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Select Types:
            </p>
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 24px",
                  background: "#A9DC97",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedTypes.includes("বহুনির্বাচনী")}
                  onChange={() => toggleType("বহুনির্বাচনী")}
                  style={{
                    width: "22px",
                    height: "22px",
                    cursor: "pointer",
                    accentColor: "#626D58",
                  }}
                />
                <p
                  style={{
                    fontFamily: "Tiro Bangla",
                    fontSize: "1.06rem",
                    margin: "0",
                  }}
                >
                  বহুনির্বাচনী
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 24px",
                  background: "#A9DC97",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedTypes.includes("সৃজনশীল")}
                  onChange={() => toggleType("সৃজনশীল")}
                  style={{
                    width: "22px",
                    height: "22px",
                    cursor: "pointer",
                    accentColor: "#626D58",
                  }}
                />
                <p
                  style={{
                    fontFamily: "Tiro Bangla",
                    fontSize: "1.06rem",
                    margin: "0",
                  }}
                >
                  সৃজনশীল
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 24px",
                  background: "#A9DC97",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedTypes.includes("বর্ণনামূলক")}
                  onChange={() => toggleType("বর্ণনামূলক")}
                  style={{
                    width: "22px",
                    height: "22px",
                    cursor: "pointer",
                    accentColor: "#626D58",
                  }}
                />
                <p
                  style={{
                    fontFamily: "Tiro Bangla",
                    fontSize: "1.06rem",
                    margin: "0",
                  }}
                >
                  বর্ণনামূলক
                </p>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div style={{ textAlign: "center", marginTop: "45px" }}>
            <button
              onClick={callAPI}
              disabled={loading}
              style={{
                padding: "12px 30px",
                background: "#626D58",
                color: "white",
                border: "none",
                borderRadius: "15px",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "Irish Grover",
                fontSize: "1.15rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                opacity: loading ? 0.7 : 1,
              }}
            >
              Generate Now
              <span style={{ fontSize: "1.3rem" }}>→</span>
            </button>
          </div>
        </div>
      )}

      {/* Popup Modal */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setShowPopup(false)}
        >
          <div
            style={{
              background: "#fff3Cf",
              padding: "40px",
              maxWidth: "500px",
              maxHeight: "70vh",
              overflow: "auto",
              textAlign: "center",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPopup(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "32px",
                height: "32px",
                background: "#626D58",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontSize: "1.05rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                fontFamily: "Irish Grover",
              }}
            >
              x
            </button>
            <h2
              style={{
                fontFamily: "Irish Grover",
                marginTop: "0",
                fontSize: "1.6rem",
              }}
            >
              More Chapters
            </h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              {moreChapters.map((chapter) => (
                <div
                  key={chapter}
                  onClick={() => {
                    toggleChapter(chapter);
                  }}
                  style={{
                    padding: "10px 20px",
                    background: selectedChapters.includes(chapter)
                      ? "#626D58"
                      : "#A9DC97",
                    color: selectedChapters.includes(chapter)
                      ? "#fff3Cf"
                      : "black",
                    cursor: "pointer",
                    fontFamily: "Indie Flower",
                    fontSize: "1rem",
                    transition: "background 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    borderRadius: "15px",
                  }}
                >
                  {selectedChapters.includes(chapter) && (
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "#fff3Cf",
                        fontFamily: "Irish Grover",
                      }}
                    >
                      x
                    </span>
                  )}
                  {chapter}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bengali1stInterface;