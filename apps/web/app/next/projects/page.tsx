import Navigation from "../components/Navigation";
import Image from "next/image";
import styles from "./page.module.css";
import projects from "./projects.json";

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

