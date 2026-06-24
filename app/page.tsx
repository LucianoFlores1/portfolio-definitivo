"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Intro from "@/components/Intro";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import ProjectsPS4 from "@/components/ProjectsPS4";
import Stack from "@/components/Stack";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <SmoothScroll>
      <main>
        <Intro onReveal={() => setStarted(true)} />
        <Nav started={started} />
        <Hero started={started} />
        <ProjectsPS4 />
        <About />
        <Experience />
        <Stack />
        <Education />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
