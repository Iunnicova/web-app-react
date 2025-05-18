import React from "react";
import Header from "./components/Header/Header";
import TimeAndDate from "./components/TimeAndDate/TimeAndDate";
import VkIcon from "../src/svg/VkIcon.svg";
export default function App() {
  const handleFlowerClick = () => {
    alert("Клик по лепестку!");
  };

  return (
    <div className="App">
      <Header onFlowerClick={handleFlowerClick} />
    </div>
  );
}
