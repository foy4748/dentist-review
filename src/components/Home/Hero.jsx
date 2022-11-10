export default function Hero() {
  return (
    <>
      <section className="d-md-flex w-100 border rounded">
        <aside className="w-100">
          <picture>
            <img
              src="/Dental Implants.jpg"
              className="img img-fluid rounded"
              alt="Root Canal"
            />
          </picture>
        </aside>
        <aside className=" w-100 d-flex align-items-center">
          <div className="p-5">
            <h1>Dental Implants</h1>
            <p className="text-justify">
              A dental implant is an artificial dental root which provides an
              anchor point for the artificial tooth or crown. It is usually done
              to treat the tooth decay or tooth erosion. It is a costly
              procedure, but It provides a firm base of the tooth. Dental
              implants are also inserted on the side edges to provide anchor
              points to the dental bridge. If you are missing any single tooth
              or multiple teeth, you should also consider professional dental
              implant services.
            </p>
          </div>
        </aside>
      </section>
      <section className="mt-5 d-md-flex flex-row-reverse w-100 border rounded">
        <aside className="w-100">
          <picture>
            <img
              src="/Braces Procedures.jpg"
              className="img img-fluid rounded"
              alt="Root Canal"
            />
          </picture>
        </aside>
        <aside className=" w-100 d-flex align-items-center">
          <div className="p-5">
            <h1>Braces Implant</h1>
            <p className="text-justify">
              Braces procedure is among those types of dental services, that are
              related to orthodontics. Braces consist of a metallic wire and the
              rubber bands, which is worn upon teeth for some months to get
              proper alignment of the teeth. This wire and brackets against the
              teeth to put pressure upon teeth to move towards a proper fixed
              position. There are many kinds of braces available having
              different brackets. Children prefer the colored ones.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
