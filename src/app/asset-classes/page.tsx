"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { assetsClasses } from "../utils";

export default function Page() {
  const [values, setValues] = useState({
    stock: 0,
    fii: 0,
    treasure: 0,
    etf: 0,
    bdr: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("values", values);
    fetch("/api/asset-classes", {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then()
      .then((res) => {
        console.log("Resposta do servidor:", res);
      })
      .catch((err) => {
        console.error("Erro ao enviar os dados:", err);
      });
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
