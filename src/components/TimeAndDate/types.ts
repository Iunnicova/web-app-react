import React from "react";

export interface TimeAndDateProps {
  initialDate?: Date;
  dateFormat?: string;
  timeFormat?: string;
  onDateChange?: (date: Date) => void;
  containerStyle?: React.CSSProperties;
  dateStyle?: React.CSSProperties;
  timeStyle?: React.CSSProperties;
}
