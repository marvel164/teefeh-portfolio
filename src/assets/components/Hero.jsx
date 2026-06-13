"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Profile from "../images/profile.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Infinite Typewriter hook with immediate first character
const useTypewriter = (text, speed = 100, pause = 1500) => {
  const [displayed, setDisplayed] = useState(() =>
    text && text.length ? text[0] : "",
  );
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let i = 0;
    let forward = true;
    let interval;
    const reducedPause = 300; // shorter pause when the text hits the first char (e.g., 'B')

    const run = () => {
      setIsTyping(true);
      interval = setInterval(() => {
        if (forward) {
          setDisplayed(text.slice(0, i + 1));
          i++;
          if (i === text.length) {
            clearInterval(interval);
            setIsTyping(false);
            setTimeout(() => {
              forward = false;
              run();
            }, pause);
          }
        } else {
          setDisplayed(text.slice(0, i));
          i--;
          if (i === 0) {
            clearInterval(interval);
            setIsTyping(false);
            const delay =
              text && text.length && text[0] === "B" ? reducedPause : pause;
            setTimeout(() => {
              forward = true;
              run();
            }, delay);
          }
        }
      }, speed);
    };

    // Start from second character if text has at least one char
    i = text && text.length ? 1 : 0;
    if (i > 0) run();

    return () => clearInterval(interval);
  }, [text, speed, pause]);

  return [displayed, isTyping];
};

const Hero = () => {
  const [typedName, isTyping] = useTypewriter("BOLUWATIFE AKOTUN", 120, 1500);

  return (
    <div className="bg-[#F6F3EC]">
      <section className="relative max-w-7xl mx-auto min-h-[85vh] flex items-center justify-center px-6">
        {/* Floating Images */}
        <motion.img
          src={Profile}
          alt="Profile"
          className="absolute left-6 top-5 md:top-10 lg:top-10 w-20 h-20 lg:w-28 lg:h-28 md:w-28 md:h-28 object-cover rounded-[34px]"
          whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        />
        <motion.img
          src={Profile}
          alt="Profile"
          className="absolute left-10 bottom-3 md:bottom-16 lg:bottom-16 w-20 h-20 lg:w-28 lg:h-28 md:w-28 md:h-28 object-cover rounded-[34px]"
          whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false }}
        />
        <motion.img
          src={Profile}
          alt="Profile"
          className="absolute right-6 top-5 md:top-10 lg:top-10 w-20 h-20 lg:w-28 lg:h-28 md:w-28 md:h-28 object-cover rounded-[34px]"
          whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: false }}
        />
        <motion.img
          src={Profile}
          alt="Profile"
          className="absolute right-10 bottom-3 md:bottom-16 lg:bottom-16 w-20 h-20 lg:w-28 lg:h-28 md:w-28 md:h-28 object-cover rounded-[34px]"
          whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: false }}
        />

        {/* Content */}
        <div className="max-w-4xl text-center">
          <motion.span
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: false }}
            className="text-[#E31616] uppercase font-bold leading-[1.02] text-[32px] md:text-[40px] lg:text-[58px] font-['Cormorant_Garamond']"
          >
            HI, MY NAME IS <br /> {typedName}
            <motion.span
              aria-hidden
              className="inline-block ml-1 bg-[#E31616] w-0.5 h-[0.95em] align-bottom"
              animate={isTyping ? { opacity: [1, 0, 1] } : { opacity: 1 }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </motion.span>

          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            viewport={{ once: false }}
            className="mt-8 text-[#252525] hidden md:block lg:block text-[18px] leading-[1.8] max-w-215 mx-auto font-normal font-['Inter']"
          >
            I'm a Business Data Analyst who transforms complex, high-volume data
            into clear <br />
            insights that drive smarter business decisions. Specializing in
            Power BI, SQL and Excel <br />
            within fintech and software service environments, I've analyzed
            datasets exceeding 10 <br />
            million records, uncovered customer churn and retention patterns
            that directly shaped <br />
            retention strategy, and built dashboards that significantly reduced
            reporting turnaround <br />
            putting the right information in front of decision-makers exactly
            when they need it.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            viewport={{ once: false }}
            className="mt-10 flex justify-center gap-5"
          >
            <motion.button
              whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#E31616] text-white text-[13px] px-6 py-3 rounded-sm shadow-[0_10px_20px_rgba(255,26,26,0.15)] font-bold transition"
            >
              EXPLORE MY WORK
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border border-[#E8B9B9] text-[13px] text-[#E31616] px-6 py-3 rounded-sm font-bold transition"
            >
              CONTACT ME
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
