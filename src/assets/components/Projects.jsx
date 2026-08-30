"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import SalesPerformance from "../images/sales_performance.jpg";
import CustomerRetention from "../images/customer_retention.jpg";
import SupplyChain from "../images/supply_chain.jpg";
import TelecomVAS from "../images/telecom_vas.jpg";
import FintechFraud from "../images/fintech_fraud.jpg";
import FMCGFinancial from "../images/fmcg_financial.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const Projects = () => {
  const projects = [
    {
      title: "Supply Chain Analytics",
      image: SupplyChain,
      desc: "Profiled and cleaned a 100-SKU beauty products dataset spanning 5 Nigerian cities and 5 suppliers. Built a full KPI report covering revenue, defect rates, supplier performance, inventory health, and logistics cost analysis across product categories.",
      impact:
        "Surfaced a critical supplier with zero inspection passes across 18 SKUs and identified 57 revenue anomalies enabling targeted supplier review and data governance action.",
      link: "https://github.com/Teefeh-dataanalyst/Supply-Chain-Analysis",
    },
    {
      title: "Customer Retention Analysis",
      image: CustomerRetention,
      desc: "Analysed 1,000 fintech subscription customers across 6 Nigerian regions to identify churn drivers including payment failures, low product engagement, and acquisition channel quality. Built an interactive Power BI dashboard with cohort-level and segment-level retention breakdowns.",
      impact:
        "Identified that Basic tier customers churn at 48.8%, nearly 9x the Enterprise rate and that payment failures carry a 0.70 correlation with churn, enabling a targeted early warning intervention strategy.",
      link: "https://github.com/Teefeh-dataanalyst/Customer-Retention-Analysis",
    },
    {
      title: "Sales Performance Dashboard",
      image: SalesPerformance,
      desc: "Built an end-to-end sales analytics solution for a Nigerian B2B technology company with 12 sales reps across 6 regions. Designed a star schema model in Excel, established Power BI relationships, and developed DAX measures covering revenue, targets, attainment rate, and rep performance grids.",
      impact:
        "Revealed that 10 of 12 reps hit their monthly target at least once reframing the narrative from team underperformance to a consistency problem, and highlighting where coaching effort should be directed.",
      link: "https://github.com/Teefeh-dataanalyst/Sales-Performance-",
    },
    {
      title: "Telecom VAS Revenue Analytics",
      image: TelecomVAS,
      desc: "Designed and populated a 4-table MySQL relational database for a VAS platform operating across 6 Nigerian regions. Wrote a 5-section SQL KPI query library covering revenue, ARPU, failure rates, service penetration, and subscriber churn behaviour. Connected Power BI directly to MySQL via SQL views.",
      impact:
        "Identified that monthly subscription services drive stronger subscriber stickiness than daily services, and that App channel subscribers renew at significantly higher rates supporting a channel prioritization recommendation.",
      link: "https://github.com/Teefeh-dataanalyst/Telecom-VAS-Revenue-Analytics",
    },
    {
      title: "Fintech Fraud Pattern Analysis",
      image: FintechFraud,
      desc: "Built a 4-table MySQL fraud analytics database from scratch and wrote advanced SQL including window functions, velocity detection via self-join, time-of-day pattern analysis, and a composite risk scoring system using weighted CASE logic. Delivered 6 SQL views connected directly to a Power BI fraud dashboard.",
      impact:
        "Uncovered that 100% of flagged transactions occurred between midnight and 05:00 through a single unverified merchant providing the foundation for a targeted real-time fraud detection rule.",
      link: "https://github.com/Teefeh-dataanalyst/Fintech-Transactions-Fraud-Analysis-Pattern",
    },
    {
      title: "FMCG Financial Performance & Budget Variance",
      image: FMCGFinancial,
      desc: "Analysed 24 months of budget vs actual financial data for a Nigerian FMCG company across 10 products, 6 regions, and 4 sales channels. Built a 5-table star schema in Excel, developed 30+ DAX measures covering revenue, gross margin, opex, net profit, variance, and YoY time intelligence, and designed a single-page financial performance dashboard.",
      impact:
        "Identified a consistent 3% revenue budget miss across both 2023 and 2024 driven by chronic underperformance in Sunlight Dish Soap and Vaseline Body Lotion pointing to a product-level commercial review rather than a broad market problem.",
      link: "https://github.com/Teefeh-dataanalyst/FMCG-Financial-Performance-Budget-Variance-Analysis",
    },
  ];

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
                  <div className="h-52 overflow-hidden rounded-xl">
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
                    <span className="font-bold text-[#D52B2B]">
                      Impact:
                    </span>{" "}
                    {project.impact}
                  </p>

                  {/* GitHub Redirect - Opens in New Tab */}
                  <button
                    type="button"
                    onClick={() => {
                      window.open(project.link, "_blank", "noopener,noreferrer");
                    }}
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
    </div>
  );
};

export default Projects;