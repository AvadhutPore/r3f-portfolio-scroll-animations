import { OrbitControls, useScroll } from "@react-three/drei";
import { Office } from "./Office";
import { Avatar } from "./Avatar";
import { motion } from "framer-motion-3d";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { framerMotionConfig } from "./helper";
import * as THREE from "three";
import { Projects } from "./Projects";

export const Experience = (props) => {
  const { menuOpen } = props;
  const {viewport} = useThree();
  const data = useScroll();

  const isMobile = window.innerWidth < 768;
  const responsiveRatio = viewport.width / 12;
  const officeScaleRatio = Math.max(0.5, Math.min(1.22 * responsiveRatio, 1.22));

  const [section, setSection] = useState(0);


  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();
  const cameraPositionZ = useMotionValue(0);

  useEffect(() => {
    animate(cameraPositionX, menuOpen ? 0 : 0, {
      ...framerMotionConfig
    }); 
    animate(cameraLookAtX, menuOpen ? 4 : 0, {
      ...framerMotionConfig
    }); 
    animate(cameraPositionZ, menuOpen ? 6 : 10, {
      ...framerMotionConfig
    });
  }, [menuOpen])

  const characterContainer = useRef();
  const [charAnimation, setCharAnimation] = useState("Typing");

  useEffect(() => {
    setCharAnimation("Falling");
    setTimeout(() => {
      setCharAnimation(section === 0 ? "Typing" : "Standing" );
    }, 600);
  }, [section])

  const characterGroupRef = useRef();

  useFrame((state) => {

    let curSection = Math.floor(data.scroll.current * data.pages);

    if(curSection > 3) {
      curSection = 3;
    }

    if(curSection !== section) {
      setSection(curSection);
    }

    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);
    state.camera.position.z = cameraPositionZ.get();

    // const position = new THREE.Vector3();
    if(section === 0) {
      characterContainer.current.getWorldPosition(characterGroupRef.current.position);
    }
    // console.log([position.x, position.y, position.z]);

    // const quaternion = new THREE.Quaternion();
    // characterContainer.current.getWorldQuaternion(quaternion);
    // const euler = new THREE.Euler();
    // euler.setFromQuaternion(quaternion, "XYZ");

    // console.log([euler.x, euler.y, euler.z]);
    
    
  })

  return (
    <>

      <motion.group 
        // position={[2.030898077275411, 0.40504, 2.9447891025249544]}
        ref={characterGroupRef}
        rotation={[-3.141592653589793, 0.8853981633974483, 3.141592653589793]}
        scale={[officeScaleRatio, officeScaleRatio, officeScaleRatio]}
        animate={"" + section}
        transition={{
          duration: 0.6,
        }}
        variants={{
          0: {
            scaleX: officeScaleRatio - (!isMobile ? 0.25 : 0.05),
            scaleY: officeScaleRatio - (!isMobile ? 0.25 : 0.05),
            scaleZ: officeScaleRatio - (!isMobile ? 0.25 : 0.05),
          },
          1: {
            y: -viewport.height + 0.5,
            x: isMobile ? 0.5 : 0,
            z: 7,
            rotateX: 0,
            rotateY: isMobile ? -Math.PI / 4 : 0,
            rotateZ: 0,
            scaleX: 1.3,
            scaleY: 1.3,
            scaleZ: 1.3,
          },
          2: {
            x: isMobile ? -1.4 : -2,
            y: -viewport.height * 2 + 0.5,
            z: 0,
            rotateX: 0,
            rotateY: Math.PI / 4,
            rotateZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
          },
          3: {
            y: -viewport.height * 3 + 1,
            x: 0.3,
            z: 8.5,
            rotateX: 0,
            rotateY: Math.PI / -4,
            rotateZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
          }
        }}
      >
      <Avatar animationProp={charAnimation} />
      </motion.group>
      <ambientLight intensity={1} />
      <motion.group
        position={[isMobile ? 0 : 1.6 * officeScaleRatio, isMobile ? -viewport.height / 6 : 1.8, 3]}
        scale={[officeScaleRatio, officeScaleRatio, officeScaleRatio]}
        rotation-y={-Math.PI / 4}
        animate={{
          y: isMobile ? -viewport.height / 6 : 0,
        }}
      >
        <Office section={section} />
        <group ref={characterContainer} name="Empty" position={[0.256, 0.332, -0.32]} rotation={[-Math.PI, 0.1, -Math.PI]} scale={0.802}>
        
        </group>
      </motion.group>

      {/* Avatar Skills */}

      <motion.group position={[0, -1.5, -10]} scale={1.5}
          animate={{
            z: section === 1 ? 0 : -10,
            y: section === 1 ? -viewport.height : -1.5,
          }}
      >
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />
        <group scale={[2, 2, 2]} position-y={-1.5}>
          
        </group>
      </motion.group>

      {/* Projects Section */}
      <Projects />
  
      
    </>
  );
};
