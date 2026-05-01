/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const PortfolioItem = ({
  title,
  location,
  imageClass = "",
  colSpanClass = "",
  delay = 0,
  opacityClass = "",
  isSub = false,
  wrapperClass = "h-full",
}: {
  title: string;
  location: string;
  imageClass?: string;
  colSpanClass?: string;
  delay?: number;
  opacityClass?: string;
  isSub?: boolean;
  wrapperClass?: string;
}) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: delay, ease: [0.16, 1, 0.3, 1] }}
      className={`${colSpanClass} flex flex-col gap-4 group cursor-pointer ${wrapperClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
      role="group"
      aria-label={`${title} in ${location}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
        }
      }}
    >
      <div
        className={`w-full flex-1 ${imageClass} bg-surface-container border border-outline-variant overflow-hidden relative @container`}
      >
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhZfHbO9_gdCnILjH3bf6ETDi2vd-91jHMozI1BlZdy-J6bcoe4DDRSgwW3Gdt6xZgJ7oAmMGK-H_d_zilkoXI_Eja_nSapyBGW-UPooZLqOZC32w75aY63fnLLJjCrnrzKaVOXlLvFvtC-udbZETGfw_TGk3oKDVJYNzBphtTN2HbwN1iUvYSAeOd18lOPiK9ILbrQkWeCvvnirE8Dzhr7cH4BkjIM620_JKlrq2QZlrF3CN0CiH6nfxIUNESrTt2hqi_4rB-Nmdk"
          alt={`Image of ${title}`}
          width="1920"
          height="1080"
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] grayscale group-hover:grayscale-0 group-hover:scale-105 ${opacityClass || "opacity-100"} group-hover:opacity-100 origin-center`}
        />
        <div className="absolute inset-0 z-10 border border-transparent group-hover:border-brand-teal transition-colors duration-500 pointer-events-none"></div>
      </div>
      <div className="flex flex-col @sm:flex-row justify-between @sm:items-end border-b border-outline-variant group-hover:border-brand-teal/50 pb-2 transition-colors duration-500 gap-2 @sm:gap-0">
        <h3
          className={
            isSub
              ? "font-mono font-medium text-ui-label text-on-surface group-hover:text-brand-teal transition-colors duration-500"
              : "font-serif text-h2 text-on-surface group-hover:text-brand-teal transition-colors duration-500"
          }
        >
          {title}
        </h3>
        <span
          className={
            isSub
              ? "font-mono text-on-surface-variant text-[11px] uppercase tracking-widest @sm:text-right"
              : "font-mono text-on-surface-variant text-mono-data uppercase tracking-widest @sm:text-right"
          }
        >
          {location}
        </span>
      </div>
    </motion.article>
  );
};

export default function App() {
  const [isInverted, setIsInverted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success"
  >("idle");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
      form.reset();
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1500);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    // Cleanup to ensure we don't leave the body locked
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const statement = document.getElementById("statement");
    const contact = document.getElementById("contact");
    const targets = [statement, contact].filter(Boolean) as HTMLElement[];

    const activeSections = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSections.add(entry.target);
          } else {
            activeSections.delete(entry.target);
          }
        });
        setIsInverted(activeSections.size > 0);
      },
      {
        rootMargin: "-20% 0px -20% 0px",
      },
    );

    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-background text-on-background font-mono text-body-md antialiased overflow-x-hidden selection:bg-brand-teal selection:text-surface">
      <a
        href="#overview"
        className="sr-only focus:not-sr-only focus:absolute focus:top-6 focus:left-6 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-teal focus:text-surface focus:font-mono focus:uppercase focus:tracking-widest focus:text-[12px] focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Ambient Stage Lighting Background (Global) */}
      <div className="fixed top-[-20%] left-[-10%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-brand-teal blur-[120px] md:blur-[180px] pointer-events-none ambient-light-1 z-0"></div>
      <div className="fixed bottom-[-10%] right-[-20%] w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] rounded-full bg-brand-orange blur-[120px] md:blur-[180px] pointer-events-none ambient-light-2 z-0"></div>

      {/* Floorplan Blueprint Grid (Global) */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
          linear-gradient(var(--color-outline-variant) 1px, transparent 1px),
          linear-gradient(90deg, var(--color-outline-variant) 1px, transparent 1px)
        `,
          backgroundSize: "40px 40px",
          opacity: 0.15,
        }}
      ></div>

      {/* Header & Nav */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-colors duration-300 h-[72px] border-b ${
          isInverted
            ? "bg-brand-linen border-transparent"
            : "bg-surface border-outline-variant"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="flex justify-between items-center py-4 px-6 md:px-12 w-full h-full"
        >
          <div className="hidden md:flex gap-8">
            <a
              className={`font-mono text-[12px] uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 ${isInverted ? "text-surface/60 hover:text-surface focus-visible:ring-offset-brand-linen" : "text-outline hover:text-on-surface focus-visible:ring-offset-background"}`}
              href="#services"
            >
              Services
            </a>
            <a
              className={`font-mono text-[12px] uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 ${isInverted ? "text-surface/60 hover:text-surface focus-visible:ring-offset-brand-linen" : "text-outline hover:text-on-surface focus-visible:ring-offset-background"}`}
              href="#portfolio"
            >
              Work
            </a>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2">
            <a
              aria-label="Home"
              className={`font-serif text-[15px] tracking-widest uppercase flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 ${isInverted ? "text-surface focus-visible:ring-offset-brand-linen" : "text-on-surface focus-visible:ring-offset-background"}`}
              href="/"
            >
              SIGNAL <span className="text-brand-teal">/</span> Studio
            </a>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <a
              className={`hidden md:inline-block font-mono text-[12px] uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 ${isInverted ? "text-surface/60 hover:text-surface focus-visible:ring-offset-brand-linen" : "text-outline hover:text-on-surface focus-visible:ring-offset-background"}`}
              href="#studio"
            >
              About
            </a>
            <a
              className={`hidden md:inline-block font-mono text-[12px] uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 ${isInverted ? "text-surface/60 hover:text-surface focus-visible:ring-offset-brand-linen" : "text-outline hover:text-on-surface focus-visible:ring-offset-background"}`}
              href="#contact"
            >
              Contact
            </a>
            <a
              href="#contact"
              className="hidden md:inline-flex items-center justify-center min-h-[44px] bg-brand-teal text-surface font-mono font-medium text-[12px] uppercase tracking-widest py-2 px-4 md:px-6 rounded-none hover:bg-brand-teal/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              _ CONNECT
            </a>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden font-mono text-[12px] uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 min-h-[44px] min-w-[44px] flex items-center justify-center ${isInverted ? "text-surface/60 hover:text-surface focus-visible:ring-offset-brand-linen" : "text-outline hover:text-on-surface focus-visible:ring-offset-background"}`}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-30 md:hidden flex flex-col justify-center items-center gap-8 px-6 pb-24"
          >
            <a
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-serif text-h1 text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              href="#services"
            >
              Services
            </a>
            <a
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-serif text-h1 text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              href="#portfolio"
            >
              Work
            </a>
            <a
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-serif text-h1 text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              href="#studio"
            >
              Studio
            </a>
            <a
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-serif text-h1 text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background mt-4"
              href="#contact"
            >
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main
        id="overview"
        className="w-full flex flex-col items-center pt-[72px] focus-visible:outline-none"
        tabIndex={-1}
      >
        <div className="w-full flex flex-col items-center">
          {/* Hero */}
          <section className="relative w-full bg-background/60 backdrop-blur-md flex justify-center pb-16 md:pb-24 border-b border-outline-variant z-10">
            <div className="w-full max-w-[1160px] flex flex-col gap-6 relative z-10 px-6 md:px-12 pt-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-1"
              >
                <span className="font-mono text-mono-data text-brand-teal uppercase tracking-widest">
                  [ SIGNAL STUDIO ]
                </span>
                <h1 className="font-serif text-display-xl text-on-surface uppercase leading-tight">
                  Spatial Design & Event Architecture.
                </h1>
                <p className="font-mono text-body-lg text-on-surface-variant">
                  シグナル・スタジオ
                </p>
              </motion.div>

              <hr className="border-outline-variant w-full my-4" />

              <div className="w-full aspect-[4/3] md:aspect-video bg-surface border border-outline-variant relative overflow-hidden flex items-center justify-center">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhZfHbO9_gdCnILjH3bf6ETDi2vd-91jHMozI1BlZdy-J6bcoe4DDRSgwW3Gdt6xZgJ7oAmMGK-H_d_zilkoXI_Eja_nSapyBGW-UPooZLqOZC32w75aY63fnLLJjCrnrzKaVOXlLvFvtC-udbZETGfw_TGk3oKDVJYNzBphtTN2HbwN1iUvYSAeOd18lOPiK9ILbrQkWeCvvnirE8Dzhr7cH4BkjIM620_JKlrq2QZlrF3CN0CiH6nfxIUNESrTt2hqi_4rB-Nmdk"
                  alt="Event architecture blueprint"
                  fetchPriority="high"
                  width="1920"
                  height="1080"
                  decoding="async"
                  className="absolute inset-0 z-0 w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4">
                <div className="md:col-span-8 font-mono text-body-md text-on-surface-variant">
                  We design and execute high-impact corporate summits, product
                  launches, and immersive exhibitions with architectural
                  discipline. We engineer environments that perform precisely as
                  intended.
                </div>
                <div className="md:col-span-4 flex justify-start md:justify-end gap-4 items-start">
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById("services")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="border border-outline text-on-surface font-mono font-medium text-ui-label py-3 px-6 rounded-none hover:bg-surface-container transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background min-h-[48px] inline-flex items-center justify-center"
                  >
                    Explore
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="bg-brand-teal text-surface font-mono font-medium text-ui-label py-3 px-6 rounded-none hover:bg-brand-teal/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background min-h-[48px] inline-flex items-center justify-center"
                  >
                    Engage
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 02 (STATEMENT) */}
          <section
            className="w-full bg-brand-linen text-surface py-16 md:py-24 flex justify-center border-y border-outline-variant"
            id="statement"
          >
            <div className="w-full max-w-[1160px] px-6 md:px-12 text-center">
              <h2 className="font-serif text-h1 max-w-3xl mx-auto font-bold leading-tight">
                Precision is not a feature. It is the only deliverable.
              </h2>
            </div>
          </section>

          {/* SECTION 03 (SERVICES) */}
          <div className="w-full bg-surface/90 backdrop-blur-xl flex justify-center shadow-xl z-10">
            <section
              className="py-16 md:py-24 px-6 md:px-12 w-full max-w-[1160px]"
              id="services"
            >
              <div className="mb-12">
                <span className="font-mono text-brand-teal uppercase tracking-widest text-mono-data">
                  [ SERVICES ]
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-brand-teal/30">
                <div className="border-b md:border-b-0 md:border-r border-brand-teal/30 p-8 pt-12 flex flex-col gap-4 md:gap-6">
                  <h3 className="font-serif text-h2 text-on-surface">
                    Spatial Engineering
                  </h3>
                  <p className="font-mono text-body-md text-on-surface-variant">
                    Rigorous layout planning ensuring optimal flow, sightlines,
                    and interaction density. Every square meter is calibrated
                    for purpose.
                  </p>
                </div>
                <div className="border-b md:border-b-0 md:border-r border-brand-teal/30 p-8 pt-12 flex flex-col gap-4 md:gap-6">
                  <h3 className="font-serif text-h2 text-on-surface">
                    Lighting & Acoustics
                  </h3>
                  <p className="font-mono text-body-md text-on-surface-variant">
                    Lighting, acoustics, and acoustic treatments designed to
                    subconsciously guide attendee focus and emotional state.
                    Perfect sound across large-scale spaces.
                  </p>
                </div>
                <div className="p-8 pt-12 flex flex-col gap-4 md:gap-6">
                  <h3 className="font-serif text-h2 text-on-surface">
                    Guest Flow & Logistics
                  </h3>
                  <p className="font-mono text-body-md text-on-surface-variant">
                    Flawless execution of underlying infrastructure. Venue
                    layout, ticketing logic, and crowd management handled with
                    zero tolerance for failure.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* SECTION 04 (ABOUT) */}
          <div className="w-full bg-background/80 backdrop-blur-xl border-t border-outline-variant flex justify-center shadow-xl z-10">
            <section
              className="py-16 md:py-24 px-6 md:px-12 w-full max-w-[1160px]"
              id="studio"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                <div className="flex flex-col gap-8">
                  <span className="font-mono text-brand-teal uppercase tracking-widest text-mono-data">
                    [ 02 ] THE STUDIO
                  </span>
                  <h2 className="font-serif text-h1 text-on-surface leading-tight">
                    Form follows function. Always.
                  </h2>
                  <p className="font-mono text-body-md text-on-surface-variant">
                    Founded in Tokyo, SIGNAL operates on the principle that
                    events are temporary structures that require permanent-level
                    architectural discipline. We do not decorate; we design
                    systems for human interaction.
                  </p>
                </div>
                <div className="grid grid-cols-2 grid-rows-2 gap-0 border border-brand-teal/30">
                  <div className="border-r border-b border-brand-teal/30 p-8 flex flex-col justify-center">
                    <span className="font-serif text-[48px] text-on-surface leading-none">
                      14
                    </span>
                    <span className="font-mono text-on-surface-variant uppercase tracking-widest text-[11px] mt-2">
                      Cities Deployed
                    </span>
                  </div>
                  <div className="border-b border-brand-teal/30 p-8 flex flex-col justify-center">
                    <span className="font-serif text-[48px] text-on-surface leading-none">
                      0
                    </span>
                    <span className="font-mono text-on-surface-variant uppercase tracking-widest text-[11px] mt-2">
                      System Failures
                    </span>
                  </div>
                  <div className="border-r border-brand-teal/30 p-8 flex flex-col justify-center">
                    <span className="font-serif text-[48px] text-on-surface leading-none">
                      8<span className="text-[32px]">M</span>
                    </span>
                    <span className="font-mono text-on-surface-variant uppercase tracking-widest text-[11px] mt-2">
                      Sq.M Planned
                    </span>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <span className="font-serif text-[48px] text-on-surface leading-none">
                      12
                    </span>
                    <span className="font-mono text-on-surface-variant uppercase tracking-widest text-[11px] mt-2">
                      Core Engineers
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* SECTION 05 (CONTACT BAND) */}
          <section
            className="w-full bg-brand-teal text-surface py-8 md:py-12 flex justify-center"
            id="stat-band"
          >
            <div className="w-full max-w-[1160px] px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
              <span className="font-mono uppercase tracking-widest font-medium text-[13px]">
                CAPACITY: 50–5000+ GUESTS
              </span>
              <span className="font-mono uppercase tracking-widest font-medium text-[13px]">
                FORMAT: HYBRID & IN-PERSON
              </span>
              <span className="font-mono uppercase tracking-widest font-medium text-[13px]">
                DEPLOYMENT: GLOBAL EXCELLENCE
              </span>
            </div>
          </section>

          {/* SECTION 06 (PORTFOLIO) */}
          <div className="w-full bg-surface/90 backdrop-blur-xl flex justify-center border-t border-outline-variant z-10">
            <section
              className="py-16 md:py-24 px-6 md:px-12 w-full max-w-[1160px]"
              id="portfolio"
            >
              <div className="mb-12">
                <span className="font-mono text-brand-teal uppercase tracking-widest text-mono-data">
                  [ 03 ] ARCHIVE
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                <PortfolioItem
                  title="Project: NEXUS"
                  location="GLOBAL SUMMIT / TOKYO 2023"
                  imageClass="min-h-[300px]"
                  colSpanClass="md:col-span-8"
                  delay={0.1}
                />

                <div className="md:col-span-4 flex flex-col gap-8 justify-between">
                  <PortfolioItem
                    title="Project: APEX"
                    location="PRODUCT LAUNCH / KYOTO"
                    imageClass="aspect-video md:aspect-square"
                    colSpanClass="w-full"
                    wrapperClass=""
                    opacityClass="opacity-70"
                    isSub={true}
                    delay={0.2}
                  />
                  <PortfolioItem
                    title="Project: CORE"
                    location="IMMERSIVE EXPO / OSAKA"
                    imageClass="aspect-video md:aspect-square"
                    colSpanClass="w-full"
                    wrapperClass=""
                    opacityClass="opacity-50"
                    isSub={true}
                    delay={0.3}
                  />
                </div>

                <PortfolioItem
                  title="Project: VERTEX"
                  location="ACTIVATION / SHIBUYA 2024"
                  imageClass="aspect-[16/9]"
                  colSpanClass="md:col-span-8"
                  delay={0.1}
                />
                <PortfolioItem
                  title="Project: QUARTZ"
                  location="AWARDS GALA / GINZA"
                  imageClass="min-h-[200px]"
                  colSpanClass="md:col-span-4"
                  opacityClass="opacity-80"
                  isSub={true}
                  delay={0.2}
                />

                <PortfolioItem
                  title="Project: PULSE"
                  location="PRIVATE SHOW / MINATO"
                  imageClass="aspect-[4/3] md:aspect-square"
                  colSpanClass="md:col-span-4"
                  wrapperClass=""
                  opacityClass="opacity-60"
                  isSub={true}
                  delay={0.1}
                />
                <PortfolioItem
                  title="Project: RADIUS"
                  location="TECH SYMPOSIUM / ROPPONGI 2024"
                  imageClass="min-h-[200px]"
                  colSpanClass="md:col-span-8"
                  delay={0.2}
                />
              </div>
            </section>
          </div>

          {/* SECTION 07 (PACKAGES) */}
          <div className="w-full bg-background border-t border-outline-variant flex justify-center z-10">
            <section
              className="py-16 md:py-24 px-6 md:px-12 w-full max-w-[1160px]"
              id="packages"
            >
              <div className="mb-12 text-center">
                <h2 className="font-serif text-[40px] text-on-surface">
                  Engagement Models
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="border border-outline-variant p-8 flex flex-col gap-6 bg-surface">
                  <div className="border-b border-outline-variant pb-4">
                    <span className="font-serif text-h2 text-on-surface block mt-2">
                      Blueprint
                    </span>
                  </div>
                  <ul className="space-y-4 font-mono text-on-surface-variant text-[14px] min-h-[160px]">
                    <li className="flex items-start gap-3">
                      <span className="text-brand-teal font-bold">—</span> Core
                      Spatial Plan
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-teal font-bold">—</span>{" "}
                      Standard Atmosphere
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-teal font-bold">—</span> Basic
                      Logistics
                    </li>
                  </ul>
                  <button
                    type="button"
                    onClick={() => {
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-4 border border-outline text-on-surface font-mono font-medium text-ui-label py-3 px-6 rounded-none hover:bg-surface-container transition-colors w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background min-h-[48px] inline-flex items-center justify-center"
                  >
                    Request Details
                  </button>
                </div>

                <div className="border border-brand-teal p-8 flex flex-col gap-6 bg-brand-linen text-surface shadow-2xl relative">
                  <div className="border-b border-surface/20 pb-4">
                    <span className="font-serif text-[40px] text-surface block mt-2 leading-tight">
                      Structure
                    </span>
                  </div>
                  <ul className="space-y-4 font-mono text-surface/80 text-[14px] min-h-[160px]">
                    <li className="flex items-start gap-3">
                      <span className="text-brand-teal font-bold">—</span>{" "}
                      Advanced Spatial Flow
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-teal font-bold">—</span>{" "}
                      Precision Atmosphere
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-teal font-bold">—</span> Full
                      Tech Infrastructure
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-teal font-bold">—</span>{" "}
                      Dedicated Engineer
                    </li>
                  </ul>
                  <button
                    type="button"
                    onClick={() => {
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-4 bg-brand-teal text-surface font-mono font-medium text-ui-label py-3 px-6 rounded-none hover:bg-brand-teal/80 transition-colors w-full tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-brand-teal min-h-[48px] inline-flex items-center justify-center"
                  >
                    Get Started
                  </button>
                </div>

                <div className="border border-outline-variant p-8 flex flex-col gap-6 bg-surface">
                  <div className="border-b border-outline-variant pb-4">
                    <span className="font-serif text-h2 text-on-surface block mt-2">
                      Custom
                    </span>
                  </div>
                  <ul className="space-y-4 font-mono text-on-surface-variant text-[14px] min-h-[160px]">
                    <li className="flex items-start gap-3">
                      <span className="text-brand-teal font-bold">—</span>{" "}
                      Bespoke Architecture
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-teal font-bold">—</span>{" "}
                      Experimental Formats
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-brand-teal font-bold">—</span>{" "}
                      Infinite Scalability
                    </li>
                  </ul>
                  <button
                    type="button"
                    onClick={() => {
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-4 border border-outline text-on-surface font-mono font-medium text-ui-label py-3 px-6 rounded-none hover:bg-surface-container transition-colors w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background min-h-[48px] inline-flex items-center justify-center"
                  >
                    Consult
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* SECTION 10 (TESTIMONIALS) */}
          <div className="w-full bg-surface/90 backdrop-blur-xl border-t border-outline-variant flex justify-center shadow-xl z-10">
            <section
              className="py-16 md:py-24 px-6 md:px-12 w-full max-w-[1160px]"
              id="testimonials"
            >
              <div className="mb-12">
                <span className="font-mono text-brand-teal uppercase tracking-widest text-mono-data">
                  [ 05 ] DATA LOGS
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-brand-teal/30">
                <div className="border-b md:border-b-0 md:border-r border-brand-teal/30 p-8 pt-12">
                  <p className="font-mono text-body-md text-on-surface-variant mb-6 leading-relaxed">
                    "Flawless execution. The spatial flow completely eliminated
                    bottlenecks we usually see at this scale."
                  </p>
                  <span className="font-mono text-on-surface text-[11px] uppercase tracking-widest block font-medium">
                    VP Marketing, TechNova (5000+ Guest Summit)
                  </span>
                </div>
                <div className="border-b md:border-b-0 md:border-r border-brand-teal/30 p-8 pt-12">
                  <p className="font-mono text-body-md text-on-surface-variant mb-6 leading-relaxed">
                    "SIGNAL doesn't just build sets; they engineer environments
                    that force a shift in perspective. Incredible product
                    launch."
                  </p>
                  <span className="font-mono text-on-surface text-[11px] uppercase tracking-widest block font-medium">
                    Head of Brand, Apex Corp (Product Launch)
                  </span>
                </div>
                <div className="p-8 pt-12">
                  <p className="font-mono text-body-md text-on-surface-variant mb-6 leading-relaxed">
                    "Precision delivered exactly as promised. The lighting and
                    acoustic control were unparalleled across all venues."
                  </p>
                  <span className="font-mono text-on-surface text-[11px] uppercase tracking-widest block font-medium">
                    Event Director, KINETIC (Multi-City Tour)
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* SECTION 09 (CONTACT) */}
          <section
            className="w-full bg-brand-linen text-surface py-16 md:py-24 flex justify-center border-y border-outline-variant z-20 shadow-2xl"
            id="contact"
          >
            <div className="w-full max-w-[1160px] px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-brand-teal uppercase tracking-widest font-bold text-[14px]">
                  [ REQUEST CONSULTATION ]
                </span>
                <h2 className="font-serif text-h1 leading-tight text-surface">
                  Initiate Project
                </h2>
                <p className="font-mono text-body-lg text-surface/80 mt-2 mb-8 max-w-md">
                  Reserve a strategy session with our lead architects to discuss
                  your upcoming event requirements and evaluate our capacity.
                </p>

                <div className="bg-surface/10 p-6 border border-surface/20 flex gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="font-serif text-2xl">
                      48
                      <span className="text-sm font-mono text-brand-teal">
                        HR
                      </span>
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-surface/60">
                      Response SLA
                    </span>
                  </div>
                  <div className="w-px bg-surface/20"></div>
                  <div className="flex flex-col gap-2">
                    <span className="font-serif text-2xl">
                      0
                      <span className="text-sm font-mono text-brand-teal">
                        FEE
                      </span>
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-surface/60">
                      Initial Briefing
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-surface p-8 shadow-2xl border-t-4 border-brand-teal text-on-surface">
                <form
                  className="flex flex-col gap-6 w-full"
                  onSubmit={handleFormSubmit}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="name-input"
                        className="font-mono text-[11px] text-on-surface-variant uppercase tracking-widest font-bold"
                      >
                        Full Name *
                      </label>
                      <input
                        id="name-input"
                        required
                        className="bg-background border border-outline-variant p-3 focus:outline-none focus:border-brand-teal font-mono text-[16px] md:text-body-md transition-colors min-h-[48px]"
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="company-input"
                        className="font-mono text-[11px] text-on-surface-variant uppercase tracking-widest font-bold"
                      >
                        Company *
                      </label>
                      <input
                        id="company-input"
                        required
                        className="bg-background border border-outline-variant p-3 focus:outline-none focus:border-brand-teal font-mono text-[16px] md:text-body-md transition-colors min-h-[48px]"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="email-input"
                        className="font-mono text-[11px] text-on-surface-variant uppercase tracking-widest font-bold"
                      >
                        Work Email *
                      </label>
                      <input
                        id="email-input"
                        required
                        className="bg-background border border-outline-variant p-3 focus:outline-none focus:border-brand-teal font-mono text-[16px] md:text-body-md transition-colors min-h-[48px]"
                        type="email"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="scale-input"
                        className="font-mono text-[11px] text-on-surface-variant uppercase tracking-widest font-bold"
                      >
                        Est. Attendees
                      </label>
                      <select
                        id="scale-input"
                        className="bg-background border border-outline-variant p-3 focus:outline-none focus:border-brand-teal font-mono text-[16px] md:text-body-md transition-colors appearance-none min-h-[48px]"
                      >
                        <option value="50-200">50 - 200 (Executive)</option>
                        <option value="200-1000">200 - 1000 (Mid-Scale)</option>
                        <option value="1000-5000">1000 - 5000 (Summit)</option>
                        <option value="5000+">5000+ (Festival/Expo)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-2">
                    <label
                      htmlFor="params-input"
                      className="font-mono text-[11px] text-on-surface-variant uppercase tracking-widest font-bold"
                    >
                      Project Objective
                    </label>
                    <textarea
                      id="params-input"
                      required
                      placeholder="What is the primary action or feeling you want attendees to leave with?"
                      className="bg-background border border-outline-variant p-3 focus:outline-none focus:border-brand-teal font-mono text-[16px] md:text-body-md resize-none h-24 transition-colors placeholder:text-on-surface-variant/40"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={formStatus !== "idle"}
                    aria-live="polite"
                    className="bg-brand-teal text-surface font-mono font-medium text-ui-label py-4 px-8 mt-2 hover:bg-brand-teal/90 transition-colors w-full tracking-widest uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                  >
                    {formStatus === "idle"
                      ? "Submit Project Brief"
                      : formStatus === "submitting"
                        ? "Transmitting..."
                        : "Brief Received"}
                  </button>
                  <p className="font-mono text-[10px] text-center text-on-surface-variant uppercase tracking-widest mt-2">
                    Protected by reCAPTCHA & Privacy Policy
                  </p>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#050607] border-t-2 border-brand-teal">
        <div className="flex flex-col md:grid md:grid-cols-3 gap-8 p-12 md:p-16 max-w-[1160px] mx-auto text-on-surface">
          <div>
            <span className="font-serif text-[24px] font-normal tracking-wide block mb-4">
              SIGNAL
            </span>
            <p className="font-mono text-[11px] text-on-surface-variant uppercase tracking-widest">
              Architectural Event Design
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <a
                className="font-mono text-[11px] uppercase tracking-widest text-on-surface-variant hover:text-brand-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-[#050607] py-2 md:py-0 min-h-[44px] md:min-h-0 flex items-center md:inline-block"
                href="/"
              >
                Manifesto
              </a>
              <a
                className="font-mono text-[11px] uppercase tracking-widest text-on-surface-variant hover:text-brand-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-[#050607] py-2 md:py-0 min-h-[44px] md:min-h-0 flex items-center md:inline-block"
                href="/"
              >
                Capabilities
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <a
                className="font-mono text-[11px] uppercase tracking-widest text-on-surface-variant hover:text-brand-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-[#050607] py-2 md:py-0 min-h-[44px] md:min-h-0 flex items-center md:inline-block"
                href="/"
              >
                Privacy
              </a>
              <a
                className="font-mono text-[11px] uppercase tracking-widest text-on-surface-variant hover:text-brand-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-[#050607] py-2 md:py-0 min-h-[44px] md:min-h-0 flex items-center md:inline-block"
                href="/"
              >
                Terms
              </a>
            </div>
          </div>
          <div className="flex flex-col md:justify-end md:items-end mt-8 md:mt-0">
            <p className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">
              © 2024 SIGNAL STUDIO. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
