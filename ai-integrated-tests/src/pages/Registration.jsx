import { useState } from "react";
import { useNavigate } from "react-router";
import CancelCross from "../components/CancelCross";
import Titles from "../components/Titles";
import AuthForm from "../components/AuthForm";
import { api } from "../api/client";

export default function Registration() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);
    const userData = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await api.registerUser(userData);
      console.log("Registration successful:", response);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: "10rem" }}>
      <Titles title={"Registration"} margin={true} />
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
      
      <AuthForm type="register" onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}