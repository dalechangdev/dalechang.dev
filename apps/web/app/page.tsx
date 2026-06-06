import Link from "next/link";
import Image from "next/image";
import Navigation from "./components/Navigation";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Decorative background elements */}
      <div className={styles.bgGrid} />
      <div className={styles.bgGradient} />
      
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <main className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroLabel}>
            <span className={styles.statusDot} />
            Available for opportunities
          </p>
          
          <h1 className={styles.heroTitle}>
            I build products
            <br />
            <span className={styles.heroAccent}>people actually use.</span>
          </h1>
          
          <p className={styles.heroSub}>
            Software engineer with a founder&apos;s mindset. I care about users, 
            not just code. Currently crafting delightful experiences and 
            shipping things that matter.
          </p>

          <div className={styles.heroCtas}>
            <a href="mailto:dale@dalechang.dev" className={styles.primaryBtn}>
              Let&apos;s chat
              <span className={styles.btnArrow}>→</span>
            </a>
            <Link href="/work" className={styles.secondaryBtn}>
              See my work
            </Link>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.profileImageWrapper}>
            <Image
              src="/dale-headshot.jpg"
              alt="Dale Chang"
              width={400}
              height={400}
              className={styles.profileImage}
              priority
            />
          </div>
          <div className={styles.floatingCard}>
            <span className={styles.cardEmoji}>🚀</span>
            <span>Shipped 12+ products</span>
          </div>
          <div className={styles.floatingCard} style={{ animationDelay: '0.5s' }}>
            <span className={styles.cardEmoji}>💡</span>
            <span>Product-first thinking</span>
          </div>
          <div className={styles.floatingCard} style={{ animationDelay: '1s' }}>
            <span className={styles.cardEmoji}>⚡</span>
            <span>0 → 1 builder</span>
          </div>
        </div>
      </main>

      {/* Social proof / quick links */}
      <section className={styles.socialProof}>
        <p className={styles.proofLabel}>Previously shipped at</p>
        <div className={styles.proofLogos}>
          <span>SAIC</span>
          <span>•</span>
          <span>Innovim</span>
          <span>•</span>
          <span>Cigna</span>
          <span>•</span>
          <span>Leidos</span>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
            <a href="https://linkedin.com/in/dalechangdev" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/dalecb13" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <p className={styles.footerNote}>Built with care & <a href="https://www.buymeacoffee.com/dalechangdev" target="_blank" rel="noopener noreferrer">caffeine</a> ☕</p>
      </footer>
    </div>
  );
}
