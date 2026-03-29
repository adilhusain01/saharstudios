"use client";

import { useEffect, useRef } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Videography",
    desc: "Cinematic storytelling that captures the essence of your brand in breathtaking 4K/8K resolution.",
    img: "https://images.unsplash.com/photo-1611784728558-6c7d9b409cdf?auto=format&fit=crop&q=80",
  },
  {
    title: "Podcasts",
    desc: "End-to-end production, crystal clear audio, and set design to make your voice resonate globally.",
    img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80",
  },
  {
    title: "Video Editing",
    desc: "Seamless transitions, vibrant color grading, and dynamic pacing. We turn raw footage into masterpieces.",
    img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d??auto=format&fit=crop&q=80",
  },
  {
    title: "Posters",
    desc: "Bold, rule-breaking graphic design and poster art that commands attention and stops scrollers dead.",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80",
  },
  {
    title: "Digital Mktg",
    desc: "Data-backed liquid strategies that adapt to algorithms and flood your brand with conversions.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
  },
];

export default function Home() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const aboutTextRef = useRef<HTMLParagraphElement>(null);
  const servicesContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // --- Custom Cursor & Liquid Orb ---
    let mouseX = 0;
    let mouseY = 0;
    let orbX = 0;
    let orbY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${mouseX}px`;
        cursorDotRef.current.style.top = `${mouseY}px`;
      }

      setTimeout(() => {
        if (cursorOutlineRef.current) {
          cursorOutlineRef.current.style.left = `${mouseX}px`;
          cursorOutlineRef.current.style.top = `${mouseY}px`;
        }
      }, 50);
    };

    window.addEventListener("mousemove", handleMouseMove);

    let orbAnimId: number;
    function animateOrb() {
      orbX += (mouseX - orbX) * 0.05;
      orbY += (mouseY - orbY) * 0.05;
      if (orbRef.current) {
        orbRef.current.style.left = `${orbX}px`;
        orbRef.current.style.top = `${orbY}px`;
      }
      orbAnimId = requestAnimationFrame(animateOrb);
    }
    animateOrb();

    // --- Hero Text Animation ---
    if (heroTextRef.current) {
      const spans = heroTextRef.current.querySelectorAll("span");
      gsap.to(spans, {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.5,
      });
    }

    // --- Scrollytelling About Text ---
    if (aboutTextRef.current) {
      const text = aboutTextRef.current.textContent || "";
      const words = text.split(/\s+/);
      aboutTextRef.current.innerHTML = words
        .map((word) => `<span class="word inline-block">${word}&nbsp;</span>`)
        .join("");

      const wordEls = aboutTextRef.current.querySelectorAll(".word");
      gsap.to(wordEls, {
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: aboutTextRef.current,
          start: "top 80%",
          end: "bottom 40%",
          scrub: 1,
        },
      });
    }

    // --- Horizontal Scroll Services (desktop only) ---
    const isMobile = window.innerWidth < 768;

    if (servicesContainerRef.current && !isMobile) {
      const panels = gsap.utils.toArray<HTMLElement>(".service-panel");

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: servicesContainerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () =>
            "+=" + (servicesContainerRef.current?.offsetWidth || 0),
        },
      });

      // Parallax on images inside panels
      panels.forEach((panel) => {
        const img = panel.querySelector("img");
        if (img) {
          gsap.fromTo(
            img,
            { x: -50, scale: 1.2 },
            {
              x: 50,
              scale: 1,
              scrollTrigger: {
                trigger: panel,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        }
      });
    }

    // Mobile: fade-in service panels on scroll
    if (servicesContainerRef.current && isMobile) {
      const panels = gsap.utils.toArray<HTMLElement>(".service-panel");
      panels.forEach((panel) => {
        gsap.from(panel, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          scrollTrigger: {
            trigger: panel,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          },
        });
      });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(orbAnimId);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <ReactLenis root>
      {/* SVG Gooey Filter — hidden SVG that defines the filter */}
      <svg
        aria-hidden="true"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Liquid Background Orb */}
      <div ref={orbRef} className="liquid-orb" />

      {/* Custom Cursor */}
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorOutlineRef} className="cursor-outline" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-4 md:p-8 flex justify-between items-center z-50 mix-blend-difference">
        <div className="text-xl md:text-2xl font-heading font-bold tracking-tighter">
          SAHAR
          <br />
          STUDIO
        </div>
        <div className="text-xs md:text-sm uppercase tracking-widest cursor-pointer">
          Menu
        </div>
      </nav>

      <main className="relative z-1">
        {/* ===== HERO SECTION ===== */}
        <section className="h-screen flex flex-col justify-center items-center relative gooey-filter bg-transparent">
          <h1
            ref={heroTextRef}
            className="text-[12vw] leading-none text-center uppercase tracking-tighter font-extrabold font-heading relative z-10"
          >
            <span className="block translate-y-20 opacity-0">Sahar</span>
            <span className="block outline-text translate-y-20 opacity-0">
              Studios
            </span>
          </h1>
          <div className="absolute bottom-10 left-6 md:left-10 text-xs md:text-sm tracking-widest uppercase opacity-50">
            Scroll to explore
          </div>
        </section>

        {/* ===== SCROLLYTELLING ABOUT ===== */}
        <section className="relative min-h-screen flex items-center justify-center p-6 md:p-10 z-10 bg-black/40 backdrop-blur-md">
          <div className="max-w-6xl mx-auto">
            <p
              ref={aboutTextRef}
              className="text-xl sm:text-2xl md:text-[4vw] leading-tight font-bold reveal-text font-heading"
            >
              We are a digital powerhouse. Blending cutting-edge videography,
              immersive podcasts, precision video editing, striking poster
              design, and data-driven digital marketing. We don&apos;t just
              follow trends; we create the liquid current that shapes the
              future.
            </p>
          </div>
        </section>

        {/* ===== HORIZONTAL SCROLL SERVICES ===== */}
        <section
          ref={servicesContainerRef}
          className="services-container min-h-screen md:h-screen overflow-visible md:overflow-hidden bg-zinc-950"
        >
          <div className="services-wrapper h-full">
            {services.map((svc, i) => (
              <div key={i} className="service-panel px-4 md:px-10">
                <div className="w-full md:w-1/2">
                  <h2 className="text-[12vw] md:text-[8vw] leading-none uppercase outline-text font-heading">
                    {svc.title}
                  </h2>
                  <p className="text-base md:text-xl mt-4 md:mt-6 max-w-md text-gray-400">
                    {svc.desc}
                  </p>
                </div>
                <div className="w-full md:w-1/2 h-64 md:h-2/3 bg-gray-900 rounded-2xl md:rounded-3xl overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={svc.img}
                    alt={svc.title}
                    className="w-full h-full object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal transition duration-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="h-screen flex flex-col justify-center items-center bg-[#050505] relative overflow-hidden gooey-filter">
          <div className="absolute w-full h-full top-0 left-0 bg-[linear-gradient(to_top,rgba(112,26,117,0.2),transparent)]" />
          <h2 className="text-[12vw] md:text-[15vw] leading-none uppercase tracking-tighter cursor-pointer mix-blend-difference z-10 transition-transform duration-500 hover:scale-105 font-heading">
            Let&apos;s Talk
          </h2>
          <div className="mt-6 md:mt-10 flex flex-wrap justify-center gap-6 md:gap-10 text-base md:text-xl z-10">
            <a
              href="#"
              className="hover:text-fuchsia-500 transition-colors"
            >
              Instagram
            </a>
            <a
              href="#"
              className="hover:text-fuchsia-500 transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="hover:text-fuchsia-500 transition-colors"
            >
              LinkedIn
            </a>
          </div>
          <div className="absolute bottom-5 text-gray-600 text-sm">
            © 2026 SAHAR STUDIOS. All rights reserved.
          </div>
        </footer>
      </main>
    </ReactLenis>
  );
}