import CancelCross from "../components/CancelCross";

function LoadingAnimation({ percentage }) {
  const text = "GENERATED";
  const totalLetters = text.length;

  // Calculate how many letters should be dark based on percentage
  const filledLetters = Math.floor(percentage * totalLetters);

  // Check if "Done" should be filled
  const isDoneFilled = percentage >= 1;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        width: "inherit",
        minHeight: "80vh",
        fontFamily: "Irish Grover",
      }}
    >
      <div style={{ maxWidth: "766px", width: "100%" }}>
        <div
          style={{
            display: "flex",
            gap: "8px",
            margin: "0",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {text.split("").map((letter, index) => (
            <span
              key={index}
              style={{
                fontSize: "8rem",
                color: index < filledLetters ? "#626D58" : "#A9DC97",
                transition: "color 0.3s ease",
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginTop: "-20px",
          }}
        >
          <p
            style={{
              fontSize: "1.5rem",
              color: "#626D58",
              margin: "0",
            }}
          >
            {Math.round(percentage * 100)}%
          </p>

          <p
            style={{
              fontSize: "1.2rem",
              color: isDoneFilled ? "#626D58" : "#A9DC97",
              margin: "0",
              transition: "color 0.3s ease",
            }}
          >
            Done
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoadingAnimation;