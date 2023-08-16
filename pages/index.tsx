import Head from "next/head";
import Link from "next/link";
import { Parallax } from "react-scroll-parallax";
import { softShadows, useTexture, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { gql, useQuery } from "@apollo/client";
import { ParallaxBanner } from "react-scroll-parallax";
import { BannerLayer } from "react-scroll-parallax/dist/components/ParallaxBanner/types";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { useRef, Suspense } from "react";
import staticText from "../public/staticText.json";
import {
  GiDinosaurBones,
  GiAmmoniteFossil,
  GiMoonClaws,
  GiReptileTail,
  GiNeedleJaws,
  GiInsectJaws,
  GiCrocJaws,
  GiBackboneShell,
  GiSharkJaws,
  GiBeastEye,
  GiCarnivoreMouth,
  GiSharkBite,
  GiCarnivorousPlant,
} from "react-icons/gi";
softShadows();

const getDinos = gql`
  query {
    dinosaurs {
      id
      name
      height
      weight
      fossilLocation
      mesozoicEra
      facts
    }
  }
`;

const Home = () => {
  const { data, error, loading } = useQuery(getDinos);
  const isBrowser = () => typeof window !== "undefined";

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  if (loading) return <Loading />;
  if (error) return <Error error={error.message} />;

  const Sphere = ({ position, color, args, texture }: any): any => {
    const sphereTexture: any = useTexture(texture);
    const meshRef: any = useRef();
    useFrame(() => (meshRef.current.rotation.y += 0.01));

    return (
      <mesh ref={meshRef} position={position} castShadow>
        <sphereBufferGeometry attach="geometry" args={args} />
        <meshStandardMaterial
          attach="material"
          color={color}
          map={sphereTexture}
        />
      </mesh>
    );
  };

  const Plane = (): any => {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <shadowMaterial attach="material" opacity={0.3} />
      </mesh>
    );
  };

  const gradientOverlay: BannerLayer = {
    opacity: [0, 0.9],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="absolute inset-0 bg-gradient-to-t from-amber-200 via-yellow-900  to-black" />
    ),
  };
  return (
    <div className="w-full h-full flex  flex-col items-center justify-center ">
      <Head>
        <title>Home</title>
      </Head>
      <h1 className="font-MontserratAlternates text-3xl">
        {staticText.firstTitle}
      </h1>
      <h1 className="font-Montserrat  text-xl	">{staticText.secondTitle}</h1>
      <Suspense fallback={<Loading />}>
        <div className="w-screen h-screen">
          <Canvas shadows>
            <ambientLight intensity={0.5} />
            <directionalLight
              castShadow
              position={[0, 10, 0]}
              intensity={1.5}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
            />
            <group>
              <Plane />
              <Sphere
                position={[0, 1, 0]}
                color="lightblue"
                args={[1.8, 30, 30]}
                texture="/Earth.jpg"
              />
              {/* <Text3D position={[10, 1, 10]} /> */}
            </group>
            {/* <OrbitControls /> */}
          </Canvas>
        </div>
      </Suspense>

      <h1 className="font-MontserratAlternates  text-xl py-10">
        {staticText.thirdTitle}
      </h1>
      <ParallaxBanner
        layers={[
          { image: "/JurassicLandscape.jpg" },
          {
            speed: -10,
            children: (
              <div className="absolute inset-0 flex flex-row  items-center justify-center">
                <h1 className="text-8xl text-black font-thin px-10">
                  {" "}
                  {staticText.insideImageText}
                </h1>
              </div>
            ),
          },
          gradientOverlay,
        ]}
        style={{ aspectRatio: "2 / 1" }}
      ></ParallaxBanner>

      <Parallax translateY={[20, -20]} translateX={[100, -600]}>
        <div className="py-10">
          <h1 className="font-MontserratAlternates  text-xl	">
            {staticText.chartsTitle1}

            <GiMoonClaws size={128} />
          </h1>
          <h2 className="font-Montserrat  text-lg	">
            {" "}
            {staticText.chartsTitle2}
          </h2>
          <button className="font-Montserrat border-solid border-2 rounded-md border-emerald-400 p-1 hover:bg-emerald-300 cursor-pointer">
            <Link href="/charts">Charts</Link>
          </button>
        </div>
      </Parallax>
      <Parallax translateY={[20, -20]} translateX={[100, -600]}>
        <div className="py-10">
          <h1 className="font-MontserratAlternates  text-xl	">
            {staticText.fossilsTitle1}

            <GiAmmoniteFossil size={128} />
          </h1>
          <h2 className="font-Montserrat  text-lg	">
            {" "}
            {staticText.fossilsTitle2}
          </h2>
          <button className="font-Montserrat border-solid border-2 rounded-md border-emerald-400 p-1 hover:bg-emerald-300">
            <Link href="/fossilsMap">Fossils</Link>
          </button>
        </div>
      </Parallax>
      <Parallax translateY={[20, -20]} translateX={[100, -600]}>
        <div className="py-10">
          <h1 className="font-MontserratAlternates  text-xl	">
            {" "}
            {staticText.aboutTitle1}
          </h1>
          <h2 className="font-Montserrat  text-lg	">{staticText.aboutTitle2}</h2>
          <button className="font-Montserrat border-solid border-2 rounded-md border-emerald-400 p-1 hover:bg-emerald-300">
            <Link href="/about">About</Link>
          </button>
        </div>
      </Parallax>
      <h1 className="font-Montserrat  text-3xl	py-10">
        {staticText.fourthTitle}
      </h1>
      <h1 className="font-MontserratAlternates  text-xl	py-10">
        {staticText.fifthTitle}
      </h1>
      <Parallax translateX={[-300, 100]}>
        <GiDinosaurBones size={128} />
      </Parallax>
      <Parallax
        translateY={[20, -20]}
        translateX={[100, -100]}
        opacity={[0, 1.5]}
      >
        <div className="py-10">
          <h2 className="font-Montserrat  text-lg	">{staticText.causeTitle}</h2>
          <p className="font-Montserrat  text-lg">
            {staticText.causeText1}
            <br />
            {staticText.causeText2}
            <br />
            {staticText.causeText3}
            <br /> {staticText.causeText4}
          </p>
        </div>
      </Parallax>
      <Parallax scale={[0, 1.5]}>
        <h1 className="font-MontserratAlternates  text-xl	py-10">
          {staticText.mesozoicTitle}
        </h1>
      </Parallax>

      <Parallax translateX={[-300, 100]}>
        <GiReptileTail size={128} />
      </Parallax>
      <Parallax
        translateY={[20, -20]}
        translateX={[100, -100]}
        opacity={[0, 1.5]}
      >
        <div className="py-10">
          <p className="font-Montserrat  text-lg">
            {staticText.mesozoicText}
            <br /> {staticText.mesozoicText1}
            <br /> {staticText.mesozoicText2}
            <br /> {staticText.mesozoicText3}
            <br /> {staticText.mesozoicText4}
            <br />
            {staticText.mesozoicText5}
          </p>
        </div>
      </Parallax>
      <Parallax scale={[0, 1.5]}>
        <li className="font-MontserratAlternates  text-xl	">Triassic</li>
      </Parallax>

      <Parallax translateY={[20, -20]} translateX={[100, -200]}>
        <div className="py-10">
          <p className="font-Montserrat  text-lg">{staticText.triassicText}</p>
        </div>
      </Parallax>
      <Parallax scale={[0, 1.5]}>
        <li className="font-MontserratAlternates  text-xl	">Jurassic</li>
      </Parallax>

      <Parallax translateY={[20, -20]} translateX={[100, -200]}>
        <div className="py-10">
          <p className="font-Montserrat  text-lg">{staticText.jurassicText}</p>
        </div>
      </Parallax>
      <Parallax scale={[0, 1.5]}>
        <li className="font-MontserratAlternates  text-xl	">Cretaceous</li>
      </Parallax>

      <Parallax translateY={[20, -20]} translateX={[100, -200]}>
        <div className="py-10">
          <p className="font-Montserrat  text-lg">
            {staticText.cretaceousText}
          </p>
        </div>
      </Parallax>
      <Parallax scale={[0, 1.5]}>
        <h1 className="font-MontserratAlternates  text-xl	py-10">
          {staticText.weatherTitle}
        </h1>
      </Parallax>

      <Parallax translateX={[-300, 100]}>
        <GiNeedleJaws size={128} />
      </Parallax>
      <Parallax
        translateY={[20, -20]}
        translateX={[100, -100]}
        opacity={[0, 1.5]}
      >
        <div className="py-10">
          <h2 className="font-Montserrat  text-lg	">
            {staticText.weatherTitle}
          </h2>
          <p className="font-Montserrat  text-lg">
            {staticText.weatherText}
            <br />
            {staticText.weatherText1}
            <br />
            {staticText.weatherText2}
            <br />
            {staticText.weatherText3}
            <br />
          </p>
        </div>
      </Parallax>
      <Parallax scale={[0, 1.5]}>
        <h1 className="font-MontserratAlternates  text-xl	py-10">
          {staticText.oceansTitle}
        </h1>
      </Parallax>

      <Parallax translateX={[-300, 100]}>
        <GiSharkBite size={128} />
      </Parallax>
      <Parallax
        translateY={[20, -20]}
        translateX={[100, -100]}
        opacity={[0, 1.5]}
      >
        <div className="py-10">
          <h2 className="font-Montserrat  text-lg	"> {staticText.oceansText}</h2>
          <p className="font-Montserrat  text-lg">
            {staticText.oceansText1}
            <br />
            {staticText.oceansText2} <br />
            {staticText.oceansText3}
            <br />
            {staticText.oceansText4}
            <br />
            {staticText.oceansText5}
          </p>
        </div>
      </Parallax>
      <Parallax scale={[0, 1.5]}>
        <h1 className="font-MontserratAlternates  text-xl	py-10">Plants!</h1>
      </Parallax>

      <Parallax translateX={[-300, 100]}>
        <GiCarnivorousPlant size={128} />
      </Parallax>
      <Parallax
        translateY={[20, -20]}
        translateX={[100, -100]}
        opacity={[0, 1.5]}
      >
        <div className="py-10">
          <h2 className="font-Montserrat  text-lg	">Lets cover them too...</h2>
          <p className="font-Montserrat  text-lg">
            The most common theory is that an asteroid collided with the Earth
            approximately 66 million years,
            <br />
            creating the well known Chicxulub crater at Mexico. The consequences
            were devastating and in <br />
            combination with volcanic eruptions and atmospheric dust to lead in
            large scale climate and <br /> food chain changes.
          </p>
        </div>
      </Parallax>
      <Parallax scale={[0, 1.5]}>
        <h1 className="font-MontserratAlternates  text-xl	py-10">Insects!</h1>
      </Parallax>

      <Parallax translateX={[-300, 100]}>
        <GiInsectJaws size={128} />
      </Parallax>
      <Parallax
        translateY={[20, -20]}
        translateX={[100, -100]}
        opacity={[0, 1.5]}
      >
        <div className="py-10">
          <h2 className="font-Montserrat  text-lg	">I am not even kidding...</h2>
          <p className="font-Montserrat  text-lg">
            The most common theory is that an asteroid collided with the Earth
            approximately 66 million years,
            <br />
            creating the well known Chicxulub crater at Mexico. The consequences
            were devastating and in <br />
            combination with volcanic eruptions and atmospheric dust to lead in
            large scale climate and <br /> food chain changes.
          </p>
        </div>
      </Parallax>
      <Parallax translateX={[-300, 100]}>
        <GiBeastEye
          size={128}
          className="hover:fill-red-900 cursor-pointer"
          onClick={scrollToTop}
        />
      </Parallax>
      <div className="h-screen"></div>
    </div>
  );
};

export default Home;
