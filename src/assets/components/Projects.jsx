"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import SalesPerformance from "../images/sales_performance.jpg";
import CustomerRetention from "../images/customer_retention.jpg";
import SupplyChain from "../images/supply_chain.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: "Sales Performance Analysis",
      image: SalesPerformance,
      desc: "Analyzed regional sales rep performance and revenue trends against quarterly targets, tracking attainment rates across 9 sales reps and 6 regions to pinpoint where deals were being won and lost.",
      impact:
        "Surfaced a 72% overall target attainment rate and identified top and bottom performing reps and regions, giving leadership a clear roadmap for coaching and resource allocation to close the ₦84M revenue gap.",
    },
    {
      title: "Customer Retention Analysis",
      image: CustomerRetention,
      desc: "Examined 18 months of subscription customer data to uncover churn drivers across subscription tiers, customer segments, and NPS categories, mapping churn patterns by region to flag high-risk markets.",
      impact:
        "Revealed a 31.8% churn rate concentrated in the Basic tier and Individual/Startup segments, enabling targeted retention campaigns that protect the ₦75K+ in customer lifetime revenue at risk.",
    },
    {
      title: "Supply Chain Analytics",
      image: SupplyChain,
      desc: "Built an executive-level view of supplier performance, logistics, and inventory health across skincare, haircare, and cosmetics product lines, consolidating defect rates, QC status, and stock levels into a single dashboard.",
      impact:
        "Flagged 14 stock alerts and 41 pending quality checks while identifying Supplier 5 as the highest defect-rate contributor, giving procurement teams the visibility needed to cut waste and improve supplier accountability.",
    },
  ];

  // Disable body scroll while modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div id="projects">
      <section className="bg-[#F7F6EC] py-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInUp}
            className="flex justify-center mb-4"
          >
            <span className="inline-flex items-center justify-center rounded-full bg-[#dad9d9] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#E31616]">
              Projects
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInUp}
            className="mb-10 text-center"
          >
            <span className="font-sans text-xl font-bold uppercase text-[#E31616] md:text-2xl lg:text-4xl">
              Project Showcase
            </span>
            <br />
            <span className="mt-2 text-xs text-[#252525]">
              Real business challenges solved through strategic data analysis
            </span>
          </motion.div>

          {/* Grid */}
          <div className="mx-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <motion.article
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ delay: i * 0.15 }}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image */}
                <div className="bg-gray-50 p-3">
                  <div
                    className="h-52 cursor-pointer overflow-hidden rounded-xl"
                    onClick={() => setSelectedProject(project)}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="mb-2 text-base font-bold text-[#D52B2B]">
                    {project.title}
                  </h3>

                  <p className="mb-2 text-xs leading-6 text-[#252525]">
                    {project.desc}
                  </p>

                  <p className="mb-4 text-xs leading-6 text-[#252525]">
                    <span className="font-bold text-[#D52B2B]">Impact:</span>{" "}
                    {project.impact}
                  </p>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-[#FF2020] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#E11D1D]"
                  >
                    View Dashboard
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MODAL ================= */}

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 z-20 cursor-pointer rounded-full bg-white p-3 shadow-lg transition hover:rotate-90 hover:bg-red-500 hover:text-white"
            >
              <X size={24} />
            </motion.button>

            {/* Image Wrapper */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 18,
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative inline-block pb-7 md:pb-8"
            >
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="max-h-[90vh] max-w-[92vw] h-auto w-auto rounded-2xl shadow-2xl object-contain"
              />

              {/* Floating Title */}
              <div className="absolute left-1/2 bottom-[-12px] md:bottom-[-14px] -translate-x-1/2 z-10">
                <div className="rounded-full bg-black/80 backdrop-blur-md px-4 py-2 md:px-5 md:py-2.5 shadow-xl border border-white/10">
                  <h3 className="whitespace-nowrap text-[10px] md:text-sm lg:text-base font-semibold text-white">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
