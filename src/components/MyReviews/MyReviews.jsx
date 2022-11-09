const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import toast from "react-hot-toast";

import moment from "moment";
import styles from "./MyReviews.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
export default function MyReview() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const authtoken = localStorage.getItem("authtoken");
    const options = {
      headers: {
        "Content-Type": "application/json",
        authtoken,
      },
    };
    fetch(`${SERVER}/my-comments`, options)
      .then((res) => res.json())
      .then(({ data }) => setReviews(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const authtoken = localStorage.getItem("authtoken");
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authtoken,
          review_id: id,
        },
      };
      const res = await fetch(`${SERVER}/delete-comment`, options);
      const result = await res.json();
      if (!result.error) {
        const newSet = reviews.filter((item) => item._id !== id);
        setReviews(newSet);
        toast.success("Deleted Review");
      } else {
        toast.error("FAILED to delete review");
      }
    } catch (error) {
      console.error(error);
      toast.error("FAILED to delete review");
    }
  };

  const SingleRowJSX = ({ item, idx }) => {
    const { service_title, time, review, rating, _id } = item;
    return (
      <>
        <tr key={_id}>
          <td>{idx + 1}</td>
          <td>{moment(time).format("DD MMM")}</td>
          <td>{service_title}</td>
          <td>{review}</td>
          <td>{rating}</td>
          <td>
            <FontAwesomeIcon
              title="Delete Review"
              onClick={() => handleDelete(_id)}
              icon={faCircleXmark}
              style={{ fontSize: "1rem" }}
            />{" "}
          </td>
          <td>
            <Link to={`/my-reviews/${_id}`}>
              {" "}
              <FontAwesomeIcon
                title="Edit Review"
                icon={faPenToSquare}
                style={{ fontSize: "1rem" }}
              />
            </Link>
          </td>
        </tr>
      </>
    );
  };
  return (
    <div className={styles.myreviewContainer}>
      {reviews.length > 0 ? (
        <>
          <h1>My reviews</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Service Name</th>
                <th>Review</th>
                <th>Rating</th>
                <th title="Delete Review">❌</th>
                <th title="Edit Review">✏</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((item, idx) => (
                <SingleRowJSX key={item._id} item={item} idx={idx} />
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <div className={styles.titleContainer}>
          <h1>No reviews yet</h1>
        </div>
      )}
    </div>
  );
}
