import React from 'react'
import { useState , useEffect } from "react";
import axios from "axios";
import { Button , Form , Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

function Posts() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [updatedPost, setUpdatedPost] = useState({
        id: "",
        title: "",
        description: "",
      });

    useEffect(() => {
        axios
          .get("https://posts-app-by-hoshen-ishay.herokuapp.com/posts")
          .then((res) => {
            setPosts(res.data);
          })
          .catch((err) => console.log(err));
      }, []);

      const deletePost = (id) => {
        console.log(id)
        axios
          .delete(`https://posts-app-by-hoshen-ishay.herokuapp.com/delete/${id}`)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
    
        window.location.reload();
      };

      const updatePost = (id, title, description) => {
        setUpdatedPost((prev) => {
            return {
              ...prev,
              id: id,
              title: title,
              description: description,
            };
          });
        handleShow();
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedPost((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      };

      const saveUpdatedPost = () => {
        console.log(updatedPost.id)
        console.log(updatedPost)
        axios
          .put(`https://posts-app-by-hoshen-ishay.herokuapp.com/update/${updatedPost.id}`, updatedPost)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
    
        handleClose();
        window.location.reload();
      };

  return (
    <div style={{ width: "90%", margin: "auto auto", textAlign: "center" }}>
        <h1>Posts</h1>
        <Button
        variant="outline-dark"
        style={{ width: "100%", marginBottom: "1rem" }}
        onClick={() => navigate("/create")}>
        NEW POST
      </Button>
      { !posts ? (
         <Spinner animation="border" variant="primary" />
            ) : ""}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update a post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Control
            placeholder="Title"
            name="title"
            value={updatedPost.title ? updatedPost.title : ""}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
          />
        <Form.Control
            placeholder="Description"
            name="description"
            value={updatedPost.description ? updatedPost.description : ""}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant="secondary" >
            Close
          </Button>
          <Button variant="primary" onClick={saveUpdatedPost} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        {
            posts ? (
                <>
                {
                 posts.map(post =>{
                    return (
                        <div
                         key={post._id} 
                         style={{ marginBottom: "1rem", border: "solid lightgray 1px", borderRadius: "8px" , padding: "1rem"}}>
                            <h4>{post.title}</h4>
                            <p>{post.description}</p>
                            {post.imgUrl ?  <img src={post.imgUrl} style={{ height: "150px" , marginBottom: "1rem", width: "150px" , borderRadius: "8px" }} alt={post._id}/> : ''}
                            <div  style={{ display: "flex" , flexDirection: "row" , justifyContent:"space-between"}}>
                            <Button onClick={() => updatePost(post._id, post.title, post.description)} variant="outline-info" style={{ width: "100%", marginRight: "1rem" }}>UPDATE</Button>
                            <Button onClick={() => deletePost(post._id)} variant="outline-danger" style={{ width: "100%" }}>DELETE</Button>    
                            </div>
                        </div>
                    )
                 })   
                }
                </>
            ) : ""}
    </div>
  )
}

export default Posts