const FossilsDetailsAtImage = (props: any) => {
  return (
    <div className="absolute text-white">
      {props.fossils.map((fossil: any) => {
        if (fossil.location === props.continent) {
          return (
            <li key={fossil.id}>
              At {fossil.date} from {fossil.paleontologists}
            </li>
          );
        }
      })}
    </div>
  );
};

export default FossilsDetailsAtImage;
