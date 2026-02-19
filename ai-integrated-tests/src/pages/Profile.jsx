import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useParams } from "react-router";
import CancelCross from "../components/CancelCross";

function ScoreCircle({ score }) {
  const color = score >= 80 ? "#626D58" : score >= 60 ? "#C7C369" : "#F5745D";
  const r = 45;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  return (
    <svg width="240" height="240" viewBox="0 0 120 120">
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        stroke="#e8ddb5"
        strokeWidth="10"
      />
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 60 60)"
        style={{ transition: "stroke-dasharray 1s ease" }}
      />
      <text
        x="60"
        y="55"
        textAnchor="middle"
        fontFamily="Irish Grover"
        fontSize="20"
        fill="#333"
      >
        {Math.round(score)}
      </text>
      <text
        x="60"
        y="72"
        textAnchor="middle"
        fontFamily="Indie Flower"
        fontSize="11"
        fill="#666"
      >
        overall
      </text>
    </svg>
  );
}

export default function Profile() {
  const { user_id } = useParams();
  const [user, setUser] = useState(null);
  const [tagQProgress, setTagQProgress] = useState(0)
  const [gapFillingQProgress, setGapFillingQProgress] = useState(0)
  const [SubTableQProgress, setSubTablegQProgress] = useState(0)
  const [rfvQProgress, setRfvProgress] = useState(0)

  useEffect(() => {
    const getUser = async () => {
      const data = await api.getUserById(user_id);
      setUser(data);

      // Calculate tag questions progress from skills
      const tagQPerf = data.skills?.performance?.tag_questions;
      if (tagQPerf) {
        const scores = Object.values(tagQPerf).map((p) => p.score);
        const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
        setTagQProgress(avgScore);
      }
      const subTabPerf = data.skills?.performance?.substitution_table;
      if (subTabPerf) {
        const scores = Object.values(subTabPerf).map((p) => p.score);
        const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
        setSubTablegQProgress(avgScore);
      }
      const gapFillingPerf = data.skills?.performance?.gap_filling;
      if (gapFillingPerf) {
        const scores = Math.round(Object.values(gapFillingPerf).map((p) => p.score));
        const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
        setGapFillingQProgress(avgScore);
      }
      const rvfPerf = data.skills?.performance?.right_form_verbs;
      if (rvfPerf) {
        const scores = Math.round(Object.values(rvfPerf).map((p) => p.score));
        const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
        setRfvProgress(avgScore);
      }
    };
    getUser();
  }, [user_id]);

  if (!user)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "Irish Grover",
          fontSize: "2rem",
          background: "#FFF3CF",
        }}
      >
        Loading...
      </div>
    );

  const skills = user.skills || {};
  const user_email = user.email;
  const joinedDate = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      style={{
        fontFamily: "Irish Grover",
        background: "#FFF3CF",
        paddingBottom: "100px",
        minHeight: "100vh",
      }}
    >
      <CancelCross />
      <div
        style={{
          position: "absolute",
          top: "30px",
          right: "100px",

          display: "flex",
          flexDirection: "row",
          gap: "20px",
          flexShrink: 0,
        }}
      >
        {/* Avatar */}
        <div
          style={{
            background: "#626D58",
            border: "none",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFF3CF",
            fontSize: "1.1rem",
          }}
        >
          {user.username[0].toUpperCase()}
        </div>

        {/* User Details */}
        <div>
          <h2 style={{ margin: "0" }}>{user.username}</h2>
          <p style={{ opacity: "0.7", margin: "0" }}>{user_email}</p>
          <p style={{ opacity: "0.7", margin: "0" }}>{joinedDate}</p>
        </div>
      </div>
      <h2
        style={{
          background: "#A9DC97",
          padding: "10px 20px",
          display: "inline-flex",
          marginTop: "150px",
          marginLeft: "80px",
        }}
      >
        Overall Score
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: "200px",
          paddingRight: "200px",
        }}
      >
        <ScoreCircle score={skills.overall_level} />
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexDirection: "column",
            width: "100%",
            maxWidth: "500px",
            justifyContent: "center",
            borderRadius: "20px",
            boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.1)",
            padding: "20px 40px",
            background: "#A9DC97",
          }}
        >
          {[
            { label: "Tag Questions", progress: tagQProgress },
            { label: "Gap Filling", progress: gapFillingQProgress },
            { label: "Substitution Table", progress: SubTableQProgress },
            { label: "Right Forms of Verbs", progress: rfvQProgress },
          ].map(({ label, progress }) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              {/* Progress bar */}
              <div
                style={{
                  position: "relative",
                  flex: 1,
                  height: "15px",
                  borderRadius: "10px",
                  background: "#FFFFFF",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${progress * 0.8}%`,
                    height: "100%",
                    borderRadius: "10px",
                    background: "#626D58",
                    transition: "width 0.3s ease",
                    color: "#FFF3CF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingRight: "10px",
                  }}
                >
                  <p>{progress}%</p>
                </div>
              </div>

              {/* Label */}
              <h5
                style={{
                  margin: 0,
                  fontFamily: "Indie Flower",
                  fontSize: "0.95rem",
                  whiteSpace: "nowrap",
                  minWidth: "140px",
                }}
              >
                {label}
              </h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
