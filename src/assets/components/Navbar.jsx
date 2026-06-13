"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeDown = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.15,
      },
    }),
  };

  const navLinks = [
    { href: "#top", label: "Home" },
    { href: "#about", label: "Projects" },
    { href: "#services", label: "Skills" },
    { href: "#work", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-white/30 backdrop-blur-md border-b border-[#E7DEDA]"
          : "bg-[#F6F3EC] border-b border-[#E7DEDA]"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 lg:px-12">
        {/* Logo */}
        <motion.a
          href="#top"
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeDown}
        >
          <span className="text-[#E31616] font-black text-2xl tracking-wide cursor-pointer font-['Inter']">
            TEEFEH
          </span>
        </motion.a>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.label}
              initial="hidden"
              animate="visible"
              custom={i + 1}
              variants={fadeDown}
            >
              <motion.a
                href={link.href}
                className="relative inline-block text-[#E31616] text-sm font-semibold transition"
                whileHover={{
                  scale: 1.1,
                  color: "#b91c1c",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.querySelector("span").style.transform =
                    "scaleX(1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.querySelector("span").style.transform =
                    "scaleX(0)";
                }}
              >
                {link.label}

                {/* Center expanding underline */}
                <span
                  className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-[#E31616] origin-center transition-transform duration-300 ease-out"
                  style={{
                    transform: "scaleX(0)",
                  }}
                />
              </motion.a>
            </motion.li>
          ))}
        </ul>

        {/* Resume Button */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={navLinks.length + 1}
          variants={fadeDown}
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.1, backgroundColor: "#b91c1c" }} // 20% increase
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="inline-block bg-[#E31616] text-white px-6 py-2 rounded font-medium"
          >
            VIEW MY RESUME
          </motion.a>
        </motion.div>
      </nav>
    </div>
  );
};

export default Navbar;
