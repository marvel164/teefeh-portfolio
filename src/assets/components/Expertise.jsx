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
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-[#E31616] text-xs font-semibold uppercase tracking-wider shadow-sm">
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
            <span className="font-serif text-[#E31616] text-lg md:text-2xl lg:text-4xl font-bold">
              Core Expertise
            </span>
            <br />
            <span className="max-w-3xl mx-auto hidden md:block lg:block mt-3 text-[#252525] text-[15px] leading-6">
              These are the capabilities that shape how I approach data,
              combining technical analysis, business <br />
              understanding, and clear communication to deliver actionable
              insights.
            </span>
            <span className="max-w-3xl mx-auto block md:hidden lg:hidden mt-3 text-[#252525] text-[15px] leading-6">
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
                desc: "I analyze complex, high-volume datasets including 10M+ record environments using SQL and Excel to uncover patterns, identify trends, and generate insights that directly improve business performance.",
              },
              {
                num: "02",
                title: "SQL & Data Management",
                desc: "I write and optimize SQL queries to extract, clean, and manage structured data across relational databases ensuring accuracy, consistency, and reliable foundations for reporting and decision-making.",
              },
              {
                num: "03",
                title: "Data Visualization",
                desc: "I design clear, interactive dashboards using Power BI, transforming raw data into visual stories that make performance trends and business insights immediately accessible to both technical and non-technical stakeholders.",
              },
              {
                num: "04",
                title: "Leadership & Collaboration",
                desc: "I collaborate with business teams, developers, and stakeholders to translate data needs into analytical solutions, communicate insights clearly, and support data-driven decision-making across the organisation.",
              },
              {
                num: "05",
                title: "Communication & Presentation",
                desc: "I translate complex data findings into simple, compelling narratives making insights accessible and actionable for both technical teams and senior business stakeholders.",
              },
              {
                num: "06",
                title: "Problem Solving & Analytical Thinking",
                desc: "I approach business problems with a structured analytical mindset using data to diagnose root causes, evaluate opportunities, and recommend practical solutions grounded in evidence.",
              },
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
                  <span className="text-3xl font-bold text-white">
                    {card.num}
                  </span>
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
