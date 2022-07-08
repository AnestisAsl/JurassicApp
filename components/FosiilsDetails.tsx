const FossilsDetails = (props: any) => {
  return (
    <div className="flex  flex-col items-center justify-center">
      <h1 className="text-2xl">{props.continent}</h1>
      {props.fossils.map((fossil: any) => {
        if (fossil.location === props.continent) {
          return (
            <div
              className="flex  flex-col items-center justify-center text-lg"
              key={fossil.id}
            >
              <li>
                At {fossil.date} the first fossil of{" "}
                {
                  props.dinosaurs.filter(
                    (dinosaur: any) => dinosaur.id === fossil.dinosaurId
                  )[0].name
                }{" "}
                was discovered by{" "}
                <span className="font-bold">{fossil.paleontologists}</span>.
              </li>
              <p>
                {
                  props.dinosaurs.filter(
                    (dinosaur: any) => dinosaur.id === fossil.dinosaurId
                  )[0].facts
                }
                .
              </p>

              <p>
                Weighted approximately{" "}
                {
                  props.dinosaurs.filter(
                    (dinosaur: any) => dinosaur.id === fossil.dinosaurId
                  )[0].weight
                }{" "}
                kgs and reached the height of{" "}
                {
                  props.dinosaurs.filter(
                    (dinosaur: any) => dinosaur.id === fossil.dinosaurId
                  )[0].height
                }{" "}
                meters.
              </p>
              <p>
                Lived in{" "}
                {
                  props.dinosaurs.filter(
                    (dinosaur: any) => dinosaur.id === fossil.dinosaurId
                  )[0].mesozoicEra
                }{" "}
                period.
              </p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default FossilsDetails;
