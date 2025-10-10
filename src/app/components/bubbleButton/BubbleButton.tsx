import React from "react";
import styles from "./BubbleButton.module.scss";

interface BubbleButtonProps {
  label: string;
  size?: "xsm" |"sm" | "md" | "lg" | "xlg";
  className?: string;
  onClick?: () => void;
}

const ArrowIcon = () => (
  <svg
    width="14"
    height="15"
    viewBox="0 0 14 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M3.39355 1.57495L12.7977 1.43756L12.9351 10.8417" stroke="white" strokeWidth="1.5" />
    <path d="M12.7976 1.43748L0.750874 13.8414" stroke="white" strokeWidth="1.5" />
  </svg>
);

const BubbleButton: React.FC<BubbleButtonProps> = ({
  label,
  size = "md",
  className = "",
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles['c-bubble-button']} ${styles[`button--${size}`]} ${className}`}
    >
      <span className={styles["c-bubble-button__label"]}>{label}</span>
      <span className={styles["c-bubble-button__icon"]}>
        <ArrowIcon />
      </span>
    </button>

  );
};

export default BubbleButton;
