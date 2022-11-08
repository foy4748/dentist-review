//import { Link } from "react-router-dom";
export default function ServiceCard({ details }) {
  const { title, price, img, description, _id } = details;
  return (
    <div className="d-flex flex-column justify-content-between min-card-height border rounded">
      <picture>
        <img src={img} alt="" className="cardImg" />
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
      <button className="cardBtn"> Read More </button>
    </div>
  );
}

/*
 *
      <Link to={`/sercies/${_id}`}>

      </Link>
 *
*/
