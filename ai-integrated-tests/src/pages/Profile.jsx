// import { useEffect, useState } from "react";
// import { api } from "../api/client";
// import { useParams } from "react-router";

// export default function Profile() {
//   const { user_id: user_id } = useParams();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const user_from_api = await api.getUserById(user_id);
//         setUser(user_from_api);
//       } catch (err) {
//         console.log(err.message);
//       }
//     };
//     getUser();
//   }, [user_id]);
//   if (!user) return (
//     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontFamily: "Irish Grover", fontSize: "2rem" }}>
//       Loading...
//     </div>
//   );
//   return (
//   <div style={{
//     background: '#FFF3CF',
//   }}><div
//         style={{
//           alignItems: "center",
//           justifyContent: "center",
//           width: "40px",
//           height: "40px",
//           display: "flex",
//           alignSelf: "right",
//           cursor: "pointer",
//           position: "absolute",
//           top: "30px",
//           right: "80px",
//           fontFamily: "Irish Grover",
//           gap: "20px",
//           color: 'black'
//         }}
//       >
//         <div
//           style={{
//             background: "#626D58",
//             border: "none",
//             borderRadius: "50%",
//             width: "40px",
//             height: "40px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             color: "#FFF3CF",
//             fontSize: "1.1rem",
//             flexShrink: 0,
//           }}
//         >
//           {user.username[0].toUpperCase()}
//         </div>
//         <h2>{user.username}</h2>
//       </div>
//   </div>);
// }


import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useParams } from "react-router";
import CancelCross from "../components/CancelCross";

const TOPIC_LABELS = {
  tag_questions:      "Tag Questions",
  gap_filling:        "Gap Filling",
  substitution_table: "Substitution Table",
  right_form_verbs:   "Right Form of Verbs",
};

function ScoreBar({ score }) {
  const color = score >= 80 ? "#626D58" : score >= 60 ? "#C7C369" : "#F5745D";
  return (
    <div style={{ width: "100%", background: "#e8ddb5", borderRadius: "999px", height: "10px", overflow: "hidden" }}>
      <div style={{
        width: `${score}%`,
        height: "100%",
        background: color,
        borderRadius: "999px",
        transition: "width 0.8s ease",
      }} />
    </div>
  );
}

function ScoreCircle({ score }) {
  const color = score >= 80 ? "#626D58" : score >= 60 ? "#C7C369" : "#F5745D";
  const r = 45;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r={r} fill="none" stroke="#e8ddb5" strokeWidth="10" />
      <circle
        cx="60" cy="60" r={r} fill="none"
        stroke={color} strokeWidth="10"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 60 60)"
        style={{ transition: "stroke-dasharray 1s ease" }}
      />
      <text x="60" y="55" textAnchor="middle" fontFamily="Irish Grover" fontSize="20" fill="#333">{Math.round(score)}</text>
      <text x="60" y="72" textAnchor="middle" fontFamily="Indie Flower" fontSize="11" fill="#666">overall</text>
    </svg>
  );
}

export default function Profile() {
  const { user_id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await api.getUserById(user_id);
        setUser(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getUser();
  }, [user_id]);

  if (!user) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontFamily: "Irish Grover", fontSize: "2rem", background: "#FFF3CF" }}>
      Loading...
    </div>
  );

  const skills = user.skills || {}
  const user_email = user.email 
  const joinedDate  = new Date(user.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  return (
    <div>
        
    </div>
  )
}