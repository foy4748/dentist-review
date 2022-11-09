import { useEffect, useState, useContext } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { userContext, auth } from "../../Contexts/AuthContext.jsx";
import StarRatings from "react-star-ratings";

import styles from "./ServiceDetails.module.css";

import Loader from "../Shared/Loader";
import Comment from "./Comment";

import { PhotoView, PhotoProvider } from "react-photo-view";
import toast from "react-hot-toast";

import { Form, Container } from "react-bootstrap";

const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;
const AppName = import.meta.env.VITE_AppName;

export default function ServiceDetails() {
  const { authLoading } = useContext(userContext);
  const [service, setService] = useState({});
  const [reviews, setReviews] = useState({});
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const location = useLocation();
  const { id } = useParams();

  // Form Values
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    fetch(`${SERVER}/service/${id}`)
      .then((res) => res.json())
      .then(({ data }) => {
        window.document.title = `Service || ${data?.title}`;
        setService(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));

    const options = {
      headers: {
        "Content-Type": "application/json",
        service_id: id,
      },
    };

    fetch(`${SERVER}/comments`, options)
      .then((res) => res.json())
      .then(({ data }) => {
        setReviews(data);
        setLoading2(false);
      })
      .catch((error) => console.error(error));
  }, []);

  if (loading || authLoading) {
    return <Loader />;
  }

  // Handle Review Submit
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setLoading2(true);
    const authtoken = localStorage.getItem("authtoken");
    try {
      const { displayName, email } = auth.currentUser;
      const payload = {
        rating,
        review,
        email,
        displayName,
        time: new Date(),
        service_title: service.title,
      };
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
      if (!result.error) {
        toast.success("Successfully Posted Review");
        const newItem = { ...payload, _id: result.insertedId };
        const newSet = [newItem, ...reviews];
        setReview("");
        setRating(5);
        setLoading2(false);
        setReviews(newSet);
      } else {
        setLoading2(false);
        toast.error("FAILED to post review");
        console.error(result);
      }
    } catch (error) {
      console.error(error);
      setLoading2(false);
      toast.error("FAILED to post review");
    }
  };

  const changeRating = (newRating) => {
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
          name="review"
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
      <Container>
        <div>
          <h1 className="d-block d-lg-none">{title}</h1>
          <div className="d-lg-flex border">
            <picture className="d-flex justify-content-center align-items-center p-0">
              <PhotoProvider>
                <PhotoView src={img}>
                  <img src={img} alt={title} className="detailsImg" />
                </PhotoView>
              </PhotoProvider>
            </picture>
            <section className="d-flex align-items-center px-5 mt-4">
              <div>
                <h1 className="d-none d-lg-block">{title}</h1>
                <h2>Price: $ {price}</h2>
                <h2>Description</h2>
                <p className="text-justify">{description}</p>
              </div>
            </section>
          </div>
        </div>
      </Container>
      {/* Non FUNCTIONAL COMPONENT*/}
      <Container className="mt-5">
        <h1>Reviews</h1>
        <div>
          <div className="form-container">
            <h2>Add Review </h2>
            {!auth.currentUser && loginJSX}
            {auth.currentUser && formJSX}
          </div>
          <div>
            {loading2 ? (
              <Loader />
            ) : (
              <div className={styles.commentContainer}>
                {" "}
                {reviews.map((item) => (
                  <Comment key={item._id} details={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
