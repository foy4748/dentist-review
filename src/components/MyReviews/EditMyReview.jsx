import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";

import toast from "react-hot-toast";
import { Form, Container } from "react-bootstrap";

import styles from "./EditMyReview.module.css";

const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;
const AppName = import.meta.env.VITE_AppName;

export default function EditMyReview() {
  const [review, setReview] = useState({});
  const { id } = useParams();

  const location = useLocation();
  const navigate = useNavigate();
  // Form Values
  const [currentReview, setCurrentReview] = useState("");
  const [currentRaing, setCurrentRating] = useState(5);

  useEffect(() => {
    window.document.title = `${AppName} || Edit Review`;
    const authtoken = localStorage.getItem("authtoken");
    const options = {
      headers: {
        "Content-Type": "application/json",
        authtoken,
      },
    };
    fetch(`${SERVER}/my-comments/${id}`, options)
      .then((res) => res.json())
      .then(({ data }) => {
        setCurrentReview(data?.review);
        setCurrentRating(data?.rating);
      })
      .catch((error) => console.error(error));
  }, []);

  const changeRating = (newRating) => {
    setCurrentRating(newRating);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const authtoken = localStorage.getItem("authtoken");
    try {
      const payload = {
        rating: currentRaing,
        review: currentReview,
        update_time: new Date(),
      };
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authtoken,
        },
        body: JSON.stringify(payload),
      };

      const res = await fetch(`${SERVER}/my-comments/${id}`, options);
      const result = await res.json();
      if (!result.error) {
        toast.success("Successfully Edited Review");
        setCurrentReview("");
        setCurrentRating(5);
        navigate(location?.state?.from || "/");
      } else {
        toast.error("FAILED to edit review");
      }
    } catch (error) {
      console.error(error);
      toast.error("FAILED to edit review");
    }
  };
  const formJSX = (
    <>
      <h1>Edit Review</h1>
      <section className={styles.formContainer}>
        <Form onSubmit={handleReviewSubmit} className={styles.editForm}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <div>
              <StarRatings
                rating={currentRaing}
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
              value={currentReview}
              onChange={(e) => setCurrentReview(e.target.value)}
              rows={3}
              placeholder="Write your opinions"
            />
          </Form.Group>
          <button type="submit" className="btnPrimary">
            Edit Review
          </button>
        </Form>
      </section>
    </>
  );

  return <div>{formJSX}</div>;
}
