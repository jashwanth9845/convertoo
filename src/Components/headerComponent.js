import React, { useState } from 'react';
import styles from '../CSS/head.module.css';
import { AddStyles } from '../Helper/AddStyles';
import ToggleSwitch from './ToggleSwitchComponent';
import Help_New from './Help_NewComponent';
const darkMode = {
  color: '#dee5ff',
  color1: '343b48',
  background: '#36363c',
  mainBackground: '#212121',
};
const LightMode = {
  color: '#343b48',
  color1: '#343b48',
  background: 'white',
  mainBackground: 'rgba(172, 219, 250, 0.1)',
};
const ToggleStyles = {
  LightMode,
  darkMode,
};
export default function HeaderComponent() {
  const [theme, setTheme] = useState();
  const getToggled = () => {
    const mytheme = localStorage.getItem('theme');
    setTheme(mytheme);
    AddStyles({
      selector: [
        {
          body: 'body',
          mytext: 'h3,#dropperText,.mycolor',
          mydata: '.myBackground',
          mycolorLabel: '.mycolor1',
        },
      ],
      style: [{ body: 'background', mytext: 'color', mydata: 'background', mycolorLabel: 'color' }],
      applyTo: [
        { body: 'mainBackground', mytext: 'color', mydata: 'background', mycolorLabel: 'color1' },
      ],
      styleObject: ToggleStyles,
      theme: mytheme,
    });
    AddStyles({
      selector: [
        {
          body: 'body',
          mytext: 'h3,#dropperText,.mycolor',
          mydata: '.myBackground',
        },
      ],
      style: [{ body: 'background', mytext: 'color', mydata: 'background' }],
      applyTo: [{ body: 'mainBackground', mytext: 'color', mydata: 'background' }],
      styleObject: ToggleStyles,
      theme: mytheme,
    });
  };
  return (
    <div className={`${styles.maincontainer} myBackground`}>
      <div className={styles.innercontainer}>
        <div className={styles.leftDiv}>
          <img src='./Images/Convertoo_logo.svg' alt='company logo' />
          <p>ConverToo</p>
        </div>
        <div className={styles.rightDiv}>
          <ToggleSwitch getToggled={getToggled} />
          <Help_New theme={theme} />
        </div>
      </div>
    </div>
  );
}
