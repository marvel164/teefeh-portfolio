"use client";

import ScrollExpand from "./ScrollExpand";
import Profile1 from "../images/profile1.jpg";

const FeaturedProfile = () => {
  return (
    <section
      id="featured-profile"
      className="relative block bg-[#F6F3EC] md:hidden"
      style={{
        height: "255vh",
      }}
    >
      <ScrollExpand
        src={Profile1}
        alt="Boluwatife Akotun"
        title="DATA. INSIGHT. IMPACT."
        scrollHint="Scroll to explore"
        startWidth={46}
        startHeight={60}
        startRadius={24}
        endRadius={0}
        mediaZoom={1.3}
        scrollDistance={1.2}
        holdDistance={0.35}
        smoothing={0.08}
        overlayScrim={0.42}
        useWindowScroll
      >
        <div className="flex max-w-3xl flex-col items-center text-center">
          <span className="mb-4 font-['Inter'] text-[11px] font-bold uppercase tracking-[0.22em] text-white/70 md:text-[13px]">
            Business Data Analyst
          </span>

          <h2 className="font-['Inter'] text-[32px] font-bold leading-[1.05] tracking-[-0.03em] text-white md:text-[58px] lg:text-[72px]">
            Turning data into
            <br />
            smarter decisions.
          </h2>

          <p className="mt-6 max-w-xl font-['Inter'] text-[13px] leading-[1.8] text-white/75 md:text-[16px]">
            I transform complex business data into
            clear, actionable insights using Power BI,
            SQL, and Excel.
          </p>
        </div>
      </ScrollExpand>
    </section>
  );
};

export default FeaturedProfile;