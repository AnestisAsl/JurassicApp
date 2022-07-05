import Link from "next/link";
import { SiFossilscm } from "react-icons/si";

const Footer = () => {
  return (
    <div className="font-MontserratAlternates text-2xl text-base bg-emerald-400 flex flex-row items-center justify-center">
      <SiFossilscm className="mr-auto mx-4" size={32} />
      <h1 className="mx-4	">
        <a href="https://github.com/AnestisAsl">github</a>
      </h1>
      <h1 className="mx-4	">
        <a href="https://github.com/AnestisAsl">Linkedin</a>
      </h1>
      <button className="mx-4	">
        <Link href="/">Back to home page</Link>
      </button>
    </div>
  );
};

export default Footer;
