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
          <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#FFF5F5] text-[#C94B4B] text-xs font-semibold uppercase tracking-widest">
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
          <span className="text-center text-[#D53A3A] font-bold text-xl md:text-2xl lg:text-4xl leading-tight uppercase font-['Cormorant_Garamond']">
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
          <span className="max-w-2xl mx-auto mt-2 text-center text-[#252525] text-sm leading-6 font-['Inter']">
            I transform complex data into clear actionable insights that help
            businesses make smarter decisions, improve performance, and achieve
            measurable growth.
          </span>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-4 mt-10">
          {[
            {
              icon: <Users size={24} className="text-[#D53A3A]" />,
              title: "Customer Behaviour Analysis",
              text: "I uncover behavioural patterns, churn risks, and retention opportunities by analyzing engagement rates, drop-off points, and performance trends."
            },
            {
              icon: <Target size={24} className="text-[#D53A3A]" />,
              title: "Business Performance Optimization",
              text: "I identify inefficiencies in operations and reporting workflows, building dashboards and automated solutions to improve speed and performance."
            },
            {
              icon: <LineChart size={24} className="text-[#D53A3A]" />,
              title: "Data-Driven Decision Support",
              text: "I connect complex data to executive decision-making through Power BI dashboards and SQL-driven reporting."
            },
            {
              icon: <TrendingUp size={24} className="text-[#D53A3A]" />,
              title: "Revenue Growth Insight",
              text: "I analyze sales and transactional data to uncover growth opportunities, highlight high-performing streams, and support pricing strategies."
            }
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
