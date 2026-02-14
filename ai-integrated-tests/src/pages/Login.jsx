import { useState } from "react";
import { useNavigate } from "react-router";
import CancelCross from "../components/CancelCross";
import Titles from "../components/Titles";
import AuthForm from "../components/AuthForm";
import { api } from "../api/client";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const response = await api.loginUser(username, password);
      console.log("Login successful:", response);
      // Store user data and redirect
      localStorage.setItem("user", JSON.stringify(response));
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingBottom: "10rem" }}>
      <Titles title={"Login"} margin={true} />
      <CancelCross />
      
      {error && (
        <div style={{
          textAlign: "center",
          marginTop: "2rem",
          color: "#F5745D",
          fontFamily: "Indie Flower",
          fontSize: "1.1rem"
        }}>
          {error}
        </div>
      )}
      
      <AuthForm type="login" onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}