import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../Shared/Loader";
export default function Banner({ services }) {
  const commonLeftPartJSX = (
    <div className="leftPart">
      <h1>Dr. Hakim</h1>
      <p>Always prepared for your dental care</p>
      <p>
        <strong>No Pain No Gain is an exception here</strong>
      </p>
      <Link to="/services">
        <button className="boder btnPrimary">Services</button>
      </Link>
    </div>
  );
  const carauselItemJSX = ({ title, _id }, idx) => {
    return (
      <Carousel.Item interval={3000} key={_id}>
        <img
          className="d-block w-100 carauselImg"
          src={`/0${idx + 1}.jpg`}
          alt={title}
        />
        <Carousel.Caption className="centeringCaption">
          <div className="d-flex justify-content-between">
            {commonLeftPartJSX}
            <div className="d-none d-lg-block rightPart">
              <h1>{title}</h1>
              <p>Best equipments along side my care.</p>
              <p>
                <strong>Practicing for 8 years</strong>
              </p>
              <Link to={`/services/${_id}`}>
                <button className="boder btnPrimary">View Details</button>
              </Link>
            </div>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    );
  };

  return (
    <Carousel className="carauselContainer">
      {services?.length > 0 &&
        services.map((item, idx) => carauselItemJSX(item, idx))}
    </Carousel>
  );
}
