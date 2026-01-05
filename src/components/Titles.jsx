function Titles({ title }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", }}>
      <div
        style={{
          background: "#A9DC97",
          padding: "20px 40px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            margin: "0",
            fontFamily: 'Irish Grover',
            fontSize: "2.5rem",
            textAlign: "center",
          }}
        >
          {title}
        </h1>
      </div>
    </div>
  );
}

export default Titles;
