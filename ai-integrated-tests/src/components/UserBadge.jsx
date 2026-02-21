import { Link } from "react-router";

export default function UserBadge({ haveToDealWithCross = false }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const first_word = user.username[0].toUpperCase();
  return (
    <Link to={`/user/${user.id}`}>
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          display: "flex",
          alignSelf: "right",
          cursor: "pointer",
          position: "absolute",
          ...(haveToDealWithCross ? { left: "80px" } : { right: "80px" }),
          top: "30px",
          fontFamily: "Irish Grover",
          gap: "20px",
          color: "black",
        }}
      >
        <div
          style={{
            background: "#626D58",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFF3CF",
            fontSize: "1.1rem",
            flexShrink: 0,
          }}
        >
          {first_word}
        </div>
        <h2>{user.username}</h2>
      </div>
    </Link>
  );
}
