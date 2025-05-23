"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/">Início</Link>
        </li>
        <li>
          <Link href="/asset-classes">Classes de Ativos</Link>
        </li>
        <li>
          <Link href="/holdings">Ativos</Link>
        </li>
      </ul>
    </nav>
  );
}
