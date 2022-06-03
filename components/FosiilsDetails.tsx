const FossilsDetails = (props: any) => {
  return (
    <div>
      <h1>{props.continent}</h1>
      <div>
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
    </div>
  );
};

export default FossilsDetails;
