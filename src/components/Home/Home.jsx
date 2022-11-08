const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import ServiceCard from "../Services/ServiceCard";

import { useEffect, useState } from "react";
export default function Home() {
  const [services, setServices] = useState([]);
  useEffect(() => {
    let limit = 3;
    const options = {
      headers: {
        "Content-Type": "application/json",
        limit,
      },
    };
    fetch(`${SERVER}/services`, options)
      .then((res) => res.json())
      .then(({ data }) => {
        setServices(data);
      });
  });
  return (
    <div>
      <Container>
        <Row xs={1} md={2} lg={3} className="g-4">
          {services &&
            services.map((item) => (
              <ServiceCard key={item._id} details={item} />
            ))}
        </Row>
        <div className="d-flex justify-content-center my-5">
          <Link to="/services">
            {" "}
            <button className="btnPrimary">See All</button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
