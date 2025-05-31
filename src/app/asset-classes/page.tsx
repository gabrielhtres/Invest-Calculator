"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";
import { assetsClasses } from "../utils";
import { api } from "@/lib/api";
import { AssetClassData } from "../types";

export default function Page() {
  const [values, setValues] = useState<Record<string, string>>({
    stock: "0",
    fii: "0",
    treasure: "0",
    etf: "0",
    bdr: "0",
  });

  useEffect(() => {
    api
      .get<AssetClassData[]>("/api/asset-classes")
      .then((res) => {
        if (res.length > 0) {
          setValues({
            stock: res[0].stock,
            fii: res[0].fii,
            treasure: res[0].treasure,
            etf: res[0].etf,
            bdr: res[0].bdr,
          });
        }
      })
      .catch((err) => console.error("Erro ao buscar porcentagens:", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const otherTotal = Object.entries(values).reduce((acc, [key, val]) => {
      if (key !== name) {
        acc += Number(val);
      }

      return acc;
    }, 0);

    setValues((prevValues) => ({
      ...prevValues,
      [name]:
        Number(value) + otherTotal > 100
          ? String(100 - otherTotal)
          : String(value),
    }));
  };

  const handleSubmit = () => {
    console.log("values", values);
    const sendValues = Object.entries(values).reduce((acc, [key, value]) => {
      acc[key] = String(value);
      return acc;
    }, {} as Record<string, string>);

    api
      .post<Record<string, string>, AssetClassData>(
        "/api/asset-classes",
        sendValues
      )
      .then((res) =>
        setValues({
          stock: res.stock,
          fii: res.fii,
          treasure: res.treasure,
          etf: res.etf,
          bdr: res.bdr,
        })
      )
      .catch((err) => console.error("Erro ao salvar porcentagens:", err));
  };

  return (
    <>
      <div className={styles.page}>
        {Object.entries(assetsClasses).map(([key, value]) => (
          <div key={key} className={styles.class_box}>
            <div className={styles.class_title}>
              <div className={styles.title}>{value}</div>
              <div className={styles.percentage}>
                {values[key as keyof typeof values]}
              </div>
            </div>
            <input
              onChange={handleChange}
              type="range"
              name={key}
              min="0"
              max="100"
              value={values[key as keyof typeof values]}
              step="1"
            />
          </div>
        ))}
      </div>

      <div>
        <button onClick={handleSubmit}>Salvar</button>
      </div>
    </>
  );
}
