const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;
const authtoken = localStorage.getItem("authtoken");

import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import moment from "moment";
import toast from "react-hot-toast";

export default function MyReview() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
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
        toast.success("Delted Review");
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
          <td onClick={() => handleDelete(_id)}>(X)</td>
        </tr>
      </>
    );
  };
  return (
    <div>
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
                <th>X</th>
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
        <>
          <h1>No reviews yet</h1>
        </>
      )}
    </div>
  );
}
