"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const whyChooseBlocks = [
  {
    title: "Expertise-driven consulting",
    description:
      "We bring advanced knowledge and expertise in power systems, transmission planning, grid interconnection, and stability studies. This ensures technically sound and effective solutions tailored to client needs, leveraging deep industry experience."
  },
  {
    title: "Comprehensive power system services",
    description:
      "We offer wide-ranging consulting services from transient stability analysis to renewable energy integration planning and grid code compliance assessment. This full-spectrum capability supports utilities, industries, and developers in optimizing grid operations and investments."
  },
  {
    title: "Commitment to skill development and industry training",
    description:
      "We not only provide consulting but are dedicated to developing power systems expertise across the industry through hands-on training, professional courses, and upskilling opportunities. Clients benefit from tailored knowledge transfer, workshops, and technical resources aimed at empowering utility teams, engineers, and decision-makers to address evolving grid challenges with confidence and competence."
  }
];

const paragraphWordsContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.035
    }
  }
};

const paragraphWordVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(8px)",
    y: 6
  },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.35
    }
  }
};

export function MissionVision() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.24 });

  return (
    <section id="mission-vision" ref={sectionRef} className="relative bg-white">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 20, filter: "blur(8px)" }}
            transition={{ duration: 0.62, ease: "easeOut" }}
            className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl"
          >
            WHY CHOOSE GRIDVIDYA?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 20, filter: "blur(8px)" }}
            transition={{ duration: 0.74, delay: 0.08, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl"
          >
            Gridvidya blends deep expertise in the electrical grid (“Grid”) with a commitment to knowledge and
            learning (“Vidya”) to create tangible, measurable outcomes in the real world.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16"
        >
          {whyChooseBlocks.map((block, index) => (
            <motion.article key={block.title} className={index === 0 ? "" : "mt-12"}>
              <h3 className="mb-4 text-lg font-semibold uppercase tracking-wide text-indigo-600">{block.title}</h3>
              <motion.p
                className="max-w-4xl text-xl leading-relaxed text-slate-700"
                variants={paragraphWordsContainerVariants}
              >
                {block.description.split(" ").map((word, wordIndex) => (
                  <motion.span
                    key={`${block.title}-${word}-${wordIndex}`}
                    variants={paragraphWordVariants}
                    className="mr-[0.38rem] inline-block align-baseline will-change-transform"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
