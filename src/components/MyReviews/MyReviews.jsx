const AppName = import.meta.env.VITE_AppName;
const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Table } from "react-bootstrap";
import toast from "react-hot-toast";

import moment from "moment";
import styles from "./MyReviews.module.css";

import Loader from "../Shared/Loader";

// Import FontAwesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";

export default function MyReview() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    window.document.title = `${AppName} || My Reviews`;
    const authtoken = localStorage.getItem("authtoken");
    const options = {
      headers: {
        "Content-Type": "application/json",
        authtoken,
      },
    };
    fetch(`${SERVER}/my-comments`, options)
      .then((res) => res.json())
      .then(({ data }) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  // Handle Review Delete
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      // Preparing data for DELETE operation
      const authtoken = localStorage.getItem("authtoken");
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authtoken,
          review_id: id,
        },
      };

      // Handling Response
      const res = await fetch(`${SERVER}/delete-comment`, options);
      const result = await res.json();
      if (!result.error) {
        const newSet = reviews.filter((item) => item._id !== id);
        setReviews(newSet);
        setLoading(false);
        toast.success("Deleted Review");
      } else {
        setLoading(false);
        console.error(result);
        toast.error("FAILED to delete review");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("FAILED to delete review");
    }
  };

  // JSX fragment
  const SingleRowJSX = ({ item, idx }) => {
    const { service_id, service_title, time, review, rating, _id } = item;
    return (
      <>
        <tr key={_id}>
          <td className="d-none d-lg-block">{idx + 1}</td>
          <td className="d-none d-lg-block">{moment(time).format("DD MMM")}</td>
          <td>
            <Link to={`/services/${service_id}`}>{service_title}</Link>
          </td>
          <td>{review}</td>
          <td>{rating}</td>
          <td>
            <FontAwesomeIcon
              title="Delete Review"
              onClick={() => handleDelete(_id)}
              icon={faCircleXmark}
              style={{
                fontSize: "1.25rem",
                color: "red",
                cursor: "pointer",
              }}
            />{" "}
          </td>
          <td>
            <Link to={`/my-reviews/${_id}`} state={{ from: location }}>
              {" "}
              <FontAwesomeIcon
                title="Edit Review"
                icon={faPenToSquare}
                style={{ fontSize: "1.25rem" }}
              />
            </Link>
          </td>
        </tr>
      </>
    );
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className={styles.myreviewContainer}>
      {reviews.length > 0 ? (
        <>
          <h1>My reviews</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="d-none d-lg-block">#</th>
                <th className="d-none d-lg-block">Date</th>
                <th>Service Name</th>
                <th>Review</th>
                <th>Rating</th>
                <th title="Delete Review">???</th>
                <th title="Edit Review">???</th>
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
          <h1>No reviews were added</h1>
        </div>
      )}
    </div>
  );
}
