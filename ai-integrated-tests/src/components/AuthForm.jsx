import google from '../assets/google.svg';
import github from '../assets/github.svg';
import apple from '../assets/apple.svg';

const styles = {
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Irish Grover",
  },
  form: {
    marginTop: "5rem",
    background: "#A9DC97",
    padding: "40px 60px",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "row",
    gap: "4rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontSize: "1.1rem",
    fontWeight: "500",
    color: "#2d3748",
  },
  input: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    outline: "none",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  },
  button: {
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
  },
  socialButton: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 20px",
    background: "white",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    minWidth: "160px",
  },
};

const socialProviders = [
  { icon: google, name: "Google" },
  { icon: github, name: "Github" },
  { icon: apple, name: "Apple" },
];

export default function AuthForm({ type }) {
  const isRegister = type === "register";

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <form style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={styles.field}>
            <label htmlFor="username" style={styles.label}>Username</label>
            <input type="text" id="username" placeholder="Enter your username" style={styles.input} />
          </div>

          {isRegister && (
            <div style={styles.field}>
              <label htmlFor="email" style={styles.label}>Email</label>
              <input type="email" id="email" placeholder="example@email.com" style={styles.input} />
            </div>
          )}

          <div style={styles.field}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input type="password" id="password" placeholder="Enter your password" style={styles.input} />
          </div>

          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => e.currentTarget.style.background = "#4f5846"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#626D58"}
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center",
          borderLeft: "2px solid #88c576",
          paddingLeft: "3rem"
        }}>
          <h3 style={{ 
            fontSize: "1.1rem", 
            color: "#2d3748", 
            margin: "0 0 1.5rem 0",
            fontWeight: "600"
          }}>
            Or continue with
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {socialProviders.map(({ icon, name }) => (
              <div
                key={name}
                style={styles.socialButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateX(4px)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
                }}
              >
                <img src={icon} alt={name} style={{ width: "24px", height: "24px" }} />
                <p style={{ fontSize: "15px", color: "#374151", margin: 0, fontWeight: "500" }}>{name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}