const FossilsDetailsAtImage = (props: any) => {
  return (
    <div className="absolute text-white">
      {props.fossils.map((fossil: any) => {
        if (fossil.location === props.continent) {
          return (
            <li key={fossil.id}>
              {
                props.dinosaurs.filter(
                  (dinosaur: any) => dinosaur.id === fossil.dinosaurId
                )[0].name
              }{" "}
              at {fossil.date}
            </li>
          );
        }
      })}
    </div>
  );
};

export default FossilsDetailsAtImage;
