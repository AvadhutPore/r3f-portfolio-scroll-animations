import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { curProjectAtom, projects } from "./Projects";

// Section Component
const Section = (props) => {
  const { children, mobileTop } = props;

  return (
    <motion.section
      className={`
    h-screen w-screen p-8 max-w-screen-2xl mx-auto
    flex flex-col items-start
    ${mobileTop ? "justify-start md:justify-center" : "justify-center"}
    `}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

export const Interface = (props) => {
  const { menuOpen, setSection } = props;

  return (
    <div className="flex flex-col items-center w-screen">

      <AboutSection menuOpen={menuOpen} setSection={setSection} />
      <SkillsSection />
      <ProjectSecSlide />
      <ContactSection />
    </div>
  );
};

// Project Slider Section

const ProjectSecSlide = () => {

  const [curProject, setCurProject] = useAtom(curProjectAtom);

  const nextProject = () => {
    setCurProject((curProject + 1) % projects.length)
  }

  const prevProject = () => {
    setCurProject((curProject - 1 + projects.length) % projects.length)
  }

  return(
      <Section>
        <div className="flex w-full h-full gap-8 items-center justify-center">
          <button
              className="hover:text-indigo-600 transition-colors"
              onClick={prevProject}
          >
              ← Previous
          </button>
          <h2 className="text-5xl font-bold">Projects</h2>
          <button
              className="hover:text-indigo-600 transition-colors"
              onClick={nextProject}
          >
              Next →
          </button>
        </div>
      </Section>
  )
}

// About Section
const AboutSection = ({ menuOpen, setSection }) => {
  return (
    <Section mobileTop>
      <div className={`${menuOpen ? 'hidden' : ''}`}>
      <h1 className="text-4xl md:text-6xl font-extrabold leading-snug mt-8 md:mt-0">
        Hi, I'm
        <br />
        <span className="px-1 italic">Avadhut Pore</span>
      </h1>
      <motion.p
        className="text-lg text-gray-600 mt-4"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
      >
        I am a Developer and i have knowledge
        <br />
        of both Frontend and Backend Development.
      </motion.p>
      <motion.button
        onClick={() => setSection(3)}
        className={`bg-indigo-600 text-white py-4 px-8
        rounded-lg font-bold text-lg mt-5 md:mt-12
      `}
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 2,
        }}
      >
        Contact Me
      </motion.button>
      </div>
    </Section>
  );
};

// Skills Section

const skills = [
  {
    title: "Html / CSS",
    level: 85,
  },
  {
    title: "JS",
    level: 80,
  },
  {
    title: "Wordpress / React",
    level: 90,
  },
  {
    title: "3D Modelling",
    level: 40,
  },
];

const languages = [
  {
    title: "English",
    level: 80,
  },
  {
    title: "Hindi",
    level: 80,
  },
  {
    title: "Marathi",
    level: 90,
  },
];

const SkillsSection = () => {
  return (
    <Section>
      <motion.div whileInView={"visible"}>
        <h2 className="text-xl font-bold">Skills</h2>
        <div className="mt-15 space-y-4 mt-3">
          {skills.map((skill, index) => (
            <div className="w-64" key={index}>
              <motion.h3
                className="text-sm font-bold text-gray-800"
                initial={{
                  opacity: 0,
                }}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 1,
                      delay: 1 + index * 0.2,
                    },
                  },
                }}
              >
                {skill.title}
              </motion.h3>
              <div className="h-2 w-full bg-gray-200 rounded-full mt-1">
                <motion.div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${skill.level}%` }}
                  initial={{
                    scaleX: 0,
                    originX: 0,
                  }}
                  variants={{
                    visible: {
                      scaleX: 1,
                      transition: {
                        duration: 1,
                        delay: 1 + index * 0.2,
                      },
                    },
                  }}
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
        <h2 className="text-xl font-bold mt-6">Languages</h2>
        <div className="mt-3 space-y-4">
          {languages.map((lang, index) => (
            <div className="w-64" key={index}>
              <motion.h3
                className="text-sm font-bold text-gray-800"
                initial={{
                  opacity: 0,
                }}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 1,
                      delay: 2 + index * 0.2,
                    },
                  },
                }}
              >
                {lang.title}
              </motion.h3>
              <div className="h-2 w-full bg-gray-200 rounded-full mt-1">
                <motion.div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${lang.level}%` }}
                  initial={{
                    scaleX: 0,
                    originX: 0,
                  }}
                  variants={{
                    visible: {
                      scaleX: 1,
                      transition: {
                        duration: 1,
                        delay: 2 + index * 0.2,
                      },
                    },
                  }}
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

// Contact Section

const ContactSection = () => {
  return (
    <Section>
      <h2 className="text-3xl font-bold">Contact Me</h2>
      <div className="mt-8 p-8 rounded-md bg-white bg-opacity-50 w-96 max-w-full">
        <form>
          <label for="name" className="font-medium text-gray-900 block mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 p-1"
          />
          <label
            for="name"
            className="font-medium text-gray-900 block mb-1 mt-4"
          >
            Email
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 p-1"
          />
          <label
            for="name"
            className="font-medium text-gray-900 block mb-1 mt-4"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            className="h-32 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 p-1"
          />
          <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-bold mt-6">
            Submit
          </button>
        </form>
      </div>
    </Section>
  );
};
