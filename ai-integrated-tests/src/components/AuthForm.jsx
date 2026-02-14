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
    flexDirection: "column",
    gap: "1.5rem",
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
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    padding: "14px 18px",
    background: "white",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  },
};

const socialProviders = [
  { icon: google, name: "Google" },
  { icon: github, name: "Github" },
  { icon: apple, name: "Apple" },
];

export default function AuthForm({ type, onSubmit, loading }) {
  const isRegister = type === "register";

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={styles.field}>
            <label htmlFor="username" style={styles.label}>Username</label>
            <input 
              type="text" 
              id="username" 
              name="username"
              placeholder="Enter your username" 
              style={styles.input}
              required
            />
          </div>

          {isRegister && (
            <div style={styles.field}>
              <label htmlFor="email" style={styles.label}>Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                placeholder="example@email.com" 
                style={styles.input}
                required
              />
            </div>
          )}

          <div style={styles.field}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              placeholder="Enter your password" 
              style={styles.input}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer"
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.background = "#4f5846")}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.background = "#626D58")}
          >
            {loading ? "Loading..." : (isRegister ? "Register" : "Login")}
          </button>
        </form>

        <div style={{ marginTop: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ flex: 1, height: "1px", background: "#88c576" }} />
            <h2 style={{ textAlign: "center", color: "#4a5568", fontSize: "0.95rem", fontWeight: "500", margin: 0 }}>
              Or, sign {isRegister ? "up" : "in"} with
            </h2>
            <div style={{ flex: 1, height: "1px", background: "#88c576" }} />
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            {socialProviders.map(({ icon, name }) => (
              <div
                key={name}
                style={styles.socialButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
                }}
              >
                <img src={icon} alt={name} style={{ width: "28px", height: "28px" }} />
                <p style={{ fontSize: "13px", color: "#374151", margin: 0, fontWeight: "500" }}>{name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}