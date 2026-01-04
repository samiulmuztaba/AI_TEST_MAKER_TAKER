import { Link } from "react-router";

function CancelCross() {
  return (
    <Link to={"/"} style={{textDecoration: "none"}}>
    <div
      style={{
        background: "#626D58",
        border: "none",
        borderRadius: "50%",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        display: "flex",
        alignSelf: "right",
        cursor: "pointer",
        position: "absolute",
        top: "30px",
        right: "30px",
      }}
    >
      <p
        style={{
          color: "#FFF3CF",
          fontFamily: "Irish Grover",
          margin: "0px",
          fontSize: "1.5rem",
        }}
      >
        x
      </p>
    </div>
    </Link>
  );
}

export default CancelCross;
