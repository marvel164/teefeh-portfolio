"use client";
import React from "react";
import { Users, Target, LineChart, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ServiceCard = () => {
  return (
    <section className="min-h-screen bg-[#FEDDDC] py-6 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeInUp}
          className="flex justify-center mb-4"
        >
          <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#FFF5F5] text-[#E31616] text-xs font-semibold uppercase tracking-widest">
            What I Do
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeInUp}
          className="flex justify-center"
        >
          <span className="text-center text-[#E31616] font-bold text-xl md:text-2xl lg:text-4xl leading-tight uppercase font-['Cormorant_Garamond']">
            How I Help Businesses <br /> Grow with Data
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeInUp}
          className="flex justify-center"
        >
          <span className="max-w-2xl mx-auto mt-2 text-center text-[#252525] text-[15px] md:text-[18px] lg:text-[18px] leading-6 font-['Inter']">
            I transform complex data into clear actionable insights that help
            businesses make <br />
            smarter decisions, improve performance, and achieve measurable
            growth.
          </span>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-4 mt-10">
          {[
            {
              icon: <Users size={24} className="text-[#D53A3A]" />,
              title: "Customer Behaviour Analysis",
              text: "Using fintech and customer data, I uncover behavioural patterns, churn risks, and retention opportunities. I’ve also analysed product and service performance data including lottery and digital service platforms by tracking engagement rates, drop-off points, and performance trends that help businesses understand what’s working and where users are disengaging. My analysis has directly informed retention and product strategies across multiple service lines.",
            },
            {
              icon: <Target size={24} className="text-[#D53A3A]" />,
              title: "Business Performance Optimization",
              text: "I identify where business operations and reporting workflows are losing time and efficiency then build the dashboards and data solutions that fix it. From automating manual reporting cycles to streamlining how teams access performance data, my work has measurably reduced the time it takes to get from raw data to business decision.",
            },
            {
              icon: <LineChart size={24} className="text-[#D53A3A]" />,
              title: "Data-Driven Decision Support",
              text: "I connect complex data to executive decision-making by delivering Power BI dashboards and SQL-driven reports that put the right insight in front of the right people, exactly when they need it. Because in fast-moving business environments, timing and clarity are just as important as the data itself.",
            },
            {
              icon: <TrendingUp size={24} className="text-[#D53A3A]" />,
              title: "Revenue Growth Insight",
              text: "I analyze sales and transactional data to surface growth opportunities. Identifying high-performing revenue streams, flagging underperforming areas, and helping organizations optimize pricing and commercial strategy with confidence.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeInUp}
              transition={{ delay: i * 0.2 }}
              className="bg-[#330E0D] rounded-2xl p-6 shadow-md"
            >
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-4">
                {card.icon}
              </div>
              <span className="text-white text-base font-bold mb-3 block">
                {card.title}
              </span>
              <span className="text-[#D8C8C8] text-sm leading-6">
                {card.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCard;
