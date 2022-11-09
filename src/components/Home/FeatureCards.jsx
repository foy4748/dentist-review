import { Card } from "react-bootstrap";

export default function FeatureCards() {
  return (
    <div className="d-lg-flex">
      <Card className="bg-dark text-white m-2">
        <Card.Img
          src="https://previews.123rf.com/images/hstrongart/hstrongart1710/hstrongart171000045/88758228-dental-related-design-element-tooth-protected-by-invisible-coat-and-dna-structure-in-3d-illustration.jpg"
          alt="Card image"
          className="img featureCard"
        />
        <Card.ImgOverlay>
          <Card.Title>Protection against Germs</Card.Title>
          <Card.Text className="overflowControl">
            Fluoride is tooth enamel's best friend as it helps support the
            minerals found in enamel and fights against bacteria attacking the
            enamel. The best way to utilize fluoride on a daily basis is to use
            a fluoride-based toothpaste and mouthwash.
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
      <Card className="bg-dark text-white m-2">
        <Card.Img
          src="https://media.istockphoto.com/id/171159065/photo/beautiful-smile-with-circon.jpg?s=612x612&w=0&k=20&c=oamYwmGrahxQ50XkvgTTZU0uJRzZIzfQh3io3T98RXw="
          alt="Card image"
          className="img featureCard"
        />
        <Card.ImgOverlay>
          <Card.Title>Confident Smile is Guaranteed</Card.Title>
          <Card.Text className="overflowControl">
            Enjoy a Big Smile....! I Guaranteed for your Confident Smile. Dental
            care is one of the most overlooked matter. Please, reach me before
            its too late.
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
      <Card className="bg-dark text-white m-2">
        <Card.Img
          src="https://www.ashevilledental.com/wp-content/uploads/2018/06/Untitled-design.jpg"
          alt="Card image"
          className="img featureCard"
        />
        <Card.ImgOverlay>
          <Card.Title>Dental Product Consultations</Card.Title>
          <Card.Text className="overflowControl">
            Choosing proper dental products is very important for your oral
            health. Providing essential minerals and other germ protection is
            the key to your attractive and shining smile.
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
    </div>
  );
}
