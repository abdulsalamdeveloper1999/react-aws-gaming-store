import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        justifyItems: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <button
        style={{
          border: "none",
          height: "30px",
          borderRadius: "8px",
          backgroundColor: "#9333E9",
          color: "white",
        }}
        onClick={() => navigate("/admin")}
      >
        Go to Admin
      </button>
      <button
        style={{
          border: "none",
          height: "30px",
          borderRadius: "8px",
          backgroundColor: "#9333E9",
          color: "white",
        }}
        onClick={() => navigate("/user")}
      >
        Go to User
      </button>
    </div>
  );
}

export default Home;
