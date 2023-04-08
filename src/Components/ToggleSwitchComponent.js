import React,{ useEffect, useState } from 'react'
import "../CSS/slider.css";
export default function ToggleSwitch({getToggled}) {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  }
useEffect(()=> {
  if(isToggled === false)
getToggled("LightMode");
else if(isToggled === true)
getToggled("darkMode");

},[isToggled])
  return (
  <label className="toggle">
  <input type="checkbox" id="toggle" checked={isToggled} onChange={handleToggle}/>
  <span className="slider">
    <i className="fas fa-sun"></i>
    <i className="fas fa-moon"></i>
  </span>
</label>
  )
}
