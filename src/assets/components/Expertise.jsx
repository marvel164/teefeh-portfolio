"use client";
import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Expertise = () => {
  return (
    <div>
      <section className="bg-[#FEDDDC] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInUp}
            className="flex justify-center"
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-[#D52B2B] text-xs font-semibold uppercase tracking-wider shadow-sm">
              My Process
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInUp}
            className="text-center mt-6"
          >
            <span className="font-serif text-[#D52B2B] text-lg md:text-2xl lg:text-4xl font-bold">
              Core Expertise
            </span>
            <br />
            <span className="max-w-3xl mx-auto mt-3 text-[#252525] text-xs leading-6 block">
              These are the capabilities that shape how I approach data,
              combining technical analysis, business understanding, and clear
              communication to deliver actionable insights.
            </span>
          </motion.div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {[
              {
                num: "01",
                title: "Data Analysis",
                desc: "I analyze complex datasets using SQL and Excel to uncover patterns, identify trends, and generate insights that improve business performance."
              },
              {
                num: "02",
                title: "SQL & Data Management",
                desc: "I write and optimize SQL queries to extract, clean, and manage structured data across relational databases."
              },
              {
                num: "03",
                title: "Data Visualization",
                desc: "I design clear dashboards in Power BI, transforming raw data into visual stories accessible to all stakeholders."
              },
              {
                num: "04",
                title: "Leadership & Collaboration",
                desc: "I collaborate with teams and stakeholders to translate data needs into solutions and communicate insights clearly."
              },
              {
                num: "05",
                title: "Communication & Presentation",
                desc: "I translate complex findings into simple, compelling narratives for both technical and business audiences."
              },
              {
                num: "06",
                title: "Problem Solving & Analytical Thinking",
                desc: "I approach problems with a structured mindset, using data to diagnose causes and recommend practical solutions."
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ delay: i * 0.2 }}
                className="bg-[#330E0D] rounded-2xl p-6 min-h-[260px] transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-bold text-white">{card.num}</span>
                  <span className="text-white text-lg font-bold leading-tight">
                    {card.title}
                  </span>
                </div>
                <span className="text-[#D8C8C8] text-xs leading-6">
                  {card.desc}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Expertise;
