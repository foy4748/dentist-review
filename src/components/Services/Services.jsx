import { useEffect, useState } from "react";
const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

import { Container, Row, Col } from "react-bootstrap";
import { PhotoProvider } from "react-photo-view";

import Loader from "../Shared/Loader";

import toast from "react-hot-toast";
import ServiceCard from "./ServiceCard";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Dr. Hakim || Services";

    // Fetching All Services
    try {
      fetch(`${SERVER}/services`)
        .then((res) => res.json())
        .then(({ data }) => {
          setServices(data);
          setLoading(false);
        });
    } catch (error) {
      toast.error("NETWORK ERROR");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  const serviceCardsJSX = (obj) => {
    return <ServiceCard details={obj} key={obj._id} />;
  };

  return (
    <div>
      <h1>Services</h1>
      <Container className="mt-5">
        <PhotoProvider>
          <Row xs={1} md={2} lg={3} className="g-4">
            {services || !services.error ? (
              services.map((item) => {
                return <Col key={item._id}> {serviceCardsJSX(item)}</Col>;
              })
            ) : (
              <Loader />
            )}
          </Row>
        </PhotoProvider>
      </Container>
    </div>
  );
}
