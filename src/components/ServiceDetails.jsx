import { useEffect, useState } from "react";

//import Loader from "../Shared/Loader";
import Loader from "./Loader";

const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

export default function ServiceDetails() {
  const [service, setService] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${SERVER}/service/63694a76069a6e37d0afa78a`)
      .then((res) => res.json())
      .then(({ data }) => {
        setService(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  if (loading) {
    return <Loader />;
  }

  const { title, price, description } = service;

  return (
    <div>
      <h1>ServiceDetails page</h1>
      <div>
        <h1 className="d-block d-md-none">{title}</h1>
        <div className="d-md-flex border">
          <picture className="d-flex justify-content-center align-items-center p-0">
            <img src={`/${title}.jpg`} alt={title} className="detailsImg" />
          </picture>
          <acticle className="d-flex align-items-center px-5 mt-4">
            <div>
              <h1 className="d-none d-md-block">{title}</h1>
              <h2>Price: $ {price}</h2>
              <h2>Description</h2>
              <p>{description}</p>
            </div>
          </acticle>
        </div>
      </div>
    </div>
  );
}
