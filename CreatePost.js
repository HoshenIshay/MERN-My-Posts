import React from 'react'
import { Button , Form} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";
import axios from "axios";

function CreatePost() {

  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    description: "",
    // imgUrl : ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleImgUrl = (e) => {
    let files = e.target.files;
    let reader = new FileReader();
    reader.onload = r => {
         setPost((prev) => {
          const { name } = e.target;
          return {
            ...prev,
            [name]: r.target.result,
          };
        });
     };
     console.log(post)
    reader.readAsDataURL(files[0]);
}

  const createPost = (e) => {
    e.preventDefault();
    console.log(post)
    axios
      .post("https://posts-app-by-hoshen-ishay.herokuapp.com/create", post)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

     navigate("posts");
  };

  useEffect(() => {
    console.log('Count is now: ', post);
  }, [post]);


  return (
    <div style={{ textAlign: "center", width: "90%", margin: "auto auto" }}>
      <h1>CreatePost</h1>

      <Form>
        <Form.Group>
          <Form.Control
          name="title" 
          placeholder='Title'
          value={post.title}
          onChange={handleChange}
          style={{ marginBottom: "1rem" }}/>
          <Form.Control 
          name="description" 
          placeholder='Description'
          value={post.description}
          onChange={handleChange}
          style={{ marginBottom: "1rem" }}/>
          <Form.Control
          name = "imgUrl"
          style={{ marginBottom: "1rem" }}
          accept="image/*"
          type="file"
          onChange={handleImgUrl}
          required="required"/>
        </Form.Group>

        <Button 
        variant="outline-success"
        style={{ width: "100%", marginBottom: "1rem" }}
        onClick={createPost}>
        CREATE POST 
        </Button>

      </Form>

      <Button
      variant="outline-dark"
      style={{ width: "100%" }} 
      onClick={() => navigate(-1)}>
      BACK
      </Button>
    </div>
  )
}

export default CreatePost