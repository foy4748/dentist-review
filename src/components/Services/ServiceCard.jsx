import { Link } from "react-router-dom";
import { PhotoView } from "react-photo-view";

export default function ServiceCard({ details }) {
  const { title, price, img, description, _id } = details;
  return (
    <div className="d-flex flex-column justify-content-between min-card-height border rounded">
      <picture>
        <PhotoView src={img}>
          <img src={img} alt="" className="cardImg" />
        </PhotoView>
      </picture>
      <div className="p-3">
        <h2>{title}</h2>
        <p>
          Price: <strong>$ {price}</strong>
        </p>
        <h3>Brief</h3>
        <p className="text-justify">
          {description.length <= 100
            ? description
            : `${description.slice(0, 99)} ...`}
        </p>
      </div>
      <Link to={`/services/${_id}`}>
        <button className="cardBtn"> View Details </button>
      </Link>
    </div>
  );
}

/*
 *
      <Link to={`/sercies/${_id}`}>

      </Link>
 *
*/
