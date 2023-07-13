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
import { useRef, useState, Suspense } from "react";
import { animated, useSpring, config } from "@react-spring/three";
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
  const Text3D = ({ position, color, args, texture }: any): any => {
    return (
      <mesh castShadow>
        <Text color="black" anchorX="center" anchorY="middle">
          hello world!
        </Text>
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
        Start your Jurassic Journey now!
      </h1>
      <h1 className="font-Montserrat  text-xl	">
        From the birth to the extinction.
      </h1>
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
        Covering the Age of Dinosaurs, the Mesozoic Era and its three geologic
        time periods
      </h1>
      <ParallaxBanner
        layers={[
          { image: "/JurassicLandscape.jpg" },
          {
            speed: -10,
            children: (
              <div className="absolute inset-0 flex flex-row  items-center justify-center">
                <h1 className="text-8xl text-black font-thin px-10">
                  Triassic
                </h1>
                <h1 className="text-8xl text-black font-thin px-10">
                  Jurassic
                </h1>
                <h1 className="text-8xl text-black font-thin">Cretaceous</h1>
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
            Size comparison!
            <GiMoonClaws size={64} />
          </h1>
          <h2 className="font-Montserrat  text-lg	">Detailed charts.</h2>
          <button className="font-Montserrat border-solid border-2 rounded-md border-emerald-400 p-1">
            <Link href="/charts">Charts</Link>
          </button>
        </div>
      </Parallax>
      <Parallax translateY={[20, -20]} translateX={[100, -600]}>
        <div className="py-10">
          <h1 className="font-MontserratAlternates  text-xl	">
            Fossils exploration!
            <GiAmmoniteFossil size={64} />
          </h1>
          <h2 className="font-Montserrat  text-lg	">Map.</h2>
          <button className="font-Montserrat border-solid border-2 rounded-md border-emerald-400 p-1">
            <Link href="/fossilsMap">Fossils</Link>
          </button>
        </div>
      </Parallax>
      <Parallax translateY={[20, -20]} translateX={[100, -600]}>
        <div className="py-10">
          <h1 className="font-MontserratAlternates  text-xl	">About section!</h1>
          <h2 className="font-Montserrat  text-lg	">Tech stack.</h2>
          <button className="font-Montserrat border-solid border-2 rounded-md border-emerald-400 p-1">
            <Link href="/about">About</Link>
          </button>
        </div>
      </Parallax>
      <h1 className="font-Montserrat  text-3xl	py-10">
        Prehistoric information...the boring stuff
      </h1>
      <h1 className="font-MontserratAlternates  text-xl	py-10">
        Some words about extinction!
      </h1>
      <Parallax scale={[1, 3]}>
        <GiDinosaurBones size={64} />
      </Parallax>
      <Parallax translateY={[20, -20]} translateX={[100, -100]}>
        <div className="py-10">
          <h2 className="font-Montserrat  text-lg	">
            The cause, the effect and the details.
          </h2>
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
      <h1 className="font-MontserratAlternates  text-xl	py-10">Mesozoic Era!</h1>
      <Parallax scale={[1, 3]}>
        <GiReptileTail size={64} />
      </Parallax>
      <Parallax translateY={[20, -20]} translateX={[100, -100]}>
        <div className="py-10">
          <p className="font-Montserrat  text-lg">
            Lasting from about 252 to 66 million years ago
            <br /> consist of three geological time periods listed below. <br />{" "}
            The Earth was much warmer than today and the continents
            <br /> weren't shaped yet. There was a huge variety in flora <br />{" "}
            and fauna with the huge reptiles called dinosaures to reign.
          </p>
        </div>
      </Parallax>
      <li className="font-MontserratAlternates  text-xl	">Triassic</li>
      <Parallax translateY={[20, -20]} translateX={[100, -200]}>
        <div className="py-10">
          <p className="font-Montserrat  text-lg">252-201 million years ago.</p>
        </div>
      </Parallax>
      <li className="font-MontserratAlternates  text-xl	">Jurassic</li>

      <Parallax translateY={[20, -20]} translateX={[100, -200]}>
        <div className="py-10">
          <p className="font-Montserrat  text-lg">201-145 million years ago.</p>
        </div>
      </Parallax>
      <li className="font-MontserratAlternates  text-xl	">Cretaceous</li>

      <Parallax translateY={[20, -20]} translateX={[100, -200]}>
        <div className="py-10">
          <p className="font-Montserrat  text-lg">145-66 million years ago.</p>
        </div>
      </Parallax>
      <h1 className="font-MontserratAlternates  text-xl	py-10">Weather!</h1>

      <Parallax scale={[1, 3]}>
        <GiNeedleJaws size={64} />
      </Parallax>
      <Parallax translateY={[20, -20]} translateX={[100, -100]}>
        <div className="py-10">
          <h2 className="font-Montserrat  text-lg	">Way different...</h2>
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
      <h1 className="font-MontserratAlternates  text-xl	py-10">Oceans!</h1>

      <Parallax scale={[1, 3]}>
        <GiSharkBite size={64} />
      </Parallax>
      <Parallax translateY={[20, -20]} translateX={[100, -100]}>
        <div className="py-10">
          <h2 className="font-Montserrat  text-lg	">Wouldn't swin there...</h2>
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
      <h1 className="font-MontserratAlternates  text-xl	py-10">Plants!</h1>

      <Parallax scale={[1, 3]}>
        <GiCarnivorousPlant size={64} />
      </Parallax>
      <Parallax translateY={[20, -20]} translateX={[100, -100]}>
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
      <h1 className="font-MontserratAlternates  text-xl	py-10">Insets!</h1>

      <Parallax scale={[1, 3]}>
        <GiInsectJaws size={64} />
      </Parallax>
      <Parallax translateY={[20, -20]} translateX={[100, -100]}>
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
      <Parallax scale={[1, 10]} translateY={[20, 200]}>
        <GiBeastEye
          size={64}
          className="hover:fill-red-900 cursor-pointer"
          onClick={scrollToTop}
        />
      </Parallax>
      <div className="h-screen"></div>
    </div>
  );
};

export default Home;
