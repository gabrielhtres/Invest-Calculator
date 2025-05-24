"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Page() {
  const fields = ["Ações", "Fundos Imobiliários", "Renda Fixa", "ETF", "BDR"];

  const [values, setValues] = useState({
    Ações: 0,
    "Fundos Imobiliários": 0,
    "Renda Fixa": 0,
    ETF: 0,
    BDR: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className={styles.page}>
      {fields.map((field) => (
        <div key={field} className={styles.class_box}>
          <div className={styles.class_title}>
            <div className={styles.title}>{field}</div>
            <div className={styles.percentage}>
              {values[field as keyof typeof values]}
            </div>
          </div>
          <input
            onChange={handleChange}
            type="range"
            name={field}
            min="0"
            max="100"
            value={values[field as keyof typeof values]}
            step="1"
          />
        </div>
      ))}
    </div>
  );
}
