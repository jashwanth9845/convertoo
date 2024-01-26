import React, { useEffect, useState } from 'react';
import '../CSS/slider.css';
export default function ToggleSwitch({ getToggled }) {
  const [isToggled, setIsToggled] = useState(
    localStorage.getItem('theme') === 'LightMode' ? false : true
  );

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  useEffect(() => {
    if (isToggled === false || isToggled === true) {
      localStorage.setItem('theme', isToggled === false ? 'LightMode' : 'darkMode');
      getToggled();
    }
  }, [isToggled]);
  return (
    <label className='toggle'>
      <input type='checkbox' id='toggle' checked={isToggled} onChange={handleToggle} />
      <span className='slider'>
        <svg
          className='sun'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          xlinkHref='http://www.w3.org/1999/xlink'
          width='20px'
          height='20px'
          viewBox='0,0,256,256'
        >
          <g
            fillOpacity='0'
            fill='#000000'
            fillRule='nonzero'
            stroke='none'
            strokeWidth='1'
            strokeLinecap='butt'
            strokeLinejoin='miter'
            strokeMiterlimit='10'
            strokeDasharray=''
            strokeDashoffset='0'
            fontFamily='none'
            fontWeight='none'
            fontSize='none'
            textAnchor='none'
            style={{ mixBlendMode: 'normal' }}
          >
            <path d='M0,256v-256h256v256z' id='bgRectangle'></path>
          </g>
          <g
            fill='#ffffff'
            fillRule='nonzero'
            stroke='none'
            strokeWidth='1'
            strokeLinecap='butt'
            strokeLinejoin='miter'
            strokeMiterlimit='10'
            strokeDasharray=''
            strokeDashoffset='0'
            fontFamily='none'
            fontWeight='none'
            fontSize='none'
            textAnchor='none'
            style={{ mixBlendMode: 'normal' }}
          >
            <g transform='scale(5.12,5.12)'>
              <path d='M49.55469,24.16797l-8.24609,-5.49609c-0.1875,-0.125 -0.34375,-0.50781 -0.30078,-0.73047l1.94141,-9.71484c0.06641,-0.32813 -0.03516,-0.66797 -0.26953,-0.90625c-0.23828,-0.23437 -0.57812,-0.33594 -0.90625,-0.26953l-9.71484,1.94141c-0.22266,0.03906 -0.60547,-0.11328 -0.73047,-0.30078l-5.49609,-8.24609c-0.37109,-0.55859 -1.29297,-0.55859 -1.66406,0l-5.49609,8.24609c-0.125,0.1875 -0.51172,0.34375 -0.73047,0.30078l-9.71484,-1.94141c-0.33203,-0.06641 -0.66797,0.03516 -0.90625,0.26953c-0.23437,0.23828 -0.33594,0.57813 -0.26953,0.90625l1.94141,9.71484c0.04297,0.22266 -0.11328,0.60547 -0.30078,0.73047l-8.24609,5.49609c-0.27734,0.1875 -0.44531,0.49609 -0.44531,0.83203c0,0.33594 0.16797,0.64453 0.44531,0.83203l8.24609,5.49609c0.1875,0.125 0.34375,0.50781 0.30078,0.73047l-1.94141,9.71484c-0.06641,0.32813 0.03516,0.66797 0.26953,0.90625c0.23828,0.23438 0.57813,0.33984 0.90625,0.26953l9.71484,-1.94141c0.21484,-0.04297 0.60547,0.11328 0.73047,0.30078l5.49609,8.24609c0.1875,0.27734 0.49609,0.44531 0.83203,0.44531c0.33594,0 0.64453,-0.16797 0.83203,-0.44531l5.49609,-8.24609c0.125,-0.1875 0.51172,-0.34375 0.73047,-0.30078l9.71484,1.94141c0.32813,0.07031 0.66797,-0.03516 0.90625,-0.26953c0.23438,-0.23828 0.33594,-0.57812 0.26953,-0.90625l-1.94141,-9.71484c-0.04297,-0.22266 0.11328,-0.60547 0.30078,-0.73047l8.24609,-5.49609c0.27734,-0.1875 0.44531,-0.49609 0.44531,-0.83203c0,-0.33594 -0.16797,-0.64453 -0.44531,-0.83203zM25,37c-6.62891,0 -12,-5.37109 -12,-12c0,-6.62891 5.37109,-12 12,-12c6.62891,0 12,5.37109 12,12c0,6.62891 -5.37109,12 -12,12z'></path>
            </g>
          </g>
        </svg>
        <svg
          className='moon'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          xlinkHref='http://www.w3.org/1999/xlink'
          width='20px'
          height='20px'
          viewBox='0,0,256,256'
        >
          <g
            fillOpacity='0'
            fill='#000000'
            fillRule='nonzero'
            stroke='none'
            strokeWidth='1'
            strokeLinecap='butt'
            strokeLinejoin='miter'
            strokeMiterlimit='10'
            strokeSasharray=''
            strokeSashoffset='0'
            fontFamily='none'
            fontWeight='none'
            fontSize='none'
            textAnchor='none'
            style={{ mixBlendMode: 'normal' }}
          >
            <path d='M0,256v-256h256v256z' id='bgRectangle'></path>
          </g>
          <g
            fill='#ffffff'
            fillRule='nonzero'
            stroke='none'
            strokeWidth='1'
            strokeLinecap='butt'
            strokeLinejoin='miter'
            strokeMiterlimit='10'
            strokeDasharray=''
            strokeDashoffset='0'
            fontFamily='none'
            fontWeight='none'
            fontSize='none'
            textAnchor='none'
            style={{ mixBlendMode: 'normal' }}
          >
            <g transform='scale(10.66667,10.66667)'>
              <path d='M3.722,3.193l-0.496,1.335c-0.12,0.323 -0.375,0.578 -0.698,0.698l-1.335,0.496c-0.257,0.096 -0.257,0.46 0,0.555l1.335,0.496c0.323,0.12 0.578,0.375 0.698,0.698l0.496,1.335c0.096,0.257 0.46,0.257 0.555,0l0.496,-1.335c0.12,-0.323 0.375,-0.578 0.698,-0.698l1.335,-0.496c0.257,-0.096 0.257,-0.46 0,-0.555l-1.334,-0.496c-0.323,-0.12 -0.578,-0.375 -0.698,-0.698l-0.496,-1.335c-0.096,-0.257 -0.46,-0.257 -0.556,0zM20.916,12.994c0.603,0.006 1.091,0.516 1.008,1.113c-0.232,1.662 -0.986,3.267 -2.263,4.553c-3.13,3.12 -8.19,3.12 -11.32,0c-3.12,-3.13 -3.12,-8.19 0,-11.32c1.285,-1.277 2.891,-2.032 4.553,-2.263c0.596,-0.084 1.106,0.404 1.112,1.007c0.017,1.765 0.7,3.521 2.044,4.866c1.344,1.344 3.101,2.027 4.866,2.044z'></path>
            </g>
          </g>
        </svg>
      </span>
    </label>
  );
}
