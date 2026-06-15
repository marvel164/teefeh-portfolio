"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Profile from "../images/profile.jpg";

// Bounce loop definition
const bounceLoop = {
  y: [0, -20, 0],
  transition: {
    duration: 1.3,
    repeat: Infinity,
    repeatType: "loop",
    ease: "easeInOut",
  },
};

// Infinite Typewriter hook
const useTypewriter = (text, speed = 100, pause = 1500) => {
  const [displayed, setDisplayed] = useState(() =>
    text && text.length ? text[0] : "",
  );
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let i = 0;
    let forward = true;
    let interval;
    const reducedPause = 300;

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
        {/* Floating Images with bounce only */}
        <motion.img
          src={Profile}
          alt="Profile"
          className="absolute left-10 top-16 md:top-10 lg:top-15 w-15 h-15 lg:w-28 lg:h-28 md:w-28 md:h-28 object-cover rounded-[23px]"
          whileHover={{ scale: 1.1 }}
          animate={bounceLoop}
        />
        <motion.img
          src={Profile}
          alt="Profile"
          className="absolute left-10 bottom-14 md:bottom-16 lg:bottom-16 w-15 h-15 lg:w-28 lg:h-28 md:w-28 md:h-28 object-cover rounded-[23px]"
          whileHover={{ scale: 1.1 }}
          animate={bounceLoop}
        />
        <motion.img
          src={Profile}
          alt="Profile"
          className="absolute right-10 top-16 md:top-10 lg:top-15 w-15 h-15 lg:w-28 lg:h-28 md:w-28 md:h-28 object-cover rounded-[23px]"
          whileHover={{ scale: 1.1 }}
          animate={bounceLoop}
        />
        <motion.img
          src={Profile}
          alt="Profile"
          className="absolute right-10 bottom-14 md:bottom-16 lg:bottom-16 w-15 h-15 lg:w-28 lg:h-28 md:w-28 md:h-28 object-cover rounded-[23px]"
          whileHover={{ scale: 1.1 }}
          animate={bounceLoop}
        />

        {/* Content with entrance animation preserved */}
        <div className="max-w-4xl text-center">
          <motion.span
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            viewport={{ once: false }}
            className="text-[#E31616] uppercase font-bold leading-[1.02] text-[25px] md:text-[40px] lg:text-[50px] font-['Cormorant_Garamond']"
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
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: 0.2 },
              },
            }}
            viewport={{ once: false }}
            className="mt-8 text-[#252525] block text-[12px] md:text-[14px] lg:text-[16px] leading-[1.8] max-w-215 mx-auto font-normal font-['Inter']"
          >
            I am a Business Data Analyst who transforms complex data into
            actionable insights that <br />
            drive smarter business decision. Using Power Bi, SQL, and Excel, I
            uncover trends, <br />
            optimize reporting, and help businesses make data-driven decisions
            with confidence.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: 0.4 },
              },
            }}
            viewport={{ once: false }}
            className="mt-14 flex justify-center gap-5"
          >
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#E31616] text-white text-[11px] md:text-[13px] lg:text-[13px] px-6 py-3 rounded-sm shadow-[0_10px_20px_rgba(255,26,26,0.15)] font-bold transition"
            >
              EXPLORE MY WORK
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border border-[#E8B9B9] text-[11px] md:text-[13px] lg:text-[13px] text-[#E31616] px-6 py-3 rounded-sm font-bold transition"
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
