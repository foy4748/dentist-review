const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;
const AppName = import.meta.env.VITE_AppName;

import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PhotoProvider } from "react-photo-view";

import ServiceCard from "../Services/ServiceCard";
import Loader from "../Shared/Loader";

// Dumb Components
import Banner from "./Banner";
import Hero from "./Hero";
import FeatureCards from "./FeatureCards";

import { useEffect, useState } from "react";
export default function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Requesting for 3 services
  // for Home page
  useEffect(() => {
    let limit = 3;
    window.document.title = `${AppName} || Home`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        limit,
      },
    };
    fetch(`${SERVER}/services`, options)
      .then((res) => res.json())
      .then(({ data }) => {
        setLoading(false);
        setServices(data);
      })
      .catch((error) => console.error(error));
  });

  // Loading Spinner
  // until response is received
  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Banner services={services} />
      <div className="mt-5">
        <Container>
          <h1>Latest Services</h1>
          <PhotoProvider>
            <Row xs={1} lg={3} className="g-4">
              {services &&
                services.map((item) => (
                  <Col key={item._id}>
                    <ServiceCard details={item} />
                  </Col>
                ))}
            </Row>
          </PhotoProvider>
          <div className="d-flex justify-content-center my-5">
            <Link to="/services">
              {" "}
              <button className="btnPrimary">See All</button>
            </Link>
          </div>
        </Container>
        <Container className="my-5">
          <FeatureCards />
        </Container>
        <Container className="my-5">
          <Hero />
        </Container>
      </div>
    </div>
  );
}
