"use client";
import { ArrowUpRight } from "lucide-react";
import React from "react";
import Presentation from "../images/presentation.png";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Projects = () => {
  return (
    <div>
      <section className="bg-[#F7F6EC] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInUp}
            className="flex justify-center mb-4"
          >
            <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#dad9d9] text-[#E31616] text-xs font-semibold uppercase tracking-widest">
              Projects
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInUp}
            className="text-center mb-10"
          >
            <span className="font-serif text-xl md:text-2xl lg:text-4xl font-bold uppercase text-[#E31616]">
              Project Showcase
            </span>
            <br />
            <span className="mt-2 text-xs text-[#252525]">
              Real business challenges solved through strategic data analysis
            </span>
          </motion.div>

          {/* Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mx-6">
            {[
              {
                title: "Sales Performance Analysis",
                desc: "Identified key factors behind declining revenue across regions, uncovering underperforming areas and opportunities for recovery.",
                impact: "Highlighted strategies to improve regional performance and drive growth."
              },
              {
                title: "Customer Churn Prediction",
                desc: "Analyzed customer data to identify patterns and predict churn, enabling proactive retention strategies.",
                impact: "Provided insights to reduce customer loss and improve long-term value."
              },
              {
                title: "Inventory Optimization",
                desc: "Balanced stock levels to reduce excess inventory while preventing stockouts.",
                impact: "Improved cost efficiency and ensured better product availability."
              },
              {
                title: "Marketing Campaign ROI Analysis",
                desc: "Measured effectiveness of marketing channels to identify high-performing campaigns.",
                impact: "Enabled smarter budget allocation and improved ROI."
              },
              {
                title: "Pricing Strategy Analysis",
                desc: "Optimized pricing strategies using market trends and customer behaviour.",
                impact: "Supported decisions balancing demand and revenue growth."
              },
              {
                title: "Operational Efficiency Study",
                desc: "Identified bottlenecks in fulfillment and delivery processes.",
                impact: "Improved efficiency, reduced delays, and enhanced service performance."
              }
            ].map((project, i) => (
              <motion.article
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ delay: i * 0.2 }}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={Presentation}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <span className="text-base font-bold text-[#D52B2B] mb-2 block">
                    {project.title}
                  </span>
                  <span className="text-[#252525] text-xs leading-6 block mb-2">
                    {project.desc}
                  </span>
                  <span className="text-[#252525] text-xs leading-6 block mb-3">
                    <span className="font-bold text-[#D52B2B]">Impact:</span>{" "}
                    {project.impact}
                  </span>
                  <button className="inline-flex items-center gap-2 rounded-md bg-[#FF2020] px-4 py-2 text-white text-xs font-medium transition hover:bg-[#E11D1D]">
                    View Dashboard
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
