import { Card } from "react-bootstrap";

export default function FeatureCards() {
  return (
    <div className="d-lg-flex">
      <Card className="bg-dark text-white">
        <Card.Img
          src="/Fix Tooth Decay.jpg"
          alt="Card image"
          className="img featureCard"
        />
        <Card.ImgOverlay>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
          <Card.Text>Last updated 3 mins ago</Card.Text>
        </Card.ImgOverlay>
      </Card>
      <Card className="bg-dark text-white">
        <Card.Img
          src="/Fix Tooth Decay.jpg"
          alt="Card image"
          className="img featureCard"
        />
        <Card.ImgOverlay>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
          <Card.Text>Last updated 3 mins ago</Card.Text>
        </Card.ImgOverlay>
      </Card>
      <Card className="bg-dark text-white">
        <Card.Img
          src="/Fix Tooth Decay.jpg"
          alt="Card image"
          className="img featureCard"
        />
        <Card.ImgOverlay>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
          <Card.Text>Last updated 3 mins ago</Card.Text>
        </Card.ImgOverlay>
      </Card>
    </div>
  );
}
