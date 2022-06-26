import Head from "next/head";
import Link from "next/link";
import { Parallax } from "react-scroll-parallax";
import { OrbitControls, softShadows, useTexture } from "@react-three/drei";
import { Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { gql, useQuery } from "@apollo/client";
import { ParallaxBanner } from "react-scroll-parallax";
import { BannerLayer } from "react-scroll-parallax/dist/components/ParallaxBanner/types";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { useRef, useState } from "react";
import { animated, useSpring, config } from "@react-spring/three";

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
  const Meteor = ({ radius, texture }: any): any => {
    const meteorTexture: any = useTexture(texture);
    const meshRef: any = useRef();
    useFrame(() => (meshRef.current.rotation.y += 0.04));
    const [trigger, setTrigger] = useState(false);
    const { positionSpring } = useSpring({
      positionSpring: trigger,
      config: config.molasses,
    });
    const { positionX } = useSpring({
      positionX: positionSpring.to(
        [0, 0.25, 0.5, 0.75, 1],
        [-6, -3, -2, -1, 0]
      ),
    });
    const { positionZ } = useSpring({
      positionZ: positionSpring.to(
        [0, 0.25, 0.5, 0.75, 1],
        [-4, -1.5, -1, 0, 0]
      ),
    });
    const { positionY } = useSpring({
      positionY: positionSpring.to([0, 0.25, 0.5, 0.75, 1], [5, 3, 2, 1.5, 1]),
    });
    return (
      <animated.mesh
        position-x={positionX}
        position-y={positionY}
        position-z={positionZ}
        castShadow
        ref={meshRef}
        onClick={() => setTrigger(!trigger)}
      >
        <dodecahedronGeometry attach="geometry" args={radius} />
        <meshStandardMaterial attach="material" map={meteorTexture} />
      </animated.mesh>
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
  const Particles = (): any => {
    return (
      <mesh>
        <sphereBufferGeometry attach="geometry" args={[2, 3]} />
        <pointsMaterial attach="material" color={"red"} />
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
      <h1 className="font-MontserratAlternates">
        Start your Jurassic Journey now!
      </h1>
      <h1 className="font-Montserrat">From the birth to the extinction</h1>
      <h1>{data.dinosaurs[0].height}</h1>
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

            <Meteor radius={[1]} texture={"/JurassicLandscape.jpg"} />
            <Sphere
              position={[0, 1, 0]}
              color="lightblue"
              args={[1.8, 30, 30]}
              texture="/Earth.jpg"
            />
            {/* <Particles /> */}
          </group>
          <OrbitControls />
        </Canvas>
      </div>
      <h1>Covering all three Periods</h1>
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
      {/* <Parallax translateY={[20, -20]} translateX={[100, -100]} easing="ease">
        <div className="h-20 w-20 bg-amber-500">
          <h1>{data?.dinosaurs.map((dinosaur: any) => dinosaur.name)}</h1>
        </div>
      </Parallax>
      <Parallax translateY={[-50, 50]} translateX={[-50, 50]} easing="easeIn">
        <div className="h-20 w-20 bg-black"></div>
      </Parallax>
      <Parallax rotateX={[0, 360]} rotateY={[0, 360]}>
        <div className="h-20 w-20 bg-lime-300"></div>
      </Parallax>
      <Parallax rotateX={[0, 360]} rotateY={[0, 360]} rotateZ={[0, 360]}>
        <div className="h-20 w-20 bg-emerald-700"></div>
      </Parallax>
      <Parallax scale={[0, 1]}>
        <div className="h-20 w-20 bg-cyan-700"></div>
      </Parallax>
      <Parallax opacity={[0, 1]} easing="easeInQuad">
        <div className="h-20 w-20 bg-blue-700"></div>
      </Parallax>
      <Parallax translateY={[20, -20]} translateX={[100, -300]} easing="ease">
        <div className="h-20 w-20 bg-amber-500"></div>
      </Parallax>
      <Parallax translateY={[20, -20]} translateX={[100, -400]} easing="ease">
        <div className="h-20 w-20 bg-amber-500"></div>
      </Parallax>
      <Parallax translateY={[20, -20]} translateX={[100, -500]} easing="ease">
        <div className="h-20 w-20 bg-amber-500"></div>
      </Parallax>
      <Parallax
        translateY={[20, -20]}
        translateX={[100, -600]}
        rotateX={[0, 360]}
        rotateY={[0, 360]}
        rotateZ={[0, 360]}
      >
        <h1>ANESTIS</h1>
      </Parallax> */}
      <Parallax translateY={[20, -20]} translateX={[100, -600]}>
        <div className="py-10">
          <h1>size comparison!</h1>
          <h2>Detailed charts</h2>
        </div>
      </Parallax>
      <Parallax translateY={[20, -20]} translateX={[100, -600]}>
        <div className="py-10">
          <h1>Fossils exploration!</h1>
          <h2>MAPS</h2>
          <Link href="/fossilsMap">Fossils</Link>
        </div>
      </Parallax>
      <Parallax translateY={[20, -20]} translateX={[100, -600]}>
        <div className="py-10">
          <h1>News</h1>
          <h2>and fun facts</h2>
        </div>
      </Parallax>
      <Parallax translateY={[20, -20]} translateX={[100, -600]}>
        <div className="py-10">
          <h1>some words about extinction</h1>
        </div>
      </Parallax>
    </div>
  );
};

export default Home;
