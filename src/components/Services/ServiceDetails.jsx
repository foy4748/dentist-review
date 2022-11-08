import { useEffect, useState, useContext } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { userContext, auth } from "../../Contexts/AuthContext.jsx";

import Loader from "../Shared/Loader";

import { Form } from "react-bootstrap";

const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

export default function ServiceDetails() {
  const [service, setService] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    fetch(`${SERVER}/service/${id}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setService(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  if (loading) {
    return <Loader />;
  }

  const { title, price, description, img } = service;

  // JSX Elements for conditional rendering
  const formJSX = (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Enter Review</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Write your opinions"
        />
      </Form.Group>
      <button type="submit" className="btnPrimary">
        Submit Review
      </button>
    </Form>
  );
  const loginJSX = (
    <p>
      Please,
      <Link to="/login" state={{ from: location }}>
        Login
      </Link>{" "}
      to post review
    </p>
  );
  // --------------------------------------
  return (
    <>
      <section>
        <h1>ServiceDetails page</h1>
        <div>
          <h1 className="d-block d-md-none">{title}</h1>
          <div className="d-md-flex border">
            <picture className="d-flex justify-content-center align-items-center p-0">
              <img src={img} alt={title} className="detailsImg" />
            </picture>
            <section className="d-flex align-items-center px-5 mt-4">
              <div>
                <h1 className="d-none d-md-block">{title}</h1>
                <h2>Price: $ {price}</h2>
                <h2>Description</h2>
                <p>{description}</p>
              </div>
            </section>
          </div>
        </div>
      </section>
      <section>
        <h1>Reviews</h1>
        <div>
          <div className="form-container">
            <h2>Add Review </h2>
            {!auth.currentUser && loginJSX}
            {auth.currentUser && formJSX}
          </div>
        </div>
      </section>
    </>
  );
}
