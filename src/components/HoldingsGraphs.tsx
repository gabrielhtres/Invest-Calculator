"use client";

import { Treemap } from "recharts";
import styles from "./HoldingsGraphs.module.css";
import { holdingsClasses } from "@/app/utils";

export default function HoldingsGraphs() {
  const values = {
    stocks: 20,
    fii: 30,
    treasure: 20,
    etf: 10,
    bdr: 10,
  };

  return (
    <>
      <h4>Por Classe</h4>
      <Treemap
        width={730}
        height={250}
        data={[...Object.entries(values)].map(([key, value]) => ({
          name: `${
            holdingsClasses[key as keyof typeof holdingsClasses]
          } (${value}%)`,
          size: value,
          fill: "red",
        }))}
        dataKey="size"
        aspectRatio={2 / 1}
        stroke="#fff"
        fill="#8884d8"
        className={styles.graph}
      />

      {Object.keys(holdingsClasses).map((key) => (
        <>
          <h4>{holdingsClasses[key as keyof typeof holdingsClasses]}</h4>
          <Treemap
            width={730}
            height={250}
            data={[
              {
                name: "Ações (20%)",
                size: 20,
                fill: "red",
              },
              {
                name: "Fundos Imobiliários (30%)",
                size: 30,
                fill: "blue",
              },
              {
                name: "Renda Fixa (20%)",
                size: 20,
                fill: "green",
              },
              {
                name: "ETF (10%)",
                size: 10,
                fill: "orange",
              },
              {
                name: "BDR (10%)",
                size: 10,
                fill: "black",
              },
            ]}
            dataKey="size"
            aspectRatio={2 / 1}
            stroke="#fff"
            fill="#8884d8"
            className={styles.graph}
          />
        </>
      ))}
    </>
  );
}
