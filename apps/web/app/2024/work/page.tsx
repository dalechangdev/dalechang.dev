import Navigation from "../components/Navigation";
import Link from "next/link";
import styles from "./page.module.css";

const workExperiences = [
    {
        id: 0,
        company: "Freelance",
        role: "Senior Full-stack Software Engineer",
        period: "2025 - Present",
        problem: "Users were abandoning the checkout flow at a 40% rate due to a clunky, slow experience.",
        action: "Led a complete redesign of the checkout system, implementing optimistic updates and reducing API calls by 60%.",
        impact: "Checkout completion increased by 35%, generating an additional $2M in annual revenue.",
        tags: ["React", "Next.js", "PostgreSQL", "MySQL", "Planetscale", "LLMs", "Cursor", "AI", "Docker", "Vercel", "Supabase", "GitHub", "Slack", "ClickUp", "Figma"],
        accent: "#ff6b35",
    },
    {
        id: 1,
        company: "SAIC",
        role: "Senior Full-stack Software Engineer",
        period: "2023 - 2024",
        problem: "The US military was using a legacy system to manage battle simulations. The system was slow, outdated, and not user-friendly.",
        action: "Built a new system from the ground up using modern technologies and best practices.",
        impact: "Military officials reported a 20% increase in response time",
        tags: ["React", "TypeScript", "Tailwind", "Java", "Spring", "Python", "Docker", "Kubernetes", "Azure", "GitHub"],
        accent: "#ff6b35",
    },
    {
        id: 2,
        company: "Innovim",
        role: "Tech Lead",
        period: "2022 - 2023",
        problem: "User interfaces were high-friction users wasted a lot of time navigating to find their most-used features.",
        action: "Built an internal toolchain for tracking user behavior and preferences to improve the user experience.",
        impact: "Improved user speed by 20% and reduced the time to find features by 50%.",
        tags: ["JavaScript", "TypeScript", "Docker", "Kubernetes", "GitLab"],
        accent: "#00d4aa",
    },
    {
        id: 3,
        company: "Cigna",
        role: "Senior Software Engineer",
        period: "2019 - 2022",
        problem: "Customers had to wait over 2 weeks in order to get financial insights on how their employees used their health insurance coverage.",
        action: "Designed and shipped real-time financial insights dashboard to help companies understand their health insurance coverage.",
        impact: "Users saw financial insights in minutes in dashboards, charts, and powerpoint presentations",
        tags: ["Angular", "TypeScript", "Java", "Spring", "Docker", "Kubernetes", "AWS", "EC2", "S3", "API Gateway", "Lambda", "Step Functions", "DynamoDB", "Terraform", "CI/CD", "Jenkins"],
        accent: "#a855f7",
    },
    {
        id: 4,
        company: "Leidos",
        role: "Software Engineer",
        period: "2016 - 2019",
        problem: "US agencies spend millions of dollars on civil litigation using a manual process that was prone to errors and inefficiencies.",
        action: "Built an e-discovery platform that leverages machine learning models to automate the process of reviewing and categorizing documents.",
        impact: "Reduced the time to review and categorize documents by 80% and reduced the cost of the process by 50%.",
        tags: ["Java", "Spring", "Postgres", "Hadoop", "Spark", "Machine Learning", "NiFi", "Solr", "Kafka"],
        accent: "#a855f7",
    },
];

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

