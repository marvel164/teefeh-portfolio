"use client";

import { useCallback, useEffect, useRef } from "react";
import "./ScrollExpand.css";

const clamp = (v, a, b) => {
  return v < a ? a : v > b ? b : v;
};

const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 0.000001), 0, 1);

  return t * t * (3 - 2 * t);
};

const ScrollExpand = ({
  src = "",
  mediaType = "image",
  poster = "",
  alt = "",
  title = "",
  scrollHint = "",
  startWidth = 48,
  startHeight = 62,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.3,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.08,
  overlayScrim = 0.4,
  useWindowScroll = true,
  enabled = true,
  children,
  className = "",
  style,
  ...rest
}) => {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const frameRef = useRef(null);
  const mediaRef = useRef(null);
  const titleRef = useRef(null);
  const overlayRef = useRef(null);
  const scrimRef = useRef(null);
  const hintRef = useRef(null);

  const propsRef = useRef({});

  propsRef.current = {
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    enabled,
  };

  const applyProgress = useCallback((progress) => {
    const frame = frameRef.current;
    const media = mediaRef.current;

    if (!frame || !media) return;

    const settings = propsRef.current;

    const easedProgress = smoothstep(0, 1, progress);

    const width =
      settings.startWidth + (100 - settings.startWidth) * easedProgress;

    const height =
      settings.startHeight + (100 - settings.startHeight) * easedProgress;

    const insetX = Math.max(0, (100 - width) / 2);
    const insetY = Math.max(0, (100 - height) / 2);

    const radius =
      settings.startRadius +
      (settings.endRadius - settings.startRadius) * easedProgress;

    frame.style.clipPath = `inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${radius}px)`;

    const mediaScale =
      settings.mediaZoom + (1 - settings.mediaZoom) * easedProgress;

    media.style.transform = `scale(${mediaScale})`;

    if (scrimRef.current) {
      scrimRef.current.style.opacity = String(
        settings.overlayScrim * easedProgress,
      );
    }

    if (titleRef.current) {
      const titleOut = smoothstep(0.35, 0.82, progress);

      titleRef.current.style.opacity = String(1 - titleOut);

      titleRef.current.style.transform =
        `translate3d(0, ${-32 * titleOut}px, 0) ` +
        `scale(${1 + 0.05 * titleOut})`;
    }

    if (hintRef.current) {
      const hintOut = smoothstep(0, 0.14, progress);

      hintRef.current.style.opacity = String(1 - hintOut);

      hintRef.current.style.transform = `translate3d(0, ${8 * hintOut}px, 0)`;
    }

    if (overlayRef.current) {
      const overlayIn = smoothstep(0.65, 1, progress);

      overlayRef.current.style.opacity = String(overlayIn);

      overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - overlayIn)}px, 0)`;
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;

    if (!root || !track || !stage) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let animationFrame = 0;
    let current = 0;
    let target = 0;
    let stageHeight = 0;
    let running = false;

    const measure = () => {
      const settings = propsRef.current;

      stageHeight = settings.useWindowScroll
        ? window.innerHeight
        : root.clientHeight;

      if (stageHeight <= 0) return;

      stage.style.height = `${stageHeight}px`;

      const totalHeight =
        stageHeight *
        (1 +
          Math.max(0, settings.scrollDistance) +
          Math.max(0, settings.holdDistance));

      track.style.height = `${totalHeight}px`;

      const width = root.clientWidth || stageHeight;

      stage.style.setProperty(
        "--se-title-size",
        `${clamp(width * 0.07, 22, 82)}px`,
      );
    };

    const readProgress = () => {
      const settings = propsRef.current;

      if (!settings.enabled) {
        return 1;
      }

      const span = stageHeight * Math.max(0.01, settings.scrollDistance);

      if (settings.useWindowScroll) {
        const top = track.getBoundingClientRect().top;

        return clamp(-top / span, 0, 1);
      }

      return clamp(root.scrollTop / span, 0, 1);
    };

    const tick = () => {
      const settings = propsRef.current;

      const smoothingFactor =
        settings.smoothing <= 0
          ? 1
          : 1 - Math.exp(-1 / (60 * settings.smoothing));

      current += (target - current) * smoothingFactor;

      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }

      applyProgress(current);

      animationFrame = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;

      running = true;

      if (!animationFrame) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    const onScroll = () => {
      target = readProgress();

      if (propsRef.current.smoothing <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
        return;
      }

      kick();
    };

    const onResize = () => {
      measure();

      target = readProgress();
      current = target;

      applyProgress(current);
    };

    measure();

    target = readProgress();
    current = target;

    applyProgress(current);

    const scroller = useWindowScroll ? window : root;

    scroller.addEventListener("scroll", onScroll, { passive: true });

    window.addEventListener("resize", onResize);

    const resizeObserver = new ResizeObserver(onResize);

    resizeObserver.observe(root);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      scroller.removeEventListener("scroll", onScroll);

      window.removeEventListener("resize", onResize);

      resizeObserver.disconnect();
    };
  }, [applyProgress, useWindowScroll]);

  const media =
    mediaType === "video" ? (
      <video
        ref={mediaRef}
        className="scroll-expand__media"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
      />
    ) : (
      <img
        ref={mediaRef}
        className="scroll-expand__media"
        src={src}
        alt={alt}
        draggable={false}
      />
    );

  return (
    <div
      ref={rootRef}
      className={`scroll-expand ${
        useWindowScroll ? "" : "scroll-expand--scroller"
      } ${className}`.trim()}
      style={style}
      {...rest}
    >
      <div ref={trackRef} className="scroll-expand__track">
        <div ref={stageRef} className="scroll-expand__stage">
          <div ref={frameRef} className="scroll-expand__frame">
            {media}

            <div ref={scrimRef} className="scroll-expand__scrim" />

            {children ? (
              <div ref={overlayRef} className="scroll-expand__overlay">
                {children}
              </div>
            ) : null}
          </div>

          {title ? (
            <div ref={titleRef} className="scroll-expand__title">
              {title}
            </div>
          ) : null}

          {scrollHint ? (
            <div ref={hintRef} className="scroll-expand__hint">
              {scrollHint}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ScrollExpand;
