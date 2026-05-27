"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Prevent body scroll when menu is open on mobile
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={styles.nav}>
        <Link href="/2024" className={styles.navLogo} onClick={closeMenu}>
          dc.
        </Link>

        <button
          className={`${styles.menuButton} ${isMenuOpen ? styles.menuOpen : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div
          className={`${styles.navLinks} ${isMenuOpen ? styles.menuOpen : ""}`}
        >
          <Link
            href="/2024/about"
            className={pathname === "/2024/about" ? styles.active : ""}
            onClick={closeMenu}
          >
            About
          </Link>
          <Link
            href="/2024/work"
            className={pathname === "/2024/work" ? styles.active : ""}
            onClick={closeMenu}
          >
            Work
          </Link>
          <Link
            href="/2024/projects"
            className={pathname === "/2024/projects" ? styles.active : ""}
            onClick={closeMenu}
          >
            Projects
          </Link>
          <a
            href="mailto:dale@dalechang.dev"
            className={styles.navCta}
            onClick={closeMenu}
          >
            Let&apos;s chat
          </a>
        </div>
      </nav>
      {isMenuOpen && <div className={styles.backdrop} onClick={closeMenu} />}
    </>
  );
}
