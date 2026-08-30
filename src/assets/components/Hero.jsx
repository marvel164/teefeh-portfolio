"use client";

import { useState, useEffect, useRef, useCallback } from "react";

import { motion } from "framer-motion";

import Profile1 from "../images/profile1.jpg";
import Profile2 from "../images/profile2.jpg";
import Profile3 from "../images/profile3.jpg";
import Profile4 from "../images/profile4.jpg";

/* ============================================================
   KINETIC GRID BACKGROUND
   ============================================================ */

const CELL_SIZE = 55;
const INFLUENCE_RADIUS = 260;
const MAX_WARP = 24;
const DOT_SPACING = 28;
const LERP_SPEED = 0.08;

const LINE_BASE = {
  r: 110,
  g: 45,
  b: 45,
  a: 0.1,
};

const NODE_BASE_RADIUS = 1.4;
const NODE_ACTIVE_RADIUS = 3.2;

/* ============================================================
   HELPERS
   ============================================================ */

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpColor(base, active, t) {
  const r = Math.round(lerp(base.r, active.r, t));
  const g = Math.round(lerp(base.g, active.g, t));
  const b = Math.round(lerp(base.b, active.b, t));
  const a = lerp(base.a, active.a, t);

  return `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`;
}

/* ============================================================
   KINETIC GRID
   Desktop / Tablet only
   ============================================================ */

const KineticGrid = () => {
  const canvasRef = useRef(null);

  const mouseRef = useRef({
    x: -9999,
    y: -9999,
  });

  const targetMouseRef = useRef({
    x: -9999,
    y: -9999,
  });

  const ripplesRef = useRef([]);

  const animationRef = useRef(null);

  const sizeRef = useRef({
    width: 0,
    height: 0,
  });

  /* ----------------------------------------------------------
     Calculate warped grid point
     ---------------------------------------------------------- */

  const getWarpedPoint = useCallback(
    (gx, gy, col, row, mouse, ripples, cols, rows) => {
      const edgeMargin = 1.5;

      const colPin = Math.min(
        col / edgeMargin,
        (cols - 1 - col) / edgeMargin,
        1,
      );

      const rowPin = Math.min(
        row / edgeMargin,
        (rows - 1 - row) / edgeMargin,
        1,
      );

      const pinFactor = colPin * colPin * rowPin * rowPin;

      const dx = gx - mouse.x;
      const dy = gy - mouse.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      const proximity =
        Math.max(0, 1 - distance / INFLUENCE_RADIUS) * pinFactor;

      /* ------------------------------------------------------
         Ripple displacement
         ------------------------------------------------------ */

      let rippleX = 0;
      let rippleY = 0;

      for (const ripple of ripples) {
        const rdx = gx - ripple.x;
        const rdy = gy - ripple.y;

        const rippleDistance = Math.sqrt(rdx * rdx + rdy * rdy);

        const waveWidth = 55;

        const difference = rippleDistance - ripple.radius;

        if (Math.abs(difference) < waveWidth) {
          const strength =
            (1 - Math.abs(difference) / waveWidth) *
            ripple.opacity *
            18 *
            pinFactor;

          const angle = Math.atan2(rdy, rdx);

          const sign = difference < 0 ? -1 : 1;

          rippleX += Math.cos(angle) * strength * sign * -1;

          rippleY += Math.sin(angle) * strength * sign * -1;
        }
      }

      /* ------------------------------------------------------
         Cursor warp
         ------------------------------------------------------ */

      if (distance < INFLUENCE_RADIUS && distance > 0 && pinFactor > 0) {
        const t = distance / INFLUENCE_RADIUS;

        const eased =
          t < 0.01 ? 0 : (1 - t) * (1 - t) * Math.min(1, distance / 60);

        const warpAmount = eased * MAX_WARP * pinFactor;

        const angle = Math.atan2(dy, dx);

        return {
          point: {
            x: gx - Math.cos(angle) * warpAmount + rippleX,

            y: gy - Math.sin(angle) * warpAmount + rippleY,
          },

          proximity,
        };
      }

      return {
        point: {
          x: gx + rippleX,
          y: gy + rippleY,
        },

        proximity,
      };
    },
    [],
  );

  /* ----------------------------------------------------------
     Draw grid
     ---------------------------------------------------------- */

  const draw = useCallback(
    (now) => {
      const canvas = canvasRef.current;

      if (!canvas) return;

      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      const { width, height } = sizeRef.current;

      if (!width || !height) {
        return;
      }

      const mouse = mouseRef.current;

      const ripples = ripplesRef.current;

      /* Clear */

      ctx.clearRect(0, 0, width, height);

      /* ------------------------------------------------------
         Subtle dot texture
         ------------------------------------------------------ */

      ctx.fillStyle = "rgba(180, 35, 35, 0.055)";

      for (let x = DOT_SPACING / 2; x < width; x += DOT_SPACING) {
        for (let y = DOT_SPACING / 2; y < height; y += DOT_SPACING) {
          ctx.beginPath();

          ctx.arc(x, y, 0.8, 0, Math.PI * 2);

          ctx.fill();
        }
      }

      /* ------------------------------------------------------
         Update ripples
         ------------------------------------------------------ */

      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];

        const age = (now - ripple.born) / 1000;

        ripple.radius = Math.max(0, age * 400);

        ripple.opacity = Math.max(0, 1 - age * 1.2);

        if (ripple.opacity <= 0) {
          ripples.splice(i, 1);
        }
      }

      /* ------------------------------------------------------
         Build grid
         ------------------------------------------------------ */

      const cols = Math.max(2, Math.ceil(width / CELL_SIZE)) + 1;

      const rows = Math.max(2, Math.ceil(height / CELL_SIZE)) + 1;

      const cellWidth = width / (cols - 1);

      const cellHeight = height / (rows - 1);

      const points = [];
      const proximities = [];

      for (let row = 0; row < rows; row++) {
        points[row] = [];
        proximities[row] = [];

        for (let col = 0; col < cols; col++) {
          const result = getWarpedPoint(
            col * cellWidth,
            row * cellHeight,
            col,
            row,
            mouse,
            ripples,
            cols,
            rows,
          );

          points[row][col] = result.point;

          proximities[row][col] = result.proximity;
        }
      }

      /* ------------------------------------------------------
         Grid lines
         ------------------------------------------------------ */

      const activeColor = {
        r: 227,
        g: 22,
        b: 22,
        a: 0.75,
      };

      const drawSegment = (point1, point2, proximity1, proximity2) => {
        const average = (proximity1 + proximity2) / 2;

        const t = average * average * (3 - 2 * average);

        ctx.beginPath();

        ctx.moveTo(point1.x, point1.y);

        ctx.lineTo(point2.x, point2.y);

        ctx.strokeStyle = lerpColor(LINE_BASE, activeColor, t);

        ctx.lineWidth = lerp(0.7, 1.5, t);

        ctx.stroke();
      };

      ctx.lineCap = "round";

      /* Horizontal */

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols - 1; col++) {
          drawSegment(
            points[row][col],
            points[row][col + 1],
            proximities[row][col],
            proximities[row][col + 1],
          );
        }
      }

      /* Vertical */

      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows - 1; row++) {
          drawSegment(
            points[row][col],
            points[row + 1][col],
            proximities[row][col],
            proximities[row + 1][col],
          );
        }
      }

      /* ------------------------------------------------------
         Intersection nodes
         ------------------------------------------------------ */

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const point = points[row][col];

          const proximity = proximities[row][col];

          const t = proximity * proximity * (3 - 2 * proximity);

          const radius = lerp(NODE_BASE_RADIUS, NODE_ACTIVE_RADIUS, t);

          /* Glow */

          if (t > 0.15) {
            const glowRadius = radius + lerp(0, 8, (t - 0.15) / 0.85);

            const gradient = ctx.createRadialGradient(
              point.x,
              point.y,
              radius * 0.5,
              point.x,
              point.y,
              glowRadius,
            );

            gradient.addColorStop(
              0,
              `rgba(227, 22, 22, ${(t * 0.35).toFixed(3)})`,
            );

            gradient.addColorStop(1, "rgba(227, 22, 22, 0)");

            ctx.beginPath();

            ctx.arc(point.x, point.y, glowRadius, 0, Math.PI * 2);

            ctx.fillStyle = gradient;

            ctx.fill();
          }

          /* Node */

          ctx.beginPath();

          ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);

          ctx.fillStyle = lerpColor(
            {
              r: 120,
              g: 50,
              b: 50,
              a: 0.16,
            },
            {
              r: 227,
              g: 22,
              b: 22,
              a: 1,
            },
            t,
          );

          ctx.fill();
        }
      }

      /* ------------------------------------------------------
         Ripple circles
         ------------------------------------------------------ */

      for (const ripple of ripples) {
        if (ripple.radius <= 0) {
          continue;
        }

        ctx.beginPath();

        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);

        ctx.strokeStyle = `rgba(227, 22, 22, ${(ripple.opacity * 0.35).toFixed(
          3,
        )})`;

        ctx.lineWidth = 1.5;

        ctx.stroke();
      }
    },
    [getWarpedPoint],
  );

  /* ----------------------------------------------------------
     Animation loop
     ---------------------------------------------------------- */

  const animate = useCallback(
    (now) => {
      const mouse = mouseRef.current;

      const target = targetMouseRef.current;

      mouse.x = lerp(mouse.x, target.x, LERP_SPEED);

      mouse.y = lerp(mouse.y, target.y, LERP_SPEED);

      draw(now);

      animationRef.current = requestAnimationFrame(animate);
    },
    [draw],
  );

  /* ----------------------------------------------------------
     Setup
     ---------------------------------------------------------- */

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;

      if (!parent) return;

      const rect = parent.getBoundingClientRect();

      const width = rect.width;

      const height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);

      canvas.height = Math.floor(height * dpr);

      canvas.style.width = `${width}px`;

      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      sizeRef.current = {
        width,
        height,
      };
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    /* Mouse movement */

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();

      targetMouseRef.current = {
        x: event.clientX - rect.left,

        y: event.clientY - rect.top,
      };
    };

    /* Mouse leaving Hero */

    const handleMouseLeave = () => {
      targetMouseRef.current = {
        x: -9999,
        y: -9999,
      };
    };

    /* Click ripple */

    const handleClick = (event) => {
      const rect = canvas.getBoundingClientRect();

      const x = event.clientX - rect.left;

      const y = event.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        ripplesRef.current.push({
          x,
          y,
          radius: 0,
          opacity: 1,
          born: performance.now(),
        });

        if (ripplesRef.current.length > 8) {
          ripplesRef.current.shift();
        }
      }
    };

    const hero = canvas.parentElement;

    if (hero) {
      hero.addEventListener("mousemove", handleMouseMove);

      hero.addEventListener("mouseleave", handleMouseLeave);

      hero.addEventListener("click", handleClick);
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);

      if (hero) {
        hero.removeEventListener("mousemove", handleMouseMove);

        hero.removeEventListener("mouseleave", handleMouseLeave);

        hero.removeEventListener("click", handleClick);
      }

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  /*
    IMPORTANT:
    "hidden md:block" means:
    - Mobile: canvas is not displayed
    - Tablet/Desktop: canvas is displayed and animated
  */

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 hidden h-full w-full pointer-events-none md:block"
    />
  );
};

/* ============================================================
   BOUNCE ANIMATION
   ============================================================ */

const bounceLoop = {
  y: [0, -20, 0],

  transition: {
    duration: 1.3,
    repeat: Infinity,
    repeatType: "loop",
    ease: "easeInOut",
  },
};

/* ============================================================
   TYPEWRITER
   ============================================================ */

const useTypewriter = (text, speed = 100, pause = 1500) => {
  const [displayed, setDisplayed] = useState(
    text && text.length ? text[0] : "",
  );

  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let i = text && text.length ? 1 : 0;

    let forward = true;

    let interval = null;
    let timeout = null;

    const reducedPause = 300;

    const run = () => {
      setIsTyping(true);

      interval = setInterval(() => {
        if (forward) {
          setDisplayed(text.slice(0, i + 1));

          i++;

          if (i === text.length) {
            clearInterval(interval);

            interval = null;

            setIsTyping(false);

            timeout = setTimeout(() => {
              forward = false;
              run();
            }, pause);
          }
        } else {
          setDisplayed(text.slice(0, i));

          i--;

          if (i === 0) {
            clearInterval(interval);

            interval = null;

            setIsTyping(false);

            const delay =
              text && text.length && text[0] === "B" ? reducedPause : pause;

            timeout = setTimeout(() => {
              forward = true;
              run();
            }, delay);
          }
        }
      }, speed);
    };

    if (i > 0) {
      run();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }

      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [text, speed, pause]);

  return [displayed, isTyping];
};

/* ============================================================
   HERO
   ============================================================ */

const Hero = () => {
  const [typedName, isTyping] = useTypewriter("BOLUWATIFE AKOTUN", 120, 1500);

  return (
    <div id="top" className="relative overflow-hidden bg-[#F6F3EC]">
      {/* ======================================================
          KINETIC GRID — DESKTOP / TABLET ONLY
          ====================================================== */}

      <KineticGrid />

      {/* ======================================================
          HERO CONTENT
          ====================================================== */}

      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
        {/* Floating Image 1 */}

        <motion.img
          src={Profile1}
          alt="Profile 1"
          className="absolute left-10 top-22 h-17 w-17 rounded-[20px] object-cover shadow-lg shadow-black/5 md:top-10 md:h-28 md:w-28 lg:top-15 lg:h-28 lg:w-28"
          whileHover={{
            scale: 1.1,
          }}
          animate={bounceLoop}
        />

        {/* Floating Image 2 */}

        <motion.img
          src={Profile2}
          alt="Profile 2"
          className="absolute bottom-22 left-10 h-17 w-17 rounded-[20px] object-cover shadow-lg shadow-black/5 md:bottom-16 md:h-28 md:w-28 lg:bottom-16 lg:h-28 lg:w-28"
          whileHover={{
            scale: 1.1,
          }}
          animate={bounceLoop}
        />

        {/* Floating Image 3 */}

        <motion.img
          src={Profile3}
          alt="Profile 3"
          className="absolute right-10 top-22 h-17 w-17 rounded-[20px] object-cover shadow-lg shadow-black/5 md:top-10 md:h-28 md:w-28 lg:top-15 lg:h-28 lg:w-28"
          whileHover={{
            scale: 1.1,
          }}
          animate={bounceLoop}
        />

        {/* Floating Image 4 */}

        <motion.img
          src={Profile4}
          alt="Profile 4"
          className="absolute bottom-22 right-10 h-17 w-17 rounded-[20px] object-cover shadow-lg shadow-black/5 md:bottom-16 md:h-28 md:w-28 lg:bottom-16 lg:h-28 lg:w-28"
          whileHover={{
            scale: 1.1,
          }}
          animate={bounceLoop}
        />

        {/* ====================================================
            CENTER CONTENT
            ==================================================== */}

        <div className="relative z-20 max-w-4xl text-center">
          {/* Main Heading */}

          <motion.span
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: {
                opacity: 0,
                y: 40,
              },

              visible: {
                opacity: 1,
                y: 0,

                transition: {
                  duration: 0.6,
                },
              },
            }}
            viewport={{
              once: false,
            }}
            className="font-['Inter'] text-[25px] font-bold uppercase leading-[1.02] text-[#E31616] md:text-[40px] lg:text-[50px]"
          >
            HI, MY NAME IS
            <br />
            {typedName}
            <motion.span
              aria-hidden
              className="ml-1 inline-block h-[0.95em] w-0.5 align-bottom bg-[#E31616]"
              animate={
                isTyping
                  ? {
                      opacity: [1, 0, 1],
                    }
                  : {
                      opacity: 1,
                    }
              }
              transition={{
                duration: 0.8,
                repeat: Infinity,
              }}
            />
          </motion.span>

          {/* Desktop Description */}

          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: {
                opacity: 0,
                y: 40,
              },

              visible: {
                opacity: 1,
                y: 0,

                transition: {
                  duration: 0.6,
                  delay: 0.2,
                },
              },
            }}
            viewport={{
              once: false,
            }}
            className="mx-auto mt-8 hidden max-w-215 font-['Inter'] text-[12px] font-normal leading-[1.8] text-[#252525] md:block md:text-[14px] lg:block lg:text-[16px]"
          >
            I am a Business Data Analyst who transforms complex data into
            actionable insights that
            <br />
            drive smarter business decision. Using Power Bi, SQL, and Excel, I
            uncover trends,
            <br />
            optimize reporting, and help businesses make data-driven decisions
            with confidence.
          </motion.p>

          {/* Mobile Description */}

          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: {
                opacity: 0,
                y: 40,
              },

              visible: {
                opacity: 1,
                y: 0,

                transition: {
                  duration: 0.6,
                  delay: 0.2,
                },
              },
            }}
            viewport={{
              once: false,
            }}
            className="mx-auto mt-8 block max-w-215 font-['Inter'] text-[12px] font-normal leading-[1.8] text-[#252525] md:hidden lg:hidden"
          >
            I am a Business Data Analyst who transforms complex data into
            actionable insights that drive smarter business decision. Using
            Power Bi, SQL, and Excel, I uncover trends, optimize reporting, and
            help businesses make data-driven decisions with confidence.
          </motion.p>

          {/* ==================================================
              BUTTONS
              ================================================== */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: {
                opacity: 0,
                y: 40,
              },

              visible: {
                opacity: 1,
                y: 0,

                transition: {
                  duration: 0.6,
                  delay: 0.4,
                },
              },
            }}
            viewport={{
              once: false,
            }}
            className="mt-14 flex justify-center gap-5"
          >
            {/* Explore */}

            <motion.a
              href="#projects"
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="rounded-sm bg-[#E31616] px-6 py-3 text-[11px] font-bold text-white shadow-[0_10px_20px_rgba(255,26,26,0.15)] transition md:text-[13px] lg:text-[13px]"
            >
              EXPLORE MY WORK
            </motion.a>

            {/* Contact */}

            <motion.a
              href="#contact"
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="rounded-sm border border-[#E8B9B9] bg-white px-6 py-3 text-[11px] font-bold text-[#E31616] shadow-sm transition md:text-[13px] lg:text-[13px]"
            >
              CONTACT ME
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
