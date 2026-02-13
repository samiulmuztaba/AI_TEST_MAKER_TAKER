export default function InputField({ userAnswer, setUserAnswer, handleKeyPress }) {
    return (<input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{
                width: "150px",
                height: "30px",
                border: "2px solid #626D58",
                borderRadius: "5px",
                padding: "0 10px",
              }}
              placeholder="Your answer"
            />)
}