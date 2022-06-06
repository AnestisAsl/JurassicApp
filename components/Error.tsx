import { GiTripleClaws } from "react-icons/gi";

const Error = (props: any) => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1>Oops, Dinosaurs got extinct. </h1>
      <h2>{props.error.message}</h2>
      <GiTripleClaws className="animate-bounce" size={64} color={"red"} />
    </div>
  );
};

export default Error;
