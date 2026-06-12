"use client";

import { useState } from "react";
import Intro from "@/components/Intro";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Marquee from "@/components/Marquee";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <main>
      <Intro onReveal={() => setStarted(true)} />
      <Nav started={started} />
      <Hero started={started} />
      <About />
      <Marquee />
      <Experience />
      <Projects />
      <Stack />
      <Education />
      <Contact />
    </main>
  );
}
