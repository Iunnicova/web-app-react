import React from 'react';
import TimeAndDate from './TimeAndDate'; 
import logo from '/logo.png'

export default function Header() {
  return (
    <header>
   <img className="logoDreams" src={logo} alt="Daisy flower with pigtails" />
      <h3>Blossoming dreams</h3>
      <span>Время и дата: <TimeAndDate /></span> 
    </header>
  );
}