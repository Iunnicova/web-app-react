import React, { useEffect } from "react";
import TimeAndDate from "../TimeAndDate/TimeAndDate";
import styles from "./Header.module.css";
import MySvgLogo from "../../MySvgLogo/MySvgLogo";
// import { ReactComponent as VkIcon } from "./src/svg/vk.svg";

// import MySvgLogo from '../MySvgLogo';

export default function Header() {
  //клил по лесточку
  useEffect(() => {
    const path = document.querySelector("path[fill='red']") as SVGPathElement;
    if (path) {
      path.style.cursor = "pointer";
      path.addEventListener("click", () => {
        alert("Клик по лепестку!");
      });
    }
  }, []);

  return (
    <header>
      <div className={styles.logo}>
        <MySvgLogo
          className={styles.logoDreams}
          alt="Daisy flower with pigtails"
        />
      </div>
      <h3>Blossoming dreams</h3>
      <span>
        <TimeAndDate />
      </span>
    </header>
  );
}
