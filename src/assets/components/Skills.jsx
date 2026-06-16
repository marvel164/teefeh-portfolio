"use client";
import { BarChart3, Wrench } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Skills = () => {
  return (
    <div id="skills">
      <section className="bg-[#FEDDDC] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Badge */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInUp}
            className="flex justify-center"
          >
            <span className="inline-flex items-center px-5 py-2 rounded-full bg-white text-[#E31616] text-xs font-semibold uppercase tracking-wider shadow-sm">
              Expertise
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-center mt-8"
          >
            <span className="font-serif text-[#E31616] text-2xl md:text-3xl lg:text-5xl font-bold">
              Technical Skills
            </span>
            <br />
            <span className="max-w-4xl hidden md:block lg:block mx-auto mt-6 text-[#252525] text-sm leading-8">
              I leverage a core set of analytical and visualization tools built
              around Power BI, SQL and Excel to analyze <br />
              complex data, model business performance, and deliver insights
              that drive real decisions.
            </span>
            <span className="max-w-4xl block md:hidden lg:hidden mx-auto mt-6 text-[#252525] text-sm leading-8">
              I leverage a core set of analytical and visualization tools built
              around Power BI, SQL and Excel to analyze complex data, model
              business performance, and deliver insights that drive real
              decisions.
            </span>
          </motion.div>

          {/* Skills Cards */}
          <div className="grid lg:grid-cols-2 gap-8 mt-20">
            {/* Data Analysis & Visualization */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
              className="bg-[#F7F6EC] rounded-3xl p-8 md:p-10 shadow-sm border border-[#EFEFEF]"
            >
              {/* Icon */}
              <div className="w-11 h-11 md:w-16 md:h-16 lg:w-16 lg:h-16 rounded-2xl bg-[#FF1717] flex items-center justify-center shadow-lg">
                <BarChart3 size={25} className="text-white" />
              </div>
              <br />
              {/* Title */}
              <span className="mt-8 text-[#D52B2B] text-md md:text-3xl lg:text-3xl font-bold">
                Data Analysis & Visualization
              </span>

              {/* Tags */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-2 mt-8"
              >
                {[
                  "SQL",
                  "Python",
                  "Excel",
                  "DAX",
                  "Power Query",
                  "Power BI",
                  "Power BI Service",
                  "Statistical Analysis",
                  "Data Modeling",
                  "Report Automation",
                ].map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-2 bg-white border border-[#ECECEC] rounded-xl text-xs font-medium text-[#444444] shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Tools & Technologies */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeInUp}
              transition={{ delay: 0.5 }}
              className="bg-[#F7F6EC] rounded-3xl p-8 md:p-10 shadow-sm border border-[#EFEFEF]"
            >
              {/* Icon */}
              <div className="w-11 h-11 md:w-16 md:h-16 lg:w-16 lg:h-16 rounded-2xl bg-[#FF1717] flex items-center justify-center shadow-lg">
                <Wrench size={25} className="text-white" />
              </div>

              <br />
              {/* Title */}
              <span className="mt-8 text-[#D52B2B] text-md md:text-3xl lg:text-3xl font-bold">
                Tools & Technologies
              </span>

              {/* Tags */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-2 mt-8"
              >
                {[
                  "Microsoft Excel (Advanced)",
                  "ETL & Data Cleaning",
                  "Power BI Desktop",
                  "Power Query",
                ].map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-2 bg-white border border-[#ECECEC] rounded-xl text-xs font-medium text-[#444444] shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;
