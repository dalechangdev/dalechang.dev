import Navigation from "../components/Navigation";
import Image from "next/image";
import styles from "./page.module.css";

const projects = [
    {
        id: 1,
        title: "Mukja",
        description: "A real-time collaborative app for figuring out where to eat. Built because I wanted a fun way to find restaurants.",
        why: "Wanted to stop asking 'where should we eat?' and actually find a place to eat.",
        tech: ["Next.js", "React Native", "Expo", "Vercel", "Supabase", "TripAdvisor API", "Stripe", "Postgres", "Cursor", "LLMs", "AI", "GitHub"],
        link: "https://mukja.app",
        image: "/mukja-app-screenshot.png",
    },
    {
        id: 2,
        title: "dalechang.dev",
        description: "This website you're on right now. Built because I wanted a simple way to share my work and projects.",
        why: "I needed a simpler alternative to complex budgeting apps.",
        tech: ["Next.js", "React", "TypeScript", "Vercel", "Cursor", "LLMs", "AI", "GitHub"],
        link: "https://dalechang.dev",
        image: null,
    },
    {
        id: 3,
        title: "Hannah Therapy",
        description: "A website for a therapist to help her clients understand options for therapy and to schedule consultations.",
        why: "Finding a therapist is hard. I wanted to make it easier for clients to find her.",
        tech: ["Next.js", "React", "TypeScript", "Vercel", "Cursor", "LLMs", "AI", "GitHub"],
        link: "https://hannahtherapy.online",
        image: "/hannahtherapy-hero.png",
    },
    {
        id: 4,
        title: "Kiki's Scavenger Hunt",
        description: "An iOS game where you help a witch undo a curse by finding items.",
        why: "Built this for my wife for Valentine's Day 2024.",
        tech: ["iOS", "Swift", "GitHub", "Docker", "Apple Store"],
        link: "https://github.com/dalecb13/kikis-adventure",
        image: "/kikis-scavenger-hunt.png",
    },
    {
        id: 5,
        title: "MIND Lab",
        description: "MIND Lab is a research lab at the University of Maryland that leverages cutting edge AI models to create interactive learning experiences.",
        why: "Students at the University of Maryland do not have easy access to industry-standard software development tools, environments, and practices.",
        tech: ["JavaScript", "Gatsby", "React", "TypeScript", "GitLab"],
        link: "https://mindlab.cs.umd.edu/",
        image: "/mindlab-website.png",
    },
    {
        id: 6,
        title: "VS Code Extension for Spaced Repetition",
        description: "An extension for VS Code that helps you learn new things by reviewing them at spaced intervals.",
        why: "Studying for interviews requires knowing a lot of information, both applied and theoretical. I wanted to create a free tool that I would use myself.",
        tech: ["TypeScript", "VSCode", "GitHub"],
        link: "https://github.com/dalecb13/coding-repetition",
        image: null,
    }
];

export default function Projects() {
  return (
    <div className={styles.page}>
      <div className={styles.bgGrid} />
      
      <Navigation />

      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Side Projects</h1>
          <p className={styles.subtitle}>
            Things I build for fun, to learn, or because they should exist. 
            Proof that I can go from 0 → 1.
          </p>
        </header>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <a 
              key={project.id} 
              href={project.link}
              className={styles.card}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {project.image && (
                <div className={styles.imageContainer}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={200}
                    height={200}
                    className={styles.projectImage}
                  />
                </div>
              )}
              
              <h2 className={styles.projectTitle}>{project.title}</h2>
              <p className={styles.projectDesc}>{project.description}</p>
              
              <p className={styles.why}>
                <span className={styles.whyLabel}>Why I built it:</span> {project.why}
              </p>
              
              <div className={styles.tech}>
                {project.tech.map((t) => (
                  <span key={t} className={styles.techTag}>{t}</span>
                ))}
              </div>
              
              <span className={styles.viewLink}>
                View project <span className={styles.arrow}>→</span>
              </span>
            </a>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Have an idea? Let&apos;s build something together.</p>
        <a href="mailto:dale@dalechang.dev" className={styles.footerCta}>
          Get in touch →
        </a>
      </footer>
    </div>
  );
}

