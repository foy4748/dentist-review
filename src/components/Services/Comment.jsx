import StarRatings from "react-star-ratings";
import moment from "moment";
import styles from "./Comment.module.css";

export default function Comment({ details }) {
  const { displayName, review, rating, email, time } = details;
  return (
    <div className={styles.comment}>
      <h5>{displayName ? displayName : email ? email : "Annonymous"}</h5>
      <StarRatings
        rating={rating}
        starRatedColor="#fdff6c"
        numberOfStars={5}
        name="rating_reviwed"
      />
      <p className="text-justify">{review}</p>
      <p>{moment(time).fromNow()}</p>
    </div>
  );
}
