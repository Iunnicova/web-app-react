import React, { useState, useEffect } from 'react';

export default function TimeAndDate() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = dateTime.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const formattedTime = dateTime.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

   return (
    <span className="TimeDate">
      <div className="date">{formattedDate}</div>
      <div className="time">{formattedTime}</div>
    </span>
  );
}