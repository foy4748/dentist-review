import StarRatings from "react-star-ratings";
import moment from "moment";
import styles from "./Comment.module.css";

export default function Comment({ details }) {
  const { displayName, review, rating, email, time, photoURL } = details;
  return (
    <div className={styles.comment}>
      <picture>
        {photoURL ? (
          <img
            src={photoURL}
            alt={displayName}
            referrerPolicy="no-referrer"
            className="userReviewIcon mb-3"
          />
        ) : (
          <img
            src="https://image.shutterstock.com/image-vector/man-icon-vector-600w-1040084344.jpg"
            alt="noimage"
            className="userReviewIcon mb-3"
          />
        )}
      </picture>
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
