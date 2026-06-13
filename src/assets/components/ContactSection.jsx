"use client";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import React from "react";
import { BsInstagram, BsWhatsapp } from "react-icons/bs";
import { LiaLinkedin } from "react-icons/lia";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const ContactSection = () => {
  return (
    <div>
      <section className="bg-[#FEDDDC] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInUp}
            className="text-center"
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-[#D52B2B] text-xs font-semibold uppercase tracking-wider shadow-sm">
              Contact
            </span>
            <br />
            <br />
            <span className="mt-6 font-serif text-[#D52B2B] text-xl md:text-2xl lg:text-4xl font-bold">
              Let's Work Together
            </span>
            <br />
            <span className="max-w-2xl mx-auto mt-3 text-[#252525] text-sm leading-6 block">
              Ready to turn your data into decisions? I'd love to hear about
              your challenges and discuss how I can help.
            </span>
          </motion.div>

          {/* Main Contact Area */}
          <div className="grid lg:grid-cols-[280px_1fr] gap-6 mt-10">
            {/* Left Contact Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="bg-[#FF1717] rounded-3xl p-6 text-white"
            >
              <span className="text-2xl font-bold">Get In Touch</span>
              <br />
              <span className="mt-3 text-white/90 text-sm leading-6 block">
                Reach out for collaborations, freelance projects, full-time
                opportunities, or simply to discuss data and analytics.
              </span>

              {/* Contact Items */}
              <div className="mt-6 space-y-4">
                {/* Email */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#FF1717]">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-white/70">Email</span>
                    <br />
                    <span className="font-medium">yname@email.com</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#FF1717]">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-white/70">Phone</span>
                    <br />
                    <span className="font-medium">+234 800 0000</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#FF1717]">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-white/70">Location</span>
                    <br />
                    <span className="font-medium">Lagos, Nigeria</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/20 my-6" />

              {/* Social Links */}
              <span className="font-semibold text-sm">Connect With Me</span>
              <div className="flex gap-3 mt-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#FF1717] hover:scale-105 transition"
                >
                  <LiaLinkedin size={26} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#FF1717] hover:scale-105 transition"
                >
                  <BsInstagram size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#FF1717] hover:scale-105 transition"
                >
                  <BsWhatsapp size={18} />
                </a>
              </div>
            </motion.div>

            {/* Right Form Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <form className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-[#2D2D2D]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] outline-none focus:border-[#FF1717]"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-[#2D2D2D]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] outline-none focus:border-[#FF1717]"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-[#2D2D2D]">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] outline-none focus:border-[#FF1717]"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-[#2D2D2D]">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] outline-none resize-none focus:border-[#FF1717]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FF1717] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#E21414] transition"
                >
                  Send Message
                  <Send size={16} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FF1717] py-4">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-xs text-white">
            © 2026 Boluwatife Akotun. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default ContactSection;
