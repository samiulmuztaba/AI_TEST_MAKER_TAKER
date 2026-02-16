import { Link } from "react-router";

export default function LandingPage() {
  return (
    <div style={{display: 'flex', gap: "1rem", flexDirection: 'column', margin: "40px 80px"}}>
      <h2>
        Do you know why you are here? Because you haven't signed up or aren't
        logged in. This site is under construction next time in the same
        condition, I hope you will see a beautiful landing page!
      </h2>
      <div style={{display: 'flex', gap: "1rem"}}>
      <Link to="/login">Login</Link>
      <Link to="/signup">New? REgister</Link></div>
    </div>
  );
}
