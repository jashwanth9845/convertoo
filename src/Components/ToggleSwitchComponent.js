import React, { useEffect, useState } from "react";
import "../CSS/slider.css";
export default function ToggleSwitch({ getToggled }) {
  const [isToggled, setIsToggled] = useState(
    localStorage.getItem("theme") === "LightMode" ? false : true
  );

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  useEffect(() => {
    console.log("isToggled: ", isToggled);
    if (isToggled === false || isToggled === true) {
      localStorage.setItem(
        "theme",
        isToggled === false ? "LightMode" : "darkMode"
      );
      getToggled();
    }
  }, [isToggled]);
  return (
    <label className="toggle">
      <input
        type="checkbox"
        id="toggle"
        checked={isToggled}
        onChange={handleToggle}
      />
      <span className="slider">
        <i className="fas fa-sun"></i>
        <i className="fas fa-moon"></i>
      </span>
    </label>
  );
}
