import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId, useState } from "react";

import css from "./AddWater.module.css";

export default function AddWater() {
  const [amountOfWater, setAmountOfWater] = useState(0);
  const [result, setResult] = useState(0);
  const fieldId = useId();
  const incrementOfCounter = 50;

  const addAmount = () => {
    setAmountOfWater(amountOfWater + incrementOfCounter);
  };

  const withdrawAmount = () => {
    if (amountOfWater >= incrementOfCounter) {
      setAmountOfWater(amountOfWater - incrementOfCounter);
    }
  };

  const handleAddWater = (values) => {
    // dispatch(addWater(values));
    // actions.resetForm();
    console.log(formatDateTime(values.time));
    console.log(values);
  };

  // About TIME
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

  ///////Форматування дати для відправки на бекенд////
  function formatDateTime(time) {
    const formattedDate = new Date()
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");
    return `${formattedDate} ${time}`;
  }
  ////////////////////////////////////////////////////

  const WaterSchema = Yup.object().shape({
    time: Yup.string()
      .min(5, "Too Short! Min 3 symbols")
      .max(50, "Too Long! Max 50 symbols")
      .required("Required field!"),
    amount: Yup.number()
      .min(1, "Too little! Min 1 ml")
      .max(5000, "Too much! Max 5000 ml")
      .required("Required field!"),
  });

  return (
    <Formik
      initialValues={{ time: timeNow, amount: 0 }}
      onSubmit={handleAddWater}
      validationSchema={WaterSchema}
    >
      {({ setFieldValue }) => (
        <Form>
          <h2>Add water</h2>
          <p>Choose a value:</p>
          <p>Amount of water:</p>
          <button
            onClick={addAmount}
            type="button"
            onBlur={() => {
              setFieldValue("amount", amountOfWater);
              setResult(amountOfWater);
            }}
          >
            +
          </button>
          <p>{amountOfWater}ml</p>
          <button
            onClick={withdrawAmount}
            type="button"
            onBlur={() => {
              setFieldValue("amount", amountOfWater);
              setResult(amountOfWater);
            }}
          >
            -
          </button>
          <div>
            <label htmlFor={`${fieldId}-time`}>Recording time:</label>
            <Field as="select" name="time" id={`${fieldId}-time`}>
              <option value={timeNow}>{timeNow}</option>
              {listOfTime.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </Field>
            <ErrorMessage className={css.error} name="time" component="span" />
          </div>
          <div>
            <label htmlFor={`${fieldId}-amount`}>
              Enter the value of the water used:
            </label>
            <Field
              name="amount"
              type="number"
              id={`${fieldId}-amount`}
              onBlur={(e) => {
                setAmountOfWater(Number(e.target.value));
                setResult(Number(e.target.value));
              }}
            />
            <ErrorMessage
              className={css.error}
              name="amount"
              component="span"
            />
          </div>
          <p>{result}ml</p>
          <button type="submit">Save</button>
          <button type="button">Close</button>
        </Form>
      )}
    </Formik>
  );
}
