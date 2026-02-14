import CancelCross from "../components/CancelCross";
import Titles from "../components/Titles";
import AuthForm from "../components/AuthForm";

export default function Registration() {
  return (
    <div style={{ marginBottom: "10rem" }}>
      <Titles title={"Registration"} margin={true} />
      <CancelCross />
      <AuthForm type="register" />
    </div>
  );
}