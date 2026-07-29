"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Globe2, Settings2, Flame, ShieldCheck, Play } from "lucide-react";
import FadingVideoPlaylist from "./FadingVideoPlaylist";
import BlurText from "./BlurText";

const PLAYLIST = ["/videos/val0.mp4", "/videos/val0.1.mp4", "/videos/val1.mp4"];

const fadeUp = {
  initial: { filter: "blur(10px)", opacity: 0, y: 20 },
  animate: { filter: "blur(0px)", opacity: 1, y: 0 },
};

const STATS = [
  { icon: Clock, value: "35+", label: "Years of Precision Manufacturing" },
  { icon: Globe2, value: "100+", label: "Industries Served, India & Abroad" },
];

const INDUSTRY_NAMES = ["Refineries", "Fertilizers", "Pharma", "Food Processing", "Gas Plants"];

const CAPABILITIES = [
  {
    icon: Settings2,
    tags: ["Multi-Spindle Turning", "Ball Turning Heads", "Surface Grinding", "±0.02mm Tolerance"],
    title: "CNC Precision Machining",
    body: "Vertical turret lathes, horizontal boring machines and special purpose ball-turning machines shape every valve body to exact tolerance, run after run.",
  },
  {
    icon: Flame,
    tags: ["IS:318 Gr. LTB2", "Sand Casting", "Shot Blasting", "Submerged Arc Welding"],
    title: "Gun Metal Casting Unit",
    body: "Our in-house casting unit pours gun metal and carbon steel to IS and ASTM specification, then shot-blasts and welds every casting clean before it reaches the lathe.",
  },
  {
    icon: ShieldCheck,
    tags: ["Hydraulic Testing", "Pneumatic Testing", "PMI Verified", "Third-Party Inspection"],
    title: "Testing & Inspection",
    body: "Every valve is hydraulically and pneumatically tested well above its rated pressure, with positive material identification and third-party inspection available on request.",
  },
];

interface InfrastructureShowcaseProps {
  headingClass: string;
  bodyClass: string;
}

export default function InfrastructureShowcase({
  headingClass,
  bodyClass,
}: InfrastructureShowcaseProps) {
  return (
    <>
      {/* ---------------------------------------------------------------- *
       * Hero — looping facility footage, liquid-glass chrome on black.
       * ---------------------------------------------------------------- */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-black">
        <FadingVideoPlaylist
          sources={PLAYLIST}
          className="absolute left-1/2 top-0 z-0 -translate-x-1/2 object-cover object-top"
          style={{ width: "120%", height: "120%" }}
        />
        {/*
          Real facility footage (unlike a curated dark space video) swings from
          dim workshop corners to bright paperwork/steel close-ups. Plain white
          text with "no overlay" disappears on the bright frames, so a scrim
          sits between the video and the content to keep contrast readable no
          matter what the camera is pointed at.
        */}
        <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-b from-black/60 via-black/30 to-black/65" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-16 pb-10">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="liquid-glass mb-6 flex items-center rounded-full pr-3"
          >
            <span className="mr-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
              Since 1988
            </span>
            <span className={`${bodyClass} text-sm text-white/90`}>
              ISO 9001:2008 Certified Manufacturing Facility — Ludhiana, Punjab
            </span>
          </motion.div>

          <BlurText
            text="Precision Engineered Beyond Every Tolerance"
            className={`${headingClass} max-w-3xl text-center text-5xl italic leading-[0.9] tracking-[-2px] text-white sm:text-6xl lg:text-[5rem] lg:leading-[0.85] lg:tracking-[-4px]`}
          />

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
            className={`${bodyClass} mt-5 max-w-2xl text-center text-sm font-light leading-tight text-white sm:text-base`}
          >
            Step inside our Ludhiana manufacturing facility — CNC turning, gun metal casting and
            hydraulic testing lines that turn raw castings into valves trusted across India and
            abroad.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.1 }}
            className="mt-6 flex items-center gap-6"
          >
            <a
              href="#capabilities"
              className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
            >
              Explore Our Machinery
            </a>
            <Link
              href="/products"
              className={`${bodyClass} inline-flex items-center gap-2 text-sm font-medium text-white hover:text-white/80`}
            >
              <Play className="h-4 w-4 fill-white" />
              View Product Range
            </Link>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.3 }}
            className="mt-8 flex items-stretch gap-4"
          >
            {STATS.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="liquid-glass w-[190px] rounded-[1.25rem] p-5 sm:w-[220px]"
              >
                <Icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                <div className={`${headingClass} mt-4 text-3xl italic leading-none tracking-[-1px] text-white sm:text-4xl`}>
                  {value}
                </div>
                <p className={`${bodyClass} mt-2 text-xs font-light text-white`}>{label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
            className="mt-auto flex flex-col items-center gap-4 pt-8"
          >
            <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white">
              Trusted by process industries across India &amp; abroad
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 sm:gap-x-12">
              {INDUSTRY_NAMES.map((name) => (
                <span
                  key={name}
                  className={`${headingClass} text-xl italic tracking-tight text-white/90 sm:text-2xl`}
                >
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- *
       * Capabilities — same playlist treatment, full-bleed, no crop offset.
       * ---------------------------------------------------------------- */}
      <section id="capabilities" className="relative min-h-screen w-full overflow-hidden bg-black">
        <FadingVideoPlaylist
          sources={PLAYLIST}
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-b from-black/65 via-black/25 to-black/40" />

        <div className="relative z-10 flex min-h-screen flex-col px-6 pb-10 pt-20 sm:px-10 lg:px-16">
          <div className="mb-auto">
            <p className={`${bodyClass} mb-4 text-sm text-white/80 sm:mb-6`}>{"// Infrastructure"}</p>
            <h2
              className={`${headingClass} text-5xl italic leading-[0.9] tracking-[-2px] text-white sm:text-6xl lg:text-[5.5rem] lg:tracking-[-3px]`}
            >
              Raw Casting to
              <br />
              Precision Valves
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-3">
            {CAPABILITIES.map(({ icon: Icon, tags, title, body }) => (
              <div
                key={title}
                className="liquid-glass flex min-h-[320px] flex-col rounded-[1.25rem] p-6 sm:min-h-[360px]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="liquid-glass flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[0.75rem]">
                    <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="flex max-w-[70%] flex-wrap justify-end gap-1.5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className={`${bodyClass} liquid-glass whitespace-nowrap rounded-full px-3 py-1 text-[11px] text-white/90`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-1" />

                <div className="mt-6">
                  <h3 className={`${headingClass} text-2xl italic leading-none tracking-[-1px] text-white sm:text-3xl`}>
                    {title}
                  </h3>
                  <p className={`${bodyClass} mt-3 max-w-[34ch] text-sm font-light leading-snug text-white/90`}>
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
