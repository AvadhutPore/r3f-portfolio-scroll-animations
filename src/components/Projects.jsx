import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import {motion} from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
    {
        title: "Sigmoid",
        url: "https://www.sigmoid.com/",
        image: "projects/sigmoid-logo.png",
        desc: "Data Engineering &amp; AI Solutions Company | Data Analytics - Sigmoid",
    },
    {
        title: "Climetz",
        url: "https://www.climetz.in/",
        image: "projects/climetz-logo.png",
        desc: "Welcome to CLiMETZ Real-Time Data Monitoring System",
    },
    {
        title: "Entity fitness studio",
        url: "https://entityfitnessstudio.com/",
        image: "projects/entityfitness-logo.png",
        desc: "The best fitness studio in town",
    },
    {
        title: "React To Do app",
        url: "https://ap-todo-app.netlify.app/",
        image: "projects/react-logo.png",
        desc: "To Do application",
    },
    {
        title: "React Crud",
        url: "https://ap-crud-app.netlify.app/",
        image: "projects/react-logo.png",
        desc: "Student Record Management",
    },
]


// single Project Component

const Project = (props) => {
    const {project, highlighted} = props;

    const background = useRef();
    const bgOpacity = useMotionValue(0.1);

    useEffect(() => {
        animate(bgOpacity, highlighted ? 0.7 : 0.1)
    }, [highlighted])

    useFrame(() => {
        background.current.material.opacity = bgOpacity.get();
    })

    return(
        <group {...project}>
            <mesh position-z={-0.001} onClick={() => window.open(project.url, "_blank")} ref={background}>
                <planeGeometry args={[2.2, 2]} />
                <meshBasicMaterial color="black" transparent opacity={0.4} />
            </mesh>
            <Image scale={[2, 1.2, 1]} url={project.image} toneMapped={false} position-y={0.3} fit="contain" />
            <Text maxWidth={2} anchorX={"left"} anchorY={"top"} fontSize={0.2} position={[-1, -0.4, 0]}>{project.title.toUpperCase()}</Text>
            <Text maxWidth={2} anchorX={"left"} anchorY={"top"} fontSize={0.1} position={[-1, -0.7, 0]}>{project.desc}</Text>
        </group>
    )
}

export const curProjectAtom = atom(Math.floor(projects.length / 2))


export const Projects = () => {

    const {viewport} = useThree();
    const [curProject] = useAtom(curProjectAtom);

    return (
        <>
            <group position-y={-viewport.height * 2 + 1}>
                {
                    projects.map((project , i) => (
                        <motion.group key={"project_" + i} position={[i * 2.5, 0, -3]}
                            animate={{
                                x: 0 + (i - curProject) * 2.5,
                                y: curProject === i ? 0 : -0.1,
                                z: curProject === i ? -2 : -3,
                                rotateX: curProject === i ? 0 : -Math.PI / 4,
                                rotateZ: curProject === i ? 0 : -0.1 * Math.PI,
                            }}
                        >
                            <Project project={project} highlighted={i === curProject} />
                        </motion.group>
                    ))
                }
            </group>
        </>
    )
}