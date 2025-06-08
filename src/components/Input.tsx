"use client";

import styles from "./Input.module.css";

interface Props {
  name: string;
  label: string;
  type?: string;
  min?: number;
  max?: number;
  step?: number;
}

export default function Input({
  name,
  label,
  min,
  max,
  step,
  type = "text",
}: Props) {
  return (
    <div className={styles.default_input}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
}
