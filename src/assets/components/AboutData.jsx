"use client";

import ScrollStack, { ScrollStackItem } from "./ScrollStack";

const AboutData = () => {
  return (
    <section
      id="about-data"
      className="relative overflow-hidden bg-[#F6F3EC]"
    >
      {/* Section heading */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 md:pt-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Label */}
          <span
            className="
              rounded-full
              bg-white
              px-4
              py-1.5
              font-['Inter']
              text-[11px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-[#E31616]
              shadow-[0_4px_20px_rgba(0,0,0,0.08)]
              md:text-[13px]
            "
          >
            More than numbers
          </span>

          {/* Main heading */}
          <h2
            className="
              mt-5
              font-['Inter']
              text-[42px]
              font-bold
              leading-[0.98]
              tracking-[-0.045em]
              text-[#252525]
              md:text-[64px]
              lg:text-[82px]
            "
          >
            Turning data
            <br />
            into direction.
          </h2>

          {/* Description */}
          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-center
              font-['Inter']
              text-[14px]
              font-medium
              leading-[1.7]
              text-[#252525]
              md:mt-5
              md:text-[16px]
              md:leading-[1.8]
            "
          >
            A closer look at how I approach business data, uncover insights,
            and turn analysis into information people can actually use.
          </p>
        </div>
      </div>

      {/* Scroll stack */}
      <ScrollStack
        itemDistance={90}
        itemScale={0.035}
        itemStackDistance={32}
        stackPosition="18%"
        scaleEndPosition="8%"
        baseScale={0.86}
        rotationAmount={0}
        blurAmount={0}
        useWindowScroll
      >
        {/* Card 1 */}
        <ScrollStackItem>
          <span className="scroll-stack-number">01 / PROFILE</span>

          <h3>
            Business
            <br />
            Data Analyst.
          </h3>

          <p>
            I work with business data to transform complex information into
            clear insights that can support smarter decisions.
          </p>

          <span className="scroll-stack-highlight">
            Data → Insight → Impact
          </span>
        </ScrollStackItem>

        {/* Card 2 */}
        <ScrollStackItem>
          <span className="scroll-stack-number">02 / APPROACH</span>

          <h3>
            Find the
            <br />
            story in data.
          </h3>

          <p>
            Numbers become useful when they answer meaningful business
            questions. My focus is on identifying patterns, trends,
            relationships, and opportunities hidden inside datasets.
          </p>
        </ScrollStackItem>

        {/* Card 3 */}
        <ScrollStackItem>
          <span className="scroll-stack-number">03 / TOOLKIT</span>

          <h3>
            Built with
            <br />
            the right tools.
          </h3>

          <p>
            I use practical analytics tools to clean, explore, analyse,
            visualize, and communicate business information.
          </p>

          <div className="scroll-stack-tools">
            <span className="scroll-stack-tool">Power BI</span>
            <span className="scroll-stack-tool">SQL</span>
            <span className="scroll-stack-tool">Excel</span>
          </div>
        </ScrollStackItem>

        {/* Card 4 */}
        <ScrollStackItem>
          <span className="scroll-stack-number">04 / OUTPUT</span>

          <h3>
            Clear
            <br />
            actionable insight.
          </h3>

          <p>
            Good analysis should not leave people staring at another
            spreadsheet. The goal is to communicate findings clearly so
            decision-makers can understand what the data means and what
            deserves attention.
          </p>
        </ScrollStackItem>

        {/* Card 5 */}
        <ScrollStackItem>
          <span className="scroll-stack-number">05 / IMPACT</span>

          <h3>
            Smarter
            <br />
            decisions.
          </h3>

          <p>
            From reporting and dashboards to discovering trends and
            performance patterns, I aim to make business data easier to
            understand and more useful.
          </p>

          <span className="scroll-stack-highlight">
            Make the data speak.
          </span>
        </ScrollStackItem>
      </ScrollStack>
    </section>
  );
};

export default AboutData;