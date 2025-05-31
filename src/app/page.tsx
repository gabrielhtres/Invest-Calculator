"use client";

import dynamic from "next/dynamic";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { AssetClassData } from "./types";

const AssetsGraphs = dynamic(() => import("../components/AssetsGraphs"), {
  ssr: false,
});

export default function Home() {
  const [values, setValues] = useState<Record<string, string>>({
    stock: "0",
    fii: "0",
    treasure: "0",
    etf: "0",
    bdr: "0",
  });

  useEffect(() => {
    api.get<AssetClassData>("/api/asset-classes").then((res) => {
      setValues({
        stock: res.stock,
        fii: res.fii,
        treasure: res.treasure,
        etf: res.etf,
        bdr: res.bdr,
      });
    });
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
