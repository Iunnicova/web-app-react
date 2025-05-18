import React, { useEffect } from "react";
import TimeAndDate from "../TimeAndDate/TimeAndDate";
import styles from "./Header.module.css";
import MySvgLogo from "../../MySvgLogo/MySvgLogo";
import VkIcon from "../../svg/VkIcon.svg";

interface HeaderProps {
  onFlowerClick: () => void;
}

export default function Header({ onFlowerClick }: HeaderProps) {
  return (
    <header>
      <div className={styles.logo}>
        <MySvgLogo
          className={styles.logoDreams}
          alt="Daisy flower with pigtails"
          onClick={onFlowerClick}
        />
      </div>
      <h3>Blossoming dreams</h3>
      <span>
        <TimeAndDate />
      </span>
    </header>
  );
}
