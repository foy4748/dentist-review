const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;
const AppName = import.meta.env.VITE_AppName;
import styles from "./AddService.module.css";

import { Form, Button, Container } from "react-bootstrap";

import toast from "react-hot-toast";

import Loader from "../Shared/Loader";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddService() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [photoUrl, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    window.document.title = `${AppName} || Add Service`;
    setLoading(false);
  }, []);

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title,
        description,
        price,
        img: photoUrl,
        time: new Date(),
      };
      const authtoken = localStorage.getItem("authtoken");
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authtoken,
        },
        body: JSON.stringify(payload),
      };

      const res = await fetch(`${SERVER}/services`, options);
      const result = await res.json();
      if (!result.error) {
        setLoading(false);
        setTitle("");
        setDescription("");
        setPrice(0);
        setPhotoUrl("");
        toast.success("Successfully posted a new Service");
        navigate("/services");
      } else {
        setLoading(false);
        toast.error("FAILED to post a new service");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("FAILED to post a new service");
    }
  };
  return (
    <Container>
      <Form className={styles.formContainer} onSubmit={handleServiceSubmit}>
        <h1 className="mb-3">Add a New Service</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Service Name</Form.Label>
          <Form.Control
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Service Name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
            type="text"
            as="textarea"
            rows={3}
            placeholder="Description"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Price ($)</Form.Label>
          <Form.Control
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required
            type="number"
            placeholder="Price"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhotoUrl">
          <Form.Label>Thumbnail Photo URL</Form.Label>
          <Form.Control
            onChange={(e) => setPhotoUrl(e.target.value)}
            value={photoUrl}
            required
            type="text"
            placeholder="Photo URL"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
