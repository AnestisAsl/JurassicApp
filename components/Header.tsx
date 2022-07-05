import Link from "next/link";
import { GiDinosaurRex } from "react-icons/gi";
const Header = () => {
  return (
    <div className="font-MontserratAlternates text-2xl text-base  bg-emerald-400 flex flex-row items-center justify-center">
      <GiDinosaurRex className="mr-auto mx-4" size={32} />
      <button className="mx-4">
        <Link href="/">Home</Link>
      </button>
      <button className="mx-4">
        <Link href="/fossilsMap">Fossils</Link>
      </button>
      <button className="mx-4">
        <Link href="/charts">Charts</Link>
      </button>
      <button className="mx-4">
        <Link href="/about">About</Link>
      </button>
      <button className="mx-4">
        <Link href="/">Change theme</Link>
      </button>
    </div>
  );
};

export default Header;
