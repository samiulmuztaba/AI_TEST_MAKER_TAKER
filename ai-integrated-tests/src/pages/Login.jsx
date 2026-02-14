import CancelCross from "../components/CancelCross";
import Titles from "../components/Titles";
import google from '../assets/google.svg'
import github from '../assets/github.svg'
import apple from '../assets/apple.svg'

export default function Login() {
  return (
    <div style={{ marginBottom: "10rem" }}>
      <Titles title={"Login"} margin={true} />
      <CancelCross />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Irish Grover",
        }}
      >
        <div
          style={{
            marginTop: "5rem",
            background: "#A9DC97",
            padding: "40px 60px",
            borderRadius: "15px",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label
                htmlFor="username"
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "500",
                  color: "#2d3748",
                }}
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                style={{
                  padding: "12px 20px",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "1rem",
                  outline: "none",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label
                htmlFor="password"
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "500",
                  color: "#2d3748",
                }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                style={{
                  padding: "12px 20px",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "1rem",
                  outline: "none",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                background: "#626D58",
                padding: "12px 24px",
                fontFamily: "Irish Grover",
                color: "white",
                fontSize: "1.1rem",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                marginTop: "0.5rem",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#4f5846";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#626D58";
              }}
            >
              Login
            </button>
          </form>

          <div style={{ marginTop: "1rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{ flex: 1, height: "1px", background: "#88c576" }}
              ></div>
              <h2
                style={{
                  textAlign: "center",
                  color: "#4a5568",
                  fontSize: "0.95rem",
                  fontWeight: "500",
                  margin: 0,
                }}
              >
                Or, sign in with
              </h2>
              <div
                style={{ flex: 1, height: "1px", background: "#88c576" }}
              ></div>
            </div>

            <div
              style={{ display: "flex", gap: "12px", justifyContent: "center" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  padding: "14px 18px",
                  background: "white",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 4px rgba(0, 0, 0, 0.05)";
                }}
              >
                <img
                  src={google}
                  alt="Google"
                  style={{ width: "28px", height: "28px" }}
                />
                <p
                  style={{
                    fontSize: "13px",
                    color: "#374151",
                    margin: 0,
                    fontWeight: "500",
                  }}
                >
                  Google
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  padding: "14px 18px",
                  background: "white",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 4px rgba(0, 0, 0, 0.05)";
                }}
              >
                <img
                  src={github}
                  alt="Github"
                  style={{ width: "28px", height: "28px" }}
                />
                <p
                  style={{
                    fontSize: "13px",
                    color: "#374151",
                    margin: 0,
                    fontWeight: "500",
                  }}
                >
                  Github
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  padding: "14px 18px",
                  background: "white",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 4px rgba(0, 0, 0, 0.05)";
                }}
              >
                <img
                  src={apple}
                  alt="Apple"
                  style={{ width: "28px", height: "28px" }}
                />
                <p
                  style={{
                    fontSize: "13px",
                    color: "#374151",
                    margin: 0,
                    fontWeight: "500",
                  }}
                >
                  Apple
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
