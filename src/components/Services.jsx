import { useEffect, useState } from "react";
const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

export default function Services() {
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch(`${SERVER}/services`)
      .then((res) => res.json())
      .then(({ data }) => setServices(data));
  }, []);
  return (
    <div>
      <h1>Services</h1>
      <p>{JSON.stringify(services)}</p>
    </div>
  );
}
