import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Scroll, ScrollControls } from "@react-three/drei";
import { Interface } from "./components/Interface";
import { ScrollManager } from "./components/ScrollManager";
import { useEffect, useState } from "react";
import { Menu } from "./components/Menu";
import { MotionConfig } from "framer-motion";
import { Leva } from "leva";
import { framerMotionConfig } from "./components/helper";
import { LoadingScreen } from "./components/LoadingScreen";

function App() {
  const [section, setSection] = useState(0);
  const [started, setStarted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [section]);

  return (
    <>
      <LoadingScreen started={started} setStarted={setStarted} />
      <MotionConfig transition={{
        ...framerMotionConfig
      }}>
        <Canvas shadows camera={{ position: [0, 3, 10], fov: 42 }}>
          <color attach="background" args={["#e6e7ff"]} />
          <ScrollControls pages={4} damping={0.1}>

            {/* Scroll Control Comp */}
            <ScrollManager sec={section} onSecChange={setSection} />

            {/* 3D Part */}
            <Scroll>
            <Experience section={section} menuOpen={menuOpen} />
            </Scroll>

            {/* 2D Html */}
            <Scroll html>
              <Interface menuOpen={menuOpen} setSection={setSection} />
            </Scroll>

          </ScrollControls>
        </Canvas>

        {/* Menu */}
        <Menu
          onSecChange={setSection}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      </MotionConfig>
      <Leva hidden/>
    </>
  );
}

export default App;
