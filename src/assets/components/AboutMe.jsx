"use client";
import React from "react";
import FullProfile from "../images/fullProfile.jpg";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Variant for image fade + scale
const fadeInImage = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const AboutMe = () => {
  return (
    <div id="about">
      <section className="bg-[#F7F6EC]">
        <div className="grid lg:grid-cols-2 min-h-screen">
          {/* Left Content */}
          <div className="flex items-center justify-center px-6 md:px-10 py-12">
            <div className="max-w-md">
              {/* Badge */}
              <motion.span
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeInUp}
                className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#dad9d9] text-[#D52B2B] text-xs font-semibold uppercase tracking-wider"
              >
                About Me
              </motion.span>

              {/* Content */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className="mt-6 space-y-4 text-[#2D2D2D] text-base leading-7"
              >
                <p>
                  I've always been curious about why things work the way they do
                  especially in business. Give me a dataset and I'll start
                  asking questions: What's driving this trend? Where's the
                  opportunity? What can be done better?
                </p>

                <p>
                  I'm <span className="font-bold">Boluwatife Akotun</span>, a{" "}
                  <span className="font-bold">Business Data Analyst</span> with
                  mid-level experience in fintech and software service
                  environments. I specialize in Power BI, SQL and Excel working
                  with high-volume data to uncover patterns, analyze customer
                  behaviour, and deliver insights that help businesses make
                  confident, informed decisions.
                </p>

                <p>
                  Outside the numbers, I'm someone who's naturally drawn to
                  continuous learning and finding smarter ways to do things. I'm
                  always exploring new tools, deepening my technical knowledge,
                  and pushing my understanding of data further because I believe
                  the best analysts never stop growing.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInImage}
            transition={{ delay: 0.4 }}
            className="relative h-[350px] lg:h-auto"
          >
            <img
              src={FullProfile}
              alt="Boluwatife Akotun"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutMe;
