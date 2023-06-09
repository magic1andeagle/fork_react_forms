import React, { useDeferredValue, useEffect, useRef, useState } from "react";
import "./input.css";
import { SystemLogger } from "../logger/logger";

const icons = [
  {
    name: "warning",
    default: (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_887_911)'>
          <path
            d='M13.3778 4.29545L21.0933 17.6591C21.7056 18.7197 20.9402 20.0455 19.7155 20.0455H4.2845C3.05982 20.0455 2.29439 18.7197 2.90673 17.6591L10.6222 4.29545C11.2346 3.23485 12.7654 3.23485 13.3778 4.29545Z'
            stroke='#DA5656'
            strokeWidth='1.90909'
          />
          <path
            d='M12 8L12 14'
            stroke='#DA5656'
            strokeWidth='1.5'
            strokeLinecap='round'
          />
          <circle
            cx='1'
            cy='1'
            r='1'
            transform='matrix(1 0 0 -1 11 18)'
            fill='#DA5656'
          />
        </g>
      </svg>
    ),
    hover: (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_887_916)'>
          <path
            d='M13.3778 4.29545L21.0933 17.6591C21.7056 18.7197 20.9402 20.0455 19.7155 20.0455H4.2845C3.05982 20.0455 2.29439 18.7197 2.90673 17.6591L10.6222 4.29545C11.2346 3.23485 12.7654 3.23485 13.3778 4.29545Z'
            fill='#DA5656'
            stroke='#DA5656'
            strokeWidth='1.90909'
          />
          <path d='M12 8L12 14' stroke-width='1.5' strokeLinecap='round' />
          <circle
            cx='1'
            cy='1'
            r='1'
            transform='matrix(1 0 0 -1 11 18)'
            fill='#F5F5F5'
          />
        </g>
      </svg>
    ),
  },
];

export const renderIco = (name) => {
  const icon = icons.find((icon) => icon.name === name);
  return icon;
};

const CalendarPicker = ({
  date,
  setDate,
  monthToShow,
  setMonthToShow,
  rules,
}) => {
  const [matrix, setMatrix] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const switchMonth = (moveTo) => {
    moveTo = moveTo ? 1 : -1;

    setMonthToShow(
      new Date(monthToShow?.getFullYear(), monthToShow?.getMonth() + moveTo, 1)
    );
  };

  useEffect(() => {
    let monthToRender = monthToShow ? monthToShow : new Date();
    setIsLoading(true);

    let firstDay = new Date(
      monthToRender.getFullYear(),
      monthToRender.getMonth(),
      1
    );
    let lastDay = new Date(
      monthToRender.getFullYear(),
      monthToRender.getMonth() + 1,
      0
    );

    let dates = [],
      rows = [];

    let checkDate = firstDay;

    while (checkDate <= lastDay) {
      dates.push(checkDate);
      checkDate = new Date(
        checkDate.getFullYear(),
        checkDate.getMonth(),
        checkDate.getDate() + 1
      );
    }

    for (let date of dates) {
      if (!rows.length) {
        let row = [];
        let startOfDate = new Date(date.getFullYear(), date.getMonth(), 0);
        for (let i = 0; i < date.getDay() - 1; i++) {
          if (rules?.showCurrentMonth) {
            row.push("not_selected");
            continue;
          }
          row.push(
            new Date(
              startOfDate.getFullYear(),
              startOfDate.getMonth(),
              startOfDate.getDate() - i
            )
          );
        }
        row = row.reverse();
        rows.push([...row, date]);
      } else {
        if (rows[rows.length - 1].length !== 7) {
          rows[rows.length - 1].push(date);
        } else {
          rows.push([date]);
        }
      }
    }

    if (rows[rows.length - 1].length !== 7) {
      let row = [];
      let startOfDate = new Date(
        lastDay.getFullYear(),
        lastDay.getMonth() + 1,
        1
      );
      for (let i = 0; i < 8 - rows[rows.length - 1].length; i++) {
        if (rules?.showCurrentMonth) {
          row.push("not_selected");
          continue;
        }
        row.push(
          new Date(
            startOfDate.getFullYear(),
            startOfDate.getMonth(),
            startOfDate.getDate() + i
          )
        );
      }
      rows[rows.length - 1] = [...rows[rows.length - 1], ...row];
    }

    setMatrix(rows);
    setIsLoading(false);
  }, [monthToShow, rules?.showCurrentMonth]);

  if (isLoading) {
    return (
      <div>
        <h1>Загрузка...</h1>
      </div>
    );
  }

  return (
    <div className='system_calendar'>
      <div className='system_row thead'>
        <span onClick={() => switchMonth()}>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M14.9998 19.92L8.47984 13.4C7.70984 12.63 7.70984 11.37 8.47984 10.6L14.9998 4.07999'
              stroke='#292D32'
              stroke-width='1.5'
              stroke-miterlimit='10'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </span>
        {monthToShow &&
          typeof monthToShow === "object" &&
          `${monthToShow.getMonth()} ${monthToShow.getFullYear()} г.`}
        <span className='reversed' onClick={() => switchMonth(1)}>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M14.9998 19.92L8.47984 13.4C7.70984 12.63 7.70984 11.37 8.47984 10.6L14.9998 4.07999'
              stroke='#292D32'
              stroke-width='1.5'
              stroke-miterlimit='10'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </span>
      </div>
      {matrix &&
        matrix.length > 0 &&
        matrix.map((row) => (
          <div className='system_row'>
            {row &&
              row.length > 0 &&
              row.map((item) => (
                <span
                  className={
                    typeof monthToShow === "object" &&
                    monthToShow &&
                    monthToShow?.getMonth &&
                    item?.getMonth &&
                    monthToShow?.getMonth() !== item?.getMonth()
                      ? "disabled"
                      : ""
                  }
                  onClick={() => {
                    item?.getMonth &&
                    monthToShow?.getMonth() !== item?.getMonth()
                      ? !rules?.showCurrentMonth &&
                        setMonthToShow(
                          new Date(
                            monthToShow?.getFullYear(),
                            monthToShow?.getMonth() +
                              item?.getMonth() -
                              monthToShow?.getMonth(),
                            1
                          )
                        )
                      : setDate(item);
                  }}
                >
                  {item && typeof item === "object"
                    ? item?.getDate()
                    : item === "not_selected" && ""}
                </span>
              ))}
          </div>
        ))}
    </div>
  );
};

const Input = ({ value, setValue, label, error, setError, rules, type, enableLogs, onFocus, onBlur, onInput }) => {
  const [isFocused, setIsFocused] = useState(false);
  const errorRef = useRef(null);
  const [errorRefOffsetHeigth, setErrorRefOffsetHeigth] = useState(0);
  const [isPicked, setIsPicked] = useState(false);

  const [date, setDate] = useState(null);
  const [monthToShow, setMonthToShow] = useState(new Date());

  const calendarButtonRef = useRef();

  const logger = useRef(null)
  logger.current = new SystemLogger({ value, setValue, label, error, setError, rules, type }, enableLogs, "input")
  
  useEffect(() => {
    logger.current.log({type: "first_init", data: "called useEffect first init"})
  }, [])

  useEffect(() => {
    logger.current.log({type: "called_useEffect", data: "called useEffect with validations"})
    if (typeof error !== "object" || typeof setError !== "function") {
      if (error?.status === undefined || !error?.message) {
        setError && setError({ stasus: false, message: "its ok" });
      }
    }
  }, [error, setError]);

  const recalculateErrorLabel = () => {
    setErrorRefOffsetHeigth(errorRef.current?.clientHeight);
  };

  const blurHandler = (e) => {
    setIsFocused(false);
    if (rules?.notNull) {
      if (!value || !value.length) {
        recalculateErrorLabel();
        if (setError) setError({ status: true, message: "Fill in the field" });
        return;
      }
    }
    onBlur && onBlur()
    recalculateErrorLabel();
    if (setError) setError({ status: false, message: "It`s okay" });
  };

  const inputHandler = (e) => {
    onInput && onInput()
  }

  useEffect(() => {
    if (type === "calendarpicker") {
      setValue(date);
    }
  }, [date, type, setValue]);

  // logger?.current?.log({type: "some_changes"})

  return (
    <div
      className={
        "system_input " +
        `${error?.status ? "system_error" : ""} ${
          isFocused ? "system_focused" : ""
        }`
      }
      style={{
        marginBottom: error?.status ? errorRefOffsetHeigth : 0,
      }}
    >
      <input
        onInput={inputHandler}
        onFocus={() => setIsFocused(true)}
        value={
          type === "calendarpicker"
            ? typeof value === "object"
              ? `${value?.getFullYear()}.${
                  value?.getMonth() < 10
                    ? "0" + value?.getMonth()
                    : value?.getMonth()
                }.${
                  value?.getDate() < 10
                    ? "0" + value?.getDate()
                    : value?.getDate()
                }`
              : `${new Date()?.getFullYear()}.${
                  new Date()?.getMonth() < 10
                    ? "0" + new Date()?.getMonth()
                    : new Date()?.getMonth()
                }.${
                  new Date()?.getDate() < 10
                    ? "0" + new Date()?.getDate()
                    : new Date()?.getDate()
                }`
            : value
        }
        onChange={(e) => setValue(e.target.value)}
        onBlur={blurHandler}
        placeholder={label}
        security={type === "password" ? true : false}
      />
      {type === "calendarpicker" && (
        <button
          ref={calendarButtonRef}
          onClick={() => setIsPicked(!isPicked)}
          className={`${"system_btn_ico"} ${isPicked ? "" : "disabled"}`}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M16.7502 3.56V2C16.7502 1.59 16.4102 1.25 16.0002 1.25C15.5902 1.25 15.2502 1.59 15.2502 2V3.5H8.75023V2C8.75023 1.59 8.41023 1.25 8.00023 1.25C7.59023 1.25 7.25023 1.59 7.25023 2V3.56C4.55023 3.81 3.24023 5.42 3.04023 7.81C3.02023 8.1 3.26023 8.34 3.54023 8.34H20.4602C20.7502 8.34 20.9902 8.09 20.9602 7.81C20.7602 5.42 19.4502 3.81 16.7502 3.56Z'
              fill={`${
                isPicked
                  ? "var(--main-button-background)"
                  : "var(--main-text-color)"
              }`}
            />
            <path
              d='M20 9.83997H4C3.45 9.83997 3 10.29 3 10.84V17C3 20 4.5 22 8 22H16C19.5 22 21 20 21 17V10.84C21 10.29 20.55 9.83997 20 9.83997ZM9.21 18.21C9.16 18.25 9.11 18.3 9.06 18.33C9 18.37 8.94 18.4 8.88 18.42C8.82 18.45 8.76 18.47 8.7 18.48C8.63 18.49 8.57 18.5 8.5 18.5C8.37 18.5 8.24 18.47 8.12 18.42C7.99 18.37 7.89 18.3 7.79 18.21C7.61 18.02 7.5 17.76 7.5 17.5C7.5 17.24 7.61 16.98 7.79 16.79C7.89 16.7 7.99 16.63 8.12 16.58C8.3 16.5 8.5 16.48 8.7 16.52C8.76 16.53 8.82 16.55 8.88 16.58C8.94 16.6 9 16.63 9.06 16.67C9.11 16.71 9.16 16.75 9.21 16.79C9.39 16.98 9.5 17.24 9.5 17.5C9.5 17.76 9.39 18.02 9.21 18.21ZM9.21 14.71C9.02 14.89 8.76 15 8.5 15C8.24 15 7.98 14.89 7.79 14.71C7.61 14.52 7.5 14.26 7.5 14C7.5 13.74 7.61 13.48 7.79 13.29C8.07 13.01 8.51 12.92 8.88 13.08C9.01 13.13 9.12 13.2 9.21 13.29C9.39 13.48 9.5 13.74 9.5 14C9.5 14.26 9.39 14.52 9.21 14.71ZM12.71 18.21C12.52 18.39 12.26 18.5 12 18.5C11.74 18.5 11.48 18.39 11.29 18.21C11.11 18.02 11 17.76 11 17.5C11 17.24 11.11 16.98 11.29 16.79C11.66 16.42 12.34 16.42 12.71 16.79C12.89 16.98 13 17.24 13 17.5C13 17.76 12.89 18.02 12.71 18.21ZM12.71 14.71C12.66 14.75 12.61 14.79 12.56 14.83C12.5 14.87 12.44 14.9 12.38 14.92C12.32 14.95 12.26 14.97 12.2 14.98C12.13 14.99 12.07 15 12 15C11.74 15 11.48 14.89 11.29 14.71C11.11 14.52 11 14.26 11 14C11 13.74 11.11 13.48 11.29 13.29C11.38 13.2 11.49 13.13 11.62 13.08C11.99 12.92 12.43 13.01 12.71 13.29C12.89 13.48 13 13.74 13 14C13 14.26 12.89 14.52 12.71 14.71ZM16.21 18.21C16.02 18.39 15.76 18.5 15.5 18.5C15.24 18.5 14.98 18.39 14.79 18.21C14.61 18.02 14.5 17.76 14.5 17.5C14.5 17.24 14.61 16.98 14.79 16.79C15.16 16.42 15.84 16.42 16.21 16.79C16.39 16.98 16.5 17.24 16.5 17.5C16.5 17.76 16.39 18.02 16.21 18.21ZM16.21 14.71C16.16 14.75 16.11 14.79 16.06 14.83C16 14.87 15.94 14.9 15.88 14.92C15.82 14.95 15.76 14.97 15.7 14.98C15.63 14.99 15.56 15 15.5 15C15.24 15 14.98 14.89 14.79 14.71C14.61 14.52 14.5 14.26 14.5 14C14.5 13.74 14.61 13.48 14.79 13.29C14.89 13.2 14.99 13.13 15.12 13.08C15.3 13 15.5 12.98 15.7 13.02C15.76 13.03 15.82 13.05 15.88 13.08C15.94 13.1 16 13.13 16.06 13.17C16.11 13.21 16.16 13.25 16.21 13.29C16.39 13.48 16.5 13.74 16.5 14C16.5 14.26 16.39 14.52 16.21 14.71Z'
              fill={`${
                isPicked
                  ? "var(--main-button-background)"
                  : "var(--main-text-color)"
              }`}
            />
          </svg>
          {isPicked && (
            <div
              style={{ top: calendarButtonRef?.current?.clientHeight }}
              onClick={(e) => e.stopPropagation()}
            >
              <CalendarPicker
                rules={rules}
                date={date}
                setDate={setDate}
                monthToShow={monthToShow}
                setMonthToShow={setMonthToShow}
              ></CalendarPicker>
            </div>
          )}
        </button>
      )}

      <label
        ref={errorRef}
        style={{
          bottom: error?.status ? errorRefOffsetHeigth * -1 : 0,
          opacity: error?.status ? 1 : 0,
        }}
      >
        {error?.message}
      </label>
    </div>
  );
};

export default Input;
