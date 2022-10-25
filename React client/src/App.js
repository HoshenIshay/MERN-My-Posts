import './App.css';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import welcomeImg from './img/Welcome.png'


function App() {

  const navigate = useNavigate();

  return (
    <div style={{ width: "90%", margin: "auto auto" , textAlign: "center"}}>
      <h1 style={ {marginTop: "1rem" }}>My Posts App</h1>
      <img src={welcomeImg} alt="welcomeImg" />
      <Button
      variant="outline-dark"
      style={{ width: "100%" , marginBottom: "1rem"}} 
      onClick={() => navigate("create")}>
      NEW POST
      </Button>
      <Button
      variant="outline-dark"
      style={{ width: "100%" , marginBottom: "1rem"}} 
      onClick={() => navigate("/create/posts")}>
      POSTS
      </Button>
    </div>
  );
}

export default App;
