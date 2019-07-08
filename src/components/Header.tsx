import React, { FunctionComponent, ReactNode } from "react";
import styles from "./Header.module.css";

interface Props {
  title: string;
  action?: ReactNode;
  showBack?: boolean;
}

export const Header: FunctionComponent<Props> = ({
  title,
  action,
  showBack
}) => {
  return (
    <header className={styles.header}>
      {showBack ? (
        <button className="icon" onClick={() => window.history.back()}>
          <span role="img" aria-label="Back">
            🔙
          </span>
        </button>
      ) : (
        <div>
          <span role="img" aria-label="Sun">
            ☀️
          </span>
        </div>
      )}
      <div>{title}</div>
      <div>{action}</div>
    </header>
  );
};
