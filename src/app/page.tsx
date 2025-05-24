"use client";

import dynamic from "next/dynamic";
import styles from "./page.module.css";

const HoldingsGraphs = dynamic(() => import("../components/HoldingsGraphs"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.graph_box}>
        <h3>Atual</h3>
        <HoldingsGraphs />
      </div>

      <div className={styles.graph_box}>
        <h3>Meta</h3>
        <HoldingsGraphs />
      </div>
    </div>
  );
}
