"use client";

import ScrollExpand from "./ScrollExpand";
import Profile1 from "../images/profile4.jpg";

const FeaturedProfile = () => {
  return (
    <section
      id="featured-profile"
      className="relative block bg-[#F6F3EC]"
      style={{
        height: "255vh",
      }}
    >
      <ScrollExpand
        src={Profile1}
        alt="Boluwatife Akotun"
        title="DATA. INSIGHT. IMPACT."
        scrollHint="Scroll to explore"
        startWidth={52}
        startHeight={64}
        startRadius={24}
        endRadius={0}
        mediaZoom={1.08}
        scrollDistance={1.2}
        holdDistance={0.35}
        smoothing={0.08}
        overlayScrim={0.52}
        useWindowScroll
      >
        <div className="flex w-full max-w-[min(88vw,900px)] flex-col items-center justify-center px-6 text-center md:max-w-[min(78vw,850px)] lg:max-w-[760px]">
          <span className="mb-4 font-['Inter'] text-[10px] font-bold uppercase tracking-[0.2em] text-white/85 md:text-[12px] lg:text-[13px]">
            Business Data Analyst
          </span>

          <h2 className="max-w-[90%] font-['Inter'] text-[30px] font-bold leading-[1.05] tracking-[-0.03em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] md:max-w-[700px] md:text-[52px] lg:max-w-[700px] lg:text-[64px]">
            Turning data into
            <br />
            smarter decisions.
          </h2>

          <p className="mt-5 max-w-[85%] font-['Inter'] text-[12px] leading-[1.7] text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] md:max-w-[580px] md:text-[15px] lg:max-w-[560px] lg:text-[16px]">
            I transform complex business data into clear, actionable insights
            using Power BI, SQL, and Excel.
          </p>
        </div>
      </ScrollExpand>
    </section>
  );
};

export default FeaturedProfile;