"use client";

import { useLayoutEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import "./ScrollStack.css";

export const ScrollStackItem = ({ children, itemClassName = "" }) => {
  return (
    <div className={`scroll-stack-card ${itemClassName}`.trim()}>
      {children}
    </div>
  );
};

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 80,
  itemScale = 0.035,
  itemStackDistance = 28,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.86,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onStackComplete,
}) => {
  const scrollerRef = useRef(null);
  const cardsRef = useRef([]);
  const lenisRef = useRef(null);
  const animationFrameRef = useRef(null);
  const stackCompletedRef = useRef(false);

  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);

  /*
   * IMPORTANT:
   *
   * Do NOT use getBoundingClientRect() for the cards'
   * document position here.
   *
   * getBoundingClientRect() includes the card's own CSS
   * transform. Since this component continuously changes
   * transform, using it to calculate the next transform
   * creates a feedback loop and causes vibration/jitter.
   *
   * offsetTop is independent of CSS transforms, so it gives
   * us a stable layout position.
   */
  const getLayoutOffsetTop = useCallback((element) => {
    if (!element) {
      return 0;
    }

    let top = 0;
    let current = element;

    while (current) {
      top += current.offsetTop || 0;
      current = current.offsetParent;
    }

    return top;
  }, []);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop <= start) {
      return 0;
    }

    if (scrollTop >= end) {
      return 1;
    }

    const distance = end - start;

    if (distance <= 0) {
      return 1;
    }

    return (scrollTop - start) / distance;
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * containerHeight;
    }

    return parseFloat(value) || 0;
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
      };
    }

    const scroller = scrollerRef.current;

    return {
      scrollTop: scroller ? scroller.scrollTop : 0,

      containerHeight: scroller ? scroller.clientHeight : window.innerHeight,
    };
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (element) => {
      if (!element) {
        return 0;
      }

      /*
       * For window scrolling, calculate the document
       * position using layout offsets only.
       *
       * This is deliberately independent from transforms.
       */
      if (useWindowScroll) {
        return getLayoutOffsetTop(element);
      }

      return element.offsetTop || 0;
    },
    [useWindowScroll, getLayoutOffsetTop],
  );

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) {
      return;
    }

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();

    const stackPositionPx = parsePercentage(stackPosition, containerHeight);

    const scaleEndPositionPx = parsePercentage(
      scaleEndPosition,
      containerHeight,
    );

    const endElement = useWindowScroll
      ? document.querySelector("#about-data .scroll-stack-end")
      : scrollerRef.current?.querySelector(".scroll-stack-end");

    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    /*
     * Calculate the point where the stack should stop.
     *
     * We calculate this once per update rather than
     * repeatedly inside every card.
     */
    const pinEnd = endElementTop - containerHeight / 2;

    cardsRef.current.forEach((card, index) => {
      if (!card) {
        return;
      }

      /*
       * Stable layout position.
       *
       * This value does NOT change when the card is
       * transformed.
       */
      const cardTop = getElementOffset(card);

      const triggerStart =
        cardTop - stackPositionPx - itemStackDistance * index;

      const triggerEnd = cardTop - scaleEndPositionPx;

      const scaleProgress = calculateProgress(
        scrollTop,
        triggerStart,
        triggerEnd,
      );

      /*
       * Smooth scale progression.
       */
      const scale = 1 - scaleProgress * (1 - (baseScale + index * itemScale));

      /*
       * Rotation remains disabled by default,
       * but still works if explicitly supplied.
       */
      const rotation = rotationAmount
        ? index * rotationAmount * scaleProgress
        : 0;

      /*
       * Blur is calculated only when requested.
       */
      let blur = 0;

      if (blurAmount) {
        let topCardIndex = 0;

        for (let j = 0; j < cardsRef.current.length; j++) {
          const otherCard = cardsRef.current[j];

          if (!otherCard) {
            continue;
          }

          const otherCardTop = getElementOffset(otherCard);

          const otherTriggerStart =
            otherCardTop - stackPositionPx - itemStackDistance * j;

          if (scrollTop >= otherTriggerStart) {
            topCardIndex = j;
          }
        }

        if (index < topCardIndex) {
          const depth = topCardIndex - index;

          blur = Math.max(0, depth * blurAmount);
        }
      }

      /*
       * PINNING
       */
      const pinStart = cardTop - stackPositionPx - itemStackDistance * index;

      let translateY = 0;

      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY =
          scrollTop - cardTop + stackPositionPx + itemStackDistance * index;
      } else if (scrollTop > pinEnd) {
        /*
         * Once the card reaches its final stacked
         * position, freeze it there.
         *
         * This is important for preventing old cards
         * from continuing to move.
         */
        translateY =
          pinEnd - cardTop + stackPositionPx + itemStackDistance * index;
      }

      /*
       * Round values slightly so tiny floating-point
       * changes don't continuously trigger style updates.
       */
      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,

        scale: Math.round(scale * 1000) / 1000,

        rotation: Math.round(rotation * 100) / 100,

        blur: Math.round(blur * 100) / 100,
      };

      const previous = lastTransformsRef.current.get(index);

      const changed =
        !previous ||
        Math.abs(previous.translateY - newTransform.translateY) > 0.05 ||
        Math.abs(previous.scale - newTransform.scale) > 0.0005 ||
        Math.abs(previous.rotation - newTransform.rotation) > 0.05 ||
        Math.abs(previous.blur - newTransform.blur) > 0.05;

      if (changed) {
        card.style.transform =
          `translate3d(0, ${newTransform.translateY}px, 0) ` +
          `scale(${newTransform.scale}) ` +
          `rotate(${newTransform.rotation}deg)`;

        card.style.filter =
          newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : "";

        lastTransformsRef.current.set(index, newTransform);
      }

      /*
       * Stack completion.
       */
      if (index === cardsRef.current.length - 1) {
        const complete = scrollTop >= pinStart && scrollTop <= pinEnd;

        if (complete && !stackCompletedRef.current) {
          stackCompletedRef.current = true;

          if (onStackComplete) {
            onStackComplete();
          }
        } else if (!complete && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    getScrollData,
    parsePercentage,
    stackPosition,
    scaleEndPosition,
    itemStackDistance,
    itemScale,
    baseScale,
    rotationAmount,
    blurAmount,
    calculateProgress,
    useWindowScroll,
    getElementOffset,
    onStackComplete,
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll("#about-data .scroll-stack-card")
        : scroller.querySelectorAll(".scroll-stack-card"),
    );

    cardsRef.current = cards;

    lastTransformsRef.current.clear();

    cards.forEach((card, index) => {
      /*
       * Spacing is applied through margin rather than
       * transforms, so the layout position stays stable.
       */
      if (index < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }

      card.style.willChange = "transform";

      card.style.transformOrigin = "top center";

      card.style.backfaceVisibility = "hidden";

      card.style.webkitBackfaceVisibility = "hidden";

      card.style.transformStyle = "preserve-3d";

      /*
       * Prevent browser interpolation from fighting
       * our scroll animation.
       */
      card.style.transition = "none";

      card.style.transform = "translate3d(0, 0, 0)";

      card.style.webkitTransform = "translate3d(0, 0, 0)";
    });

    let lenis = null;

    if (useWindowScroll) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075,
      });
    } else {
      lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector(".scroll-stack-inner"),
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
      });
    }

    lenis.on("scroll", handleScroll);

    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);

      animationFrameRef.current = requestAnimationFrame(raf);
    };

    animationFrameRef.current = requestAnimationFrame(raf);

    /*
     * Initial position.
     */
    updateCardTransforms();

    const handleResize = () => {
      lastTransformsRef.current.clear();

      requestAnimationFrame(() => {
        updateCardTransforms();
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      window.removeEventListener("resize", handleResize);

      if (lenis) {
        lenis.destroy();
      }

      lenisRef.current = null;
      cardsRef.current = [];

      lastTransformsRef.current.clear();

      stackCompletedRef.current = false;

      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    handleScroll,
    updateCardTransforms,
  ]);

  return (
    <div
      ref={scrollerRef}
      className={`scroll-stack-scroller ${className}`.trim()}
    >
      <div className="scroll-stack-inner">
        {children}

        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
