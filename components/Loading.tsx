import { GiTripleClaws } from "react-icons/gi";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1>Dinosaurs are coming.</h1>
      <GiTripleClaws className="animate-spin" size={64} />
    </div>
  );
};

export default Loading;
