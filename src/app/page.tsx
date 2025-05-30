"use client";

import dynamic from "next/dynamic";
import styles from "./page.module.css";
import { useEffect } from "react";

const AssetsGraphs = dynamic(() => import("../components/AssetsGraphs"), {
  ssr: false,
});

export default function Home() {
  useEffect(() => {
    fetch("/api/assets", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.error("Erro ao buscar ativos:", err));
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.graph_box}>
        <h3>Atual</h3>
        <AssetsGraphs />
      </div>

      <div className={styles.graph_box}>
        <h3>Meta</h3>
        <AssetsGraphs />
      </div>
    </div>
  );
}
