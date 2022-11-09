import "./App.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import welcomeImg from './img/Welcome.png'

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Home page</h1>
      <img src={welcomeImg} alt="welcomeImg" />
      <Button
        variant="outline-success"
        style={{ width: "90%" , marginBottom: "1rem" }}
        onClick={() => navigate("create")}
      >
        NEXT
      </Button>
      <Button
      variant="outline-dark"
      style={{ width: "90%" , marginBottom: "1rem"}} 
      onClick={() => navigate("/create/posts")}>
      POSTS
      </Button>
    </div>
  );
}

export default App;
