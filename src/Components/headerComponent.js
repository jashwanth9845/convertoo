import React from "react";
import styles from "../CSS/head.module.css";
import { AddStyles } from "../Helper/AddStyles";
import ToggleSwitch from "./ToggleSwitchComponent";
import Help_New from "./Help_NewComponent";
const darkMode = {
  color: "#dee5ff",
  background: "#36363c",
  mainBackground: "#212121",
};
const LightMode = {
  color: "#343b48",
  background: "white",
  mainBackground: "rgba(172, 219, 250, 0.1)",
};
const ToggleStyles = {
  LightMode,
  darkMode,
};
export default function HeaderComponent() {
  const getToggled = (checkThis) => {
    AddStyles({
      selector: [
        {
          body: "body",
          mytext: "h3,#dropperText,.mycolor",
          mydata: ".myBackground",
        },
      ],
      style: [{ body: "background", mytext: "color", mydata: "background" }],
      applyTo: [
        { body: "mainBackground", mytext: "color", mydata: "background" },
      ],
      styleObject: ToggleStyles,
      theme: checkThis,
    });
  };
  return (
    <div className={`${styles.maincontainer} myBackground`}>
      <div className={styles.innercontainer}>
        <div className={styles.leftDiv}>
          <img src="./Images/Convertoo_logo.svg" />
          <p>ConverToo</p>
        </div>
        <div className={styles.rightDiv}>
          <ToggleSwitch getToggled={getToggled} />
          <Help_New />
        </div>
      </div>
    </div>
  );
}
