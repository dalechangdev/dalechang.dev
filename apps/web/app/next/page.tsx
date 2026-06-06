import styles from "./page.module.css";

export default function Next() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <p className={styles.label}>Redesign in progress</p>
        <h1 className={styles.title}>What&apos;s next.</h1>
        <p className={styles.sub}>
          A new direction. Coming soon.
        </p>
      </div>
    </div>
  );
}
