import { success } from "zod/v4";
import styles from "./Button.module.css";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  color?: "primary" | "success" | "danger" | "warning";
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  type = "button",
  color = "primary",
  disabled = false,
}: Props) {
  const buttonColors = {
    primary: ["#0b1f3a", "#fff"],
    success: ["#28a745", "#fff"],
    danger: ["#dc3545", "#fff"],
    warning: ["#ffc107", "#212529"],
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles.default_button}
      style={{
        backgroundColor: buttonColors[color][0],
        color: buttonColors[color][1],
        border: `1px solid ${buttonColors[color][1]}`,
      }}
    >
      {children}
    </button>
  );
}
