import React, {
  useState,
  useEffect,
  useRef,
  JSX,
  useCallback,
  useMemo,
} from "react";
import DatePicker from "react-datepicker"; // Это как готовый набор "Лего" для календаря!
import "react-datepicker/dist/react-datepicker.css"; // Это как красивые наклейки для нашего "Лего" календаря, чтобы он выглядел красиво!
import styles from "./TimeAndDate.module.css"; // Это наши собственные краски и кисточки, чтобы добавить уникальности календарю!
import { TimeAndDateProps } from "src/components/TimeAndDate/types"; // Это инструкция, какие детали нам нужны для постройки календаря.
import { getYear, getMonth, getDate } from "date-fns"; // Это как инструменты, чтобы правильно разбирать и собирать даты.

// Это главная функция, которая создаёт наш календарь.  Как главный строитель "Лего".
export default function TimeAndDate({
  initialDate = new Date(), // Это дата, с которой мы начинаем, если нам её укажут родители (из другого места кода). Если нет - начинаем с сегодняшней.
  dateFormat = "ru-RU", // Как показывать дату (например, день-месяц-год или месяц-день-год).
  timeFormat = "ru-RU", // Как показывать время (например, часы:минуты или часы:минуты:секунды).
  onDateChange, // Функция, которую вызовут родители, когда мы выберем новую дату.
  containerStyle, // Стиль для всего календаря.
  dateStyle, // Стиль для кнопки с датой.
  timeStyle, // Стиль для показа времени.
}: TimeAndDateProps): JSX.Element {
  const [dateTime, setDateTime] = useState<Date>(new Date()); // Это как наши "часы", которые всегда показывают точное время.
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate); // Это дата, которую мы выбрали в календаре. Изначально - это "initialDate" (то, что нам дали родители).
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false); // Говорит нам, открыт календарь или закрыт.  Как дверка у домика.
  const containerRef = useRef<HTMLDivElement | null>(null); // Это как невидимая рука, которая указывает на наш календарь, чтобы знать, где он находится на экране.

  // Этот код работает каждый раз, когда страничка открывается.  Как заводной механизм.
  useEffect(() => {
    const timer = setInterval(() => {
      // Запускаем "часы", чтобы они обновлялись каждую секунду.
      setDateTime(new Date()); // Обновляем "часы" на текущее время.
    }, 1000); // Каждую 1000 миллисекунд (каждую секунду).
    return () => clearInterval(timer); // Когда страничка закрывается, останавливаем "часы", чтобы они не тикали зря.
  }, []); // [] означает, что этот код запустится только один раз, когда страничка откроется.

  // Этот код следит, куда мы нажимаем мышкой. Как охранник.
  const handleClickOutside = useCallback(
    (event: MouseEvent): void => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        // Если нажали мышкой *вне* календаря...
        setIsCalendarOpen(false); // ...закрываем календарь!
        setSelectedDate(new Date(dateTime)); // ...и сбрасываем выбранную дату на текущую.
      }
    },
    [containerRef, dateTime],
  ); // Этот код будет меняться, только если изменится "containerRef" или "dateTime".

  // Этот код добавляет и убирает охранника (handleClickOutside), когда страничка меняется.
  useEffect(() => {
    document.addEventListener("mouseup", handleClickOutside); // Добавляем охранника, чтобы он следил за мышкой.
    return () => document.removeEventListener("mouseup", handleClickOutside); // Когда страничка меняется, убираем охранника, чтобы он не мешал другим делам.
  }, [handleClickOutside]);

  // Этот код форматирует дату, чтобы она красиво выглядела.
  const formattedDate = useMemo(() => {
    return dateTime.toLocaleDateString(dateFormat, {
      // Превращаем дату в красивую строчку, используя формат, который нам дали родители.
      year: "numeric", // Год цифрами (например, 2024).
      month: "long", // Месяц словом (например, январь).
      day: "numeric", // День цифрой (например, 15).
    });
  }, [dateTime, dateFormat]); // Этот код будет меняться, только если изменится "dateTime" или "dateFormat".

  // Этот код форматирует время, чтобы оно красиво выглядело.
  const formattedTime = useMemo(() => {
    return dateTime.toLocaleTimeString(timeFormat, {
      // Превращаем время в красивую строчку, используя формат, который нам дали родители.
      hour: "2-digit", // Часы двумя цифрами (например, 09 или 17).
      minute: "2-digit", // Минуты двумя цифрами (например, 05 или 42).
      second: "2-digit", // Секунды двумя цифрами (например, 00 или 59).
    });
  }, [dateTime, timeFormat]); // Этот код будет меняться, только если изменится "dateTime" или "timeFormat".

  // Этот код вызывается, когда мы выбираем новую дату в календаре.
  const handleDateChange = useCallback(
    (date: Date | null): void => {
      if (date) {
        // Если мы действительно выбрали дату (а не отменили выбор)...
        setSelectedDate(date); // ...запоминаем эту дату.
        onDateChange?.(date); // ...и сообщаем об этом родителям, если они просили.
      }
    },
    [onDateChange],
  ); // Этот код будет меняться, только если изменится "onDateChange".

  // Этот код открывает и закрывает календарь.
  const toggleCalendar = useCallback(() => {
    setIsCalendarOpen((prev) => !prev); // Если календарь открыт - закрываем, если закрыт - открываем!
  }, []); // Этот код никогда не меняется, поэтому [] пустой.

  // Этот код решает, как выглядит каждый день в календаре.
  const dayClassName = useCallback((date: Date): string => {
    const today = new Date(); // Получаем сегодняшнюю дату.
    const isToday =
      getYear(date) === getYear(today) && // Проверяем, является ли это сегодняшний день...
      getMonth(date) === getMonth(today) && // ...в этом месяце...
      getDate(date) === getDate(today); // ...и в этом году.
    return isToday ? styles.currentDay : ""; // Если это сегодняшний день, добавляем специальный стиль, чтобы он выделялся.
  }, []); // Этот код никогда не меняется, поэтому [] пустой.

  // Это код, который рисует наш календарь на экране. Как художник рисует картину.
  return (
    <div
      className={styles.calendar_container}
      ref={containerRef}
      style={containerStyle}
    >
      {" "}
      {/* Весь календарь.  Как рама для картины. */}
      <button
        className={styles.TimeDate}
        onClick={toggleCalendar}
        aria-label="Открыть календарь"
        style={dateStyle}
      >
        {" "}
        {/* Кнопка, на которую мы нажимаем, чтобы открыть календарь. */}
        <div className={styles.date}>{formattedDate}</div>{" "}
        {/* Дата, которая отображается на кнопке. */}
      </button>
      <span className={styles.TimeNow} style={timeStyle}>
        {" "}
        {/* Место для показа времени. */}
        <div className={styles.time}>{formattedTime}</div>{" "}
        {/* Время, которое отображается. */}
      </span>
      {isCalendarOpen && ( // Если календарь открыт...
        <div
          className={`${styles.datePickerContainer} ${styles.fadeIn}`}
          role="dialog"
        >
          {" "}
          {/* ...показываем его! */}
          <DatePicker
            selected={selectedDate} // Какую дату мы выбрали.
            onChange={handleDateChange} // Что делать, когда мы выбираем новую дату.
            inline // Показывать календарь прямо здесь, а не в отдельном окошке.
            dayClassName={dayClassName} // Как раскрасить каждый день в календаре.
          />
        </div>
      )}
    </div>
  );
}
