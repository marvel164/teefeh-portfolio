"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);

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
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];




  return (

    <div
      className={`
        fixed top-0 left-0 w-full z-[60]
        transition-colors duration-300

        ${
          scrolled
            ? "bg-white/30 backdrop-blur-md border-b border-[#E7DEDA]"
            : "bg-[#F6F3EC] border-b border-[#E7DEDA]"
        }

      `}
    >


      <nav
        className="
          max-w-7xl
          mx-auto
          flex
          items-center
          justify-between
          py-4
          px-6
          lg:px-12
          relative
        "
      >



        {/* LOGO */}

        <motion.a

          href="#top"

          initial="hidden"

          animate="visible"

          custom={0}

          variants={fadeDown}

        >

          <span
            className="
              text-[#E31616]
              font-black
              text-2xl
              tracking-wide
            "
          >

            TEEFEH

          </span>


        </motion.a>









        {/* DESKTOP NAV LINKS */}


        <ul className="hidden md:flex items-center gap-10 uppercase">


          {navLinks.map((link, i)=>(


            <motion.li

              key={link.label}

              initial="hidden"

              animate="visible"

              custom={i + 1}

              variants={fadeDown}

            >


              <motion.a


                href={link.href}


                className="
                  relative
                  inline-block
                  text-[#E31616]
                  text-sm
                  font-semibold
                "


                whileHover={{
                  scale:1.1
                }}



                onMouseEnter={(e)=>{

                  e.currentTarget
                  .querySelector("span")
                  .style.transform="scaleX(1)";

                }}



                onMouseLeave={(e)=>{

                  e.currentTarget
                  .querySelector("span")
                  .style.transform="scaleX(0)";

                }}


              >


                {link.label}



                <span

                  className="
                    absolute
                    left-0
                    bottom-[-5px]
                    w-full
                    h-[2px]
                    bg-[#E31616]
                    origin-center
                    transition-transform
                    duration-300
                    ease-out
                  "

                  style={{
                    transform:"scaleX(0)"
                  }}

                />


              </motion.a>


            </motion.li>


          ))}


        </ul>









        {/* DESKTOP RESUME */}


        <motion.a


          href="/Boluwatife-Akotun_Data Analyst.pdf"

          download="Boluwatife-Akotun_Data Analyst.pdf"


          whileHover={{
            scale:1.1
          }}


          whileTap={{
            scale:.95
          }}


          className="
            hidden
            md:inline-block
            bg-[#E31616]
            text-white
            px-4
            py-2
            rounded
            font-medium
            text-sm
          "

        >

          DOWNLOAD MY RESUME


        </motion.a>








        {/* MOBILE MENU ICON */}


        <button

          onClick={()=>setMobileOpen(!mobileOpen)}

          className="
            md:hidden
            text-[#E31616]
            relative
            z-[80]
          "

        >


          <AnimatePresence mode="wait">


            {

              mobileOpen ? (


                <motion.div

                  key="close"

                  initial={{
                    rotate:-90,
                    opacity:0
                  }}

                  animate={{
                    rotate:0,
                    opacity:1
                  }}

                  exit={{
                    rotate:90,
                    opacity:0
                  }}

                >

                  <X size={28} strokeWidth={1.5}/>


                </motion.div>



              ) : (


                <motion.div

                  key="menu"

                  initial={{
                    rotate:90,
                    opacity:0
                  }}

                  animate={{
                    rotate:0,
                    opacity:1
                  }}

                  exit={{
                    rotate:-90,
                    opacity:0
                  }}

                >

                  <Menu size={28} strokeWidth={1.5}/>


                </motion.div>


              )

            }


          </AnimatePresence>


        </button>


      </nav>












      {/* MOBILE MENU OVERLAY */}


      <AnimatePresence>


      {mobileOpen && (


        <motion.div


          initial={{
            x:"100%",
            backgroundColor:"#F6F3EC"
          }}


          animate={{
            x:0,
            backgroundColor:"#F6F3EC"
          }}


          exit={{
            x:"100%"
          }}


          transition={{
            duration:.45,
            ease:[0.4,0,0.2,1]
          }}



          className="
            fixed
            top-0
            left-0
            w-full
            h-screen
            bg-[#F6F3EC]
            z-[55]
            md:hidden
            pt-32
            px-6
          "


        >





          {/* LINKS */}


          <motion.div


            initial={{
              opacity:0,
              y:20
            }}


            animate={{
              opacity:1,
              y:0
            }}


            exit={{
              opacity:0,
              y:10
            }}



            transition={{
              duration:.35,
              delay:.1
            }}



            className="
              space-y-12
              text-lg
              text-black
            "


          >


            {navLinks.map((link)=>(


              <a

                key={link.label}

                href={link.href}

                onClick={()=>setMobileOpen(false)}

                className="block"

              >

                {link.label}


              </a>


            ))}


          </motion.div>









          {/* MOBILE RESUME BUTTON */}



          <motion.a


            href="/Boluwatife-Akotun_Data Analyst.pdf"


            download="Boluwatife-Akotun_Data Analyst.pdf"



            initial={{
              opacity:0
            }}


            animate={{
              opacity:1
            }}


            exit={{
              opacity:0
            }}



            transition={{
              duration:.3,
              delay:.2
            }}



            className="
              block
              mt-14
              w-full
              text-center
              bg-[#E31616]
              text-white
              py-4
              rounded
              font-medium
            "


          >

            DOWNLOAD MY RESUME


          </motion.a>




        </motion.div>


      )}



      </AnimatePresence>



    </div>

  );

};


export default Navbar;