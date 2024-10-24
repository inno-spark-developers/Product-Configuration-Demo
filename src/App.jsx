import { Canvas } from "@react-three/fiber";

import Experience from "./components/Experience";
import Controller from "./components/Controller";
import { CustomizationProvider } from "./context/CustomizationContext";

function App() {
  return (
    <CustomizationProvider>
      <div className="app relative">
        <Canvas>
          {/* <color attach="background" args={["#15151a"]} />
          <fog attach="fog" args={["#101010", 10, 20]} /> */}
          <Experience />
          
        </Canvas>

        {/* <div className="absolute right-32 top-32">
          <Controller />
        </div> */}
      </div>
    </CustomizationProvider>
  );
}

export default App;
