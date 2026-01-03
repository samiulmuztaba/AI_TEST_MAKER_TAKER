function Titles({ title }) {
  return (
    <div
      style={{
        background: "#A9DC97",
        padding: "20px 0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 40px auto", // Centers it and adds space below
        maxWidth: "600px", // Responsive width instead of fixed
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
  );
}

export default Titles;