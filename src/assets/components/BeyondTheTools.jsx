"use client";
import { Brain, BriefcaseBusiness, Lightbulb, Target } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const BeyondTheTools = () => {
  return (
    <div>
      <section className="bg-[#F7F6EC] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Main Container */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInUp}
            className="bg-[#FF1717] rounded-[36px] p-8 md:p-12 lg:p-12 mx-0 overflow-hidden"
          >
            {/* Header */}
            <div className="flex flex-col lg:items-center gap-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ delay: 0.1 }}
                className="flex flex-col lg:flex-row lg:items-center gap-8"
              >
                {/* Icon */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ delay: 0.15 }}
                  className="w-11 h-11 md:w-15 md:h-15 lg:w-15 lg:h-15 rounded-2xl bg-white flex items-center justify-center shrink-0"
                >
                  <Brain size={25} className="text-[#FF1717]" />
                </motion.div>

                {/* Text */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ delay: 0.2 }}
                >
                  <span className="font-serif text-white text-md md:text-2xl lg:text-3xl font-bold leading-tight">
                    Beyond The Tools
                  </span>
                  <br />
                  <br />
                  <span className="mt-5 text-white/90 text-sm leading-8 max-w-4xl">
                    While technical skills are important, my real value lies in
                    translating complex data into clear business strategies
                  </span>
                </motion.div>
              </motion.div>

              {/* Cards */}
              <div className="grid lg:grid-cols-3 gap-6 mt-5">
                {[
                  {
                    icon: <BriefcaseBusiness size={22} />,
                    title: "Business First",
                    desc: "I focus on outcome, not just outputs",
                  },
                  {
                    icon: <Lightbulb size={22} />,
                    title: "Clear Insights",
                    desc: "Complex data made simple for everyone",
                  },
                  {
                    icon: <Target size={22} />,
                    title: "Action-Oriented",
                    desc: "Recommendations you can implement",
                  },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={fadeInUp}
                    transition={{ delay: 0.3 + i * 0.2 }}
                    className="bg-white rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  >
                    <div className="w-10 h-10 md:w-14 md:h-14 lg:w-14 lg:h-14 rounded-2xl bg-[#FFEAEA] flex items-center justify-center text-[#FF1717]">
                      {card.icon}
                    </div>
                    <span className="mt-6 text-[#D52B2B] text-md md:text-2xl lg:text-2xl font-bold">
                      {card.title}
                    </span>
                    <br />
                    <span className="mt-4 text-[#555555] leading-8 text-sm">
                      {card.desc}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BeyondTheTools;
