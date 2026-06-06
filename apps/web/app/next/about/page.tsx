import Navigation from "../components/Navigation";
import Image from "next/image";
import styles from "./page.module.css";

export default function About() {
  return (
    <div className={styles.page}>
      <div className={styles.bgGrid} />
      
      <Navigation />

      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.avatarWrapper}>
            <Image
              src="/dale-headshot.jpg"
              alt="Dale Chang"
              width={200}
              height={200}
              className={styles.avatar}
              priority
            />
          </div>
          
          <h1 className={styles.title}>Hey, I&apos;m Dale.</h1>
          
          <div className={styles.bio}>
            <p>
              I&apos;m a software engineer who thinks like a founder. I care deeply about 
              building products that solve real problems—not just technically impressive 
              code that nobody uses.
            </p>
            <p>
              My superpower? Bridging the gap between engineering and product. I ask 
              &quot;why are we building this?&quot; before &quot;how do we build this?&quot; and that 
              makes all the difference.
            </p>
            <p>
              When I&apos;m not shipping features, you&apos;ll find me tinkering with side projects, 
              reading about product strategy, or hunting for the perfect espresso.
            </p>
          </div>

          <div className={styles.values}>
            <div className={styles.value}>
              <span className={styles.valueIcon}>🎯</span>
              <div>
                <h3>User-first thinking</h3>
                <p>Every line of code should serve someone.</p>
              </div>
            </div>
            <div className={styles.value}>
              <span className={styles.valueIcon}>🚀</span>
              <div>
                <h3>Ship fast, iterate faster</h3>
                <p>Perfect is the enemy of shipped.</p>
              </div>
            </div>
            <div className={styles.value}>
              <span className={styles.valueIcon}>💡</span>
              <div>
                <h3>Stay curious</h3>
                <p>The best ideas come from unexpected places.</p>
              </div>
            </div>
          </div>

          <div className={styles.cta}>
            <h2>Let&apos;s build something together.</h2>
            <p>
              Whether you have a project in mind, want to collaborate, or just want to say hi—
              I&apos;d love to hear from you.
            </p>
            <a href="mailto:dale@dalechang.dev" className={styles.ctaBtn}>
              Start a conversation
              <span className={styles.arrow}>→</span>
            </a>
          </div>

          <div className={styles.coffee}>
            <div className={styles.coffeeContent}>
              <div className={styles.coffeeText}>
                <h2>Support my work</h2>
                <p>
                  If you enjoy my content or find my projects helpful, consider buying me a coffee.
                </p>
                <a 
                  href="https://buymeacoffee.com/dalechangdev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.coffeeBtn}
                >
                  Buy me a coffee
                  <span className={styles.arrow}>→</span>
                </a>
              </div>
              <a 
                href="https://buymeacoffee.com/dalechangdev" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.coffeeLink}
              >
                <Image
                  src="/buy-dale-a-coffee-qr-code.png"
                  alt="Buy me a coffee QR code"
                  width={240}
                  height={240}
                  className={styles.coffeeQr}
                />
              </a>
            </div>
          </div>

          <div className={styles.socials}>
            <a href="https://github.com/dalechang" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://linkedin.com/in/dalechang" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://notes.dalechang.dev" target="_blank" rel="noopener noreferrer">
              Notes
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

