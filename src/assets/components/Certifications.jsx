"use client";
import { motion } from "framer-motion";
import React from "react";
import Presentation from "../images/presentation.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Certifications = () => {
  return (
    <div>
      <section className="bg-[#F7F6EC] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInUp}
            className="flex justify-center"
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-[#E31616] text-xs font-semibold uppercase tracking-wider shadow-sm">
              Credentials
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-center mt-6"
          >
            <span className="font-serif text-[#E31616] text-xl md:text-2xl lg:text-4xl font-bold">
              Certifications
            </span>
            <br />
            <span className="max-w-3xl mx-auto mt-3 text-[#252525] text-xs leading-6 block">
              I'm passionate about expanding my knowledge and sharpening my
              analytical skills. These certifications are milestones in my
              journey of continuous professional development.
            </span>
          </motion.div>

          {/* Certification Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {[
              {
                year: "2023",
                title: "Diploma in Data Analytics",
                issuer: "Alt School Africa",
              },
              {
                year: "2023",
                title:
                  "Microsoft Certified: Power BI Data Analyst Associate (PL-300)",
                issuer: "Microsoft",
              },
              {
                year: "2023",
                title: "KultureHire Career Aspiration Analytics",
                issuer: "KultureHire",
              },
            ].map((cert, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ delay: i * 0.2 }}
                className="bg-[#FEDDDC] rounded-2xl overflow-hidden transition hover:-translate-y-1 hover:shadow-md"
              >
                {/* Image */}
                <div className="h-40 overflow-hidden">
                  <img
                    src={Presentation}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-3">
                    <span className="inline-flex px-3 py-1 rounded-full bg-white text-[#D52B2B] text-xs font-semibold">
                      {cert.year}
                    </span>
                  </div>
                  <span className="text-[#D52B2B] text-base font-bold leading-tight block">
                    {cert.title}
                  </span>
                  <span className="mt-1 text-[#444444] text-xs leading-6 block">
                    {cert.issuer}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Certifications;
