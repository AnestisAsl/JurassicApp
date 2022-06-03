import Link from "next/link";

const Footer = () => {
  return (
    <div className="text-base bg-emerald-400 flex flex-row items-center justify-center">
      <h1 className="mx-4	">
        <a href="https://github.com/AnestisAsl">github</a>
      </h1>
      <h1 className="mx-4	">
        <a href="https://github.com/AnestisAsl">Linkedin</a>
      </h1>
      <button className="mx-4	">
        <Link href="/">HOME</Link>
      </button>
    </div>
  );
};

export default Footer;
