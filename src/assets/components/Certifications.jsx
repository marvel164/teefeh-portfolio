"use client";

import { motion } from "framer-motion";
import React from "react";
import { Download } from "lucide-react";

import Udemy from "../images/udemy.jpg";
import AltSchoolAfrica from "../images/altSchool_africa.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Certifications = () => {
  const certifications = [
    {
      year: "2025",
      title: "Diploma in Data Analytics",
      issuer: "AltSchool Africa",
      image: AltSchoolAfrica,
      href: "/AltSchool_Africa_Certificate-Akotun.pdf",
      download: "AltSchool_Africa_Certificate-Akotun.pdf",
    },
    {
      year: "2026",
      title: "Microsoft Power BI for Business Intelligence - Power BI 2026",
      issuer: "Udemy",
      image: Udemy,
      href: "/Udemy_Cert_6.pdf",
      download: "Udemy_Cert_6.pdf",
    },
  ];

  return (
    <div>
      <section className="bg-[#F7F6EC] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInUp}
            className="flex justify-center"
          >
            <span className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#E31616] shadow-sm">
              Credentials
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="mt-6 text-center"
          >
            <span className="font-serif text-xl font-bold text-[#E31616] md:text-2xl lg:text-4xl">
              Certifications
            </span>
            <br />

            <span className="mx-auto mt-3 hidden max-w-3xl text-xs leading-6 text-[#252525] md:block">
              I'm passionate about expanding my knowledge and sharpening my
              analytical skills. These certifications
              <br />
              are milestones in my journey of continuous professional
              development.
            </span>

            <span className="mx-auto mt-3 block max-w-3xl text-xs leading-6 text-[#252525] md:hidden">
              I'm passionate about expanding my knowledge and sharpening my
              analytical skills. These certifications are milestones in my
              journey of continuous professional development.
            </span>
          </motion.div>

          {/* Certification Cards */}
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ delay: i * 0.2 }}
                className="overflow-hidden rounded-2xl bg-[#FEDDDC] transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image */}
                <div className="bg-[#FEDDDC] p-4">
                  <div className="flex h-64 items-center justify-center overflow-hidden rounded-xl bg-[#FEDDDC]">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="h-full w-full cursor-pointer object-contain transition duration-300 hover:scale-[1.02]"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-3">
                    <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#D52B2B]">
                      {cert.year}
                    </span>
                  </div>

                  <h3 className="text-base font-bold leading-tight text-[#D52B2B]">
                    {cert.title}
                  </h3>

                  <p className="mb-5 mt-1 text-xs leading-6 text-[#444444]">
                    {cert.issuer}
                  </p>

                  <a
                    href={cert.href}
                    download={cert.download}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-[#FF2020] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#E11D1D]"
                  >
                    Download Certificate
                    <Download size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Certifications;
