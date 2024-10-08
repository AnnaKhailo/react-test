import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addWater,
  getWaterForToday,
} from "../../redux/waterRequests/operations";
import showToast from "../showToast";
import "react-toastify/ReactToastify.css";
import css from "./AddWater.module.css";

import { selectIsAddWaterModalOpen } from "../../redux/modalWindow/selectors";
import { closeModal } from "../../redux/modalWindow/slice";
import ModalWrapper from "../common/ModalWrapper/ModalWrapper";
import { getWaterForMonth } from "../../redux/monthStats/operations.js";
import {
  selectCurrentMonth,
  selectCurrentYear,
} from "../../redux/monthStats/selects.js";

const WaterSchema = Yup.object().shape({
  date: Yup.string().required("Required field!"),
  waterVolume: Yup.number()
    .min(1, "Too little! Min 1 ml")
    .max(5000, "Too much! Max 5000 ml")
    .required("Required field!"),
});

export default function AddWater() {
  const dispatch = useDispatch();
  const modalIsOpen = useSelector(selectIsAddWaterModalOpen); //для модалки

  const currentMonth = useSelector(selectCurrentMonth); //TODO
  const currentYear = useSelector(selectCurrentYear); //TODO
  const fieldId = useId();

  const [amountOfWater, setAmountOfWater] = useState(50);

  const incrementOfCounter = 50;

  const addAmount = () => {
    setAmountOfWater(amountOfWater + incrementOfCounter);
  };

  const withdrawAmount = () => {
    if (amountOfWater >= incrementOfCounter) {
      setAmountOfWater(amountOfWater - incrementOfCounter);
    }
  };

  // Генерування списку з часом
  const timeNow = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const generateListOfTime = () => {
    const options = [];
    const startHour = 0;
    const endHour = 23;

    for (let hour = startHour; hour <= endHour; hour += 1) {
      for (let minute = 0; minute < 60; minute += 5) {
        const ampm = hour >= 12 ? "PM" : "AM";
        const hour12 = hour % 12 || 12;
        const time = `${hour12.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")} ${ampm}`;
        options.push(time);
      }
    }

    return options;
  };

  const listOfTime = generateListOfTime();

  // Форматування дати для відправки на бекенд
  function formatDateTime(time) {
    const formattedDate = new Date().toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return new Date(`${formattedDate} ${time}`).toISOString();
  }

  useEffect(() => {}, []);

  // Функція відправки даних на бекенд
  const handleAddWater = (values, actions) => {
    const date = formatDateTime(values.date);
    const waterVolume = values.waterVolume;
    dispatch(addWater({ waterVolume, date }))
      .unwrap()
      .then(() => {
        showToast("Water add successful!", "success");
        actions.resetForm();
        dispatch(getWaterForToday());
        dispatch(closeModal());
        setAmountOfWater(50);
        //TODO Обновляем данные за текущий месяц в компоненте MonthStatsTable
        dispatch(
          getWaterForMonth({ year: currentYear, month: currentMonth + 1 })
        );
      })
      .catch(() => {
        showToast("Water add failed!", "error");
      });
  };

  return (
    <ModalWrapper
      modalIsOpen={modalIsOpen}
      closeModal={() => {
        dispatch(closeModal());
        setAmountOfWater(50);
      }}
      customStyles={{
        content: {
          padding: "0",
        },
      }}
    >
      <Formik
        initialValues={{ date: timeNow, waterVolume: 50 }}
        onSubmit={handleAddWater}
        validationSchema={WaterSchema}
      >
        {({ setFieldValue }) => (
          <Form className={css.formContainer}>
            <h2 className={css.title}>Add water</h2>
            <p className={css.text}>Choose a value:</p>
            <p className={css.textCounter}>Amount of water:</p>
            <div className={css.counterContainer}>
              <button
                className={css.amountBtn}
                onClick={() => {
                  withdrawAmount();
                  if (amountOfWater > 0) {
                    setFieldValue(
                      "waterVolume",
                      amountOfWater - incrementOfCounter
                    );
                  }
                }}
                type="button"
              >
                <svg className={css.iconMinus} width={24} height={24}>
                  <use href="/spriteFull.svg#icon-minus"></use>
                </svg>
              </button>
              <div className={css.amountCounter}>{amountOfWater}ml</div>
              <button
                className={css.amountBtn}
                onClick={() => {
                  addAmount();
                  setFieldValue(
                    "waterVolume",
                    amountOfWater + incrementOfCounter
                  );
                }}
                type="button"
              >
                <svg className={css.iconPlus} width={24} height={24}>
                  <use href="/spriteFull.svg#icon-plus"></use>
                </svg>
              </button>
            </div>
            <div className={css.timeContainer}>
              <label className={css.labelTime} htmlFor={`${fieldId}-date`}>
                Recording time:
              </label>
              <Field
                as="select"
                name="date"
                className={css.input}
                id={`${fieldId}-date`}
              >
                <option value={timeNow}>{timeNow}</option>
                {listOfTime.map((date, index) => (
                  <option key={index} value={date}>
                    {date}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                className={css.error}
                name="date"
                component="span"
              />
            </div>
            <div className={css.enterValueContainer}>
              <label
                className={css.enterValueLabel}
                htmlFor={`${fieldId}-waterVolume`}
              >
                Enter the value of the water used:
              </label>
              <Field
                className={css.input}
                name="waterVolume"
                type="number"
                min="0"
                id={`${fieldId}-waterVolume`}
                onChange={(e) => {
                  setFieldValue("waterVolume", Number(e.target.value));
                  setAmountOfWater(Number(e.target.value));
                }}
              />
              <ErrorMessage
                className={css.error}
                name="waterVolume"
                component="span"
              />
            </div>
            <div className={css.resultContainer}>
              <p className={css.textResult}>{amountOfWater}ml</p>
              <button className={css.saveBtn} type="submit">
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
