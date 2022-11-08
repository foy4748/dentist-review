import { useEffect, useState, useContext } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { userContext, auth } from "../../Contexts/AuthContext.jsx";
import StarRatings from "react-star-ratings";

import Loader from "../Shared/Loader";

import { Form } from "react-bootstrap";

const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

const authtoken = localStorage.getItem("authtoken");

export default function ServiceDetails() {
  const { authLoading } = useContext(userContext);
  const [service, setService] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { id } = useParams();

  // Form Values
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    fetch(`${SERVER}/service/${id}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setService(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  if (loading || authLoading) {
    return <Loader />;
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const { displayName, email } = auth.currentUser;
    const payload = { rating, review, email, displayName, time: new Date() };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        service_id: id,
        authtoken,
      },
      body: JSON.stringify(payload),
    };

    const res = await fetch(`${SERVER}/comments`, options);
    const result = await res.json();
    console.log(result);
  };

  const changeRating = (newRating) => {
    console.log(newRating);
    setRating(newRating);
  };

  // JSX Elements for conditional rendering
  const { title, price, description, img } = service;
  const formJSX = (
    <Form onSubmit={handleReviewSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <div>
          <StarRatings
            rating={rating}
            starRatedColor="#fdff6c"
            changeRating={changeRating}
            numberOfStars={5}
            name="rating"
          />
        </div>
        <Form.Label>Enter Review</Form.Label>
        <Form.Control
          as="textarea"
          value={review}
          onChange={(e) => setReview(e.target.value)}
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
      {/* Non FUNCTIONAL COMPONENT*/}
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
      {/* Non FUNCTIONAL COMPONENT*/}
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
