const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;
const AppName = import.meta.env.VITE_AppName;

import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PhotoProvider } from "react-photo-view";

import ServiceCard from "../Services/ServiceCard";
// Dumb Components
import Hero from "./Hero";
import FeatureCards from "./FeatureCards";

import { useEffect, useState } from "react";
export default function Home() {
  const [services, setServices] = useState([]);
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
        setServices(data);
      });
  });
  return (
    <div>
      <Container>
        <PhotoProvider>
          <Row xs={1} md={2} lg={3} className="g-4">
            {services &&
              services.map((item) => (
                <ServiceCard key={item._id} details={item} />
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
      <Container>
        <FeatureCards />
      </Container>
      <Container>
        <Hero />
      </Container>
    </div>
  );
}
