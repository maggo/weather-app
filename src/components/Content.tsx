import React, { FunctionComponent } from "react";
import styles from "./Content.module.css";

export const Content: FunctionComponent = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
