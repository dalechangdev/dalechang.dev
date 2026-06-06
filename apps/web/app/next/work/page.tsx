import Navigation from "../components/Navigation";
import styles from "./page.module.css";
import workExperiences from "./work-experiences.json";

export default function Work() {
  return (
    <div className={styles.page}>
      <div className={styles.bgGrid} />
      
      <Navigation />

      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Work Experience</h1>
          <p className={styles.subtitle}>
            Problems I&apos;ve solved and impact I&apos;ve made. Not just where I worked—what I actually did.
          </p>
        </header>

        <div className={styles.experiences}>
          {workExperiences.map((exp, index) => (
            <article 
              key={exp.id} 
              className={styles.card}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                '--card-accent': exp.accent 
              } as React.CSSProperties}
            >
              <div className={styles.cardHeader}>
                <div>
                  <h2 className={styles.company}>{exp.company}</h2>
                  <p className={styles.role}>{exp.role}</p>
                </div>
                <span className={styles.period}>{exp.period}</span>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.section}>
                  <span className={styles.label}>The Problem</span>
                  <p>{exp.problem}</p>
                </div>
                
                <div className={styles.section}>
                  <span className={styles.label}>What I Did</span>
                  <p>{exp.action}</p>
                </div>
                
                <div className={styles.section}>
                  <span className={styles.label}>The Impact</span>
                  <p className={styles.impact}>{exp.impact}</p>
                </div>
              </div>

              <div className={styles.cardFooter}>
                {exp.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Want to create impact together?</p>
        <a href="mailto:dale@dalechang.dev" className={styles.footerCta}>
          Let&apos;s chat →
        </a>
      </footer>
    </div>
  );
}

