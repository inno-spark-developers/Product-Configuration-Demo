import {
  ContactShadows,
  Environment,
  Fisheye,
  Lightformer,
  MeshReflectorMaterial,
  OrbitControls,
  PerspectiveCamera,
  PresentationControls,
  Stage,
} from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Lamborghini } from "../Lamborghini";
import Lambo from "./Lambo";
import { useControls } from "leva";
import * as THREE from "three";
import { Perf } from "r3f-perf";
import { useCustomization } from "../context/CustomizationContext";

const Experience = () => {
  const { setMaterial } = useCustomization();

  const { mapping, exposure, color } = useControls({
    exposure: { value: 0.29, min: 0, max: 4 },
    mapping: {
      value: "Cineon",
      options: [
        "No",
        "Linear",
        "AgX",
        "ACESFilmic",
        "Reinhard",
        "Cineon",
        "Custom",
      ],
    },
    color: {
      value: "red",
      options: ["red", "yellow", "blue", "green", "purple", "pink", "teal"],
    },
  });

  setMaterial(color);

  return (
    // <PresentationControls
    //   speed={1.5}
    //   global
    //   zoom={0.7}
    //   polar={[-0.1, Math.PI / 4]}
    // >
    //   <Stage environment={"studio"} intensity={0.6} contactShadow={false}>
    //     <Suspense fallback={null}>
    //       <Lambo  rotation={[0, -Math.PI / 2,  0]} position={[0,0,-1]} scale={0.016} />
    //     </Suspense>
    //   </Stage>

    //   <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.16, 0]}>
    //     <planeGeometry args={[170, 170]} />
    //     <MeshReflectorMaterial
    //       blur={[300, 100]}
    //       resolution={2048}
    //       mixBlur={1}
    //       mixStrength={40}
    //       roughness={1}
    //       depthScale={1.2}
    //       minDepthThreshold={0.4}
    //       maxDepthThreshold={1.4}
    //       color="#101010"
    //       metalness={0.5}
    //     />
    //   </mesh>
    //   <mesh scale={4} position={[3, -1.159, -1.5]} rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}>
    //     <ringGeometry args={[0.9, 1, 4, 1]} />
    //     <meshStandardMaterial color="white" roughness={0.75} />
    //   </mesh>
    //   <mesh scale={4} position={[-3, -1.159, -1]} rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}>
    //     <ringGeometry args={[0.9, 1, 3, 1]} />
    //     <meshStandardMaterial color="white" roughness={0.75} />
    //   </mesh>

    // </PresentationControls>
    <>
      <Fisheye resolution={768} zoom={0.25}>
        <Environment
          files="/old_depot_2k.hdr"
          ground={{ height: 35, radius: 1000, scale: 200 }}
        />
        <Lambo position={[-8, 0, -2]} scale={0.2} rotation-y={-Math.PI / 4} />
        <ContactShadows
          renderOrder={2}
          frames={1}
          resolution={1024}
          scale={120}
          blur={2}
          opacity={0.6}
          far={100}
        />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.25}
          makeDefault
        />
        <PerspectiveCamera makeDefault position={[45, 45, 10]} fov={100} />
      </Fisheye>
      <Tone mapping={mapping} exposure={exposure} />
      {/* <Perf /> */}
    </>
  );
};

function Tone({ mapping, exposure }) {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const prevFrag = THREE.ShaderChunk.tonemapping_pars_fragment;
    const prevTonemapping = gl.toneMapping;
    const prevTonemappingExp = gl.toneMappingExposure;
    // Model viewers "commerce" tone mapping
    // https://github.com/google/model-viewer/blob/master/packages/model-viewer/src/three-components/Renderer.ts#L141
    THREE.ShaderChunk.tonemapping_pars_fragment =
      THREE.ShaderChunk.tonemapping_pars_fragment.replace(
        "vec3 CustomToneMapping( vec3 color ) { return color; }",
        `float startCompression = 0.8 - 0.04;
       float desaturation = 0.15;
       vec3 CustomToneMapping( vec3 color ) {
         color *= toneMappingExposure;
         float x = min(color.r, min(color.g, color.b));
         float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
         color -= offset;
         float peak = max(color.r, max(color.g, color.b));
         if (peak < startCompression) return color;
         float d = 1. - startCompression;
         float newPeak = 1. - d * d / (peak + d - startCompression);
         color *= newPeak / peak;
         float g = 1. - 1. / (desaturation * (peak - newPeak) + 1.);
         return mix(color, vec3(1, 1, 1), g);
       }`
      );
    gl.toneMapping = THREE[mapping + "ToneMapping"];
    gl.toneMappingExposure = exposure;
    return () => {
      // Retore on unmount or data change
      gl.toneMapping = prevTonemapping;
      gl.toneMappingExposure = prevTonemappingExp;
      THREE.ShaderChunk.tonemapping_pars_fragment = prevFrag;
    };
  }, [mapping, exposure]);
}

export default Experience;
