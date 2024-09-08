import { Form, Formik, Field } from "formik";
import { useId, useState } from "react";

export default function TodayListModal() {
  const [amountOfWater, setAmountOfWater] = useState(0);
  const [result, setResult] = useState(0);

  const addValue = () => {
    setAmountOfWater(amountOfWater + 50);
  };

  const withdrawValue = () => {
    setAmountOfWater(amountOfWater - 50);
  };

  const isNoWater = amountOfWater === 0;

  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const timeNow = `${hours}:${minutes}`;

  const generateListOfTime = () => {
    const options = [];
    const startHour = 0;
    const endHour = 23;

    for (let hour = startHour; hour <= endHour; hour += 1) {
      for (let minute = 0; minute < 60; minute += 5) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        options.push(time);
      }
    }

    return options;
  };

  const listOfTime = generateListOfTime();

  const fieldId = useId();

  const initialValues = {
    time: timeNow,
    value: amountOfWater,
  };

  const handleEditVolumeWater = (values) => {
    //   dispatch(editContact({ contactId: id, update: values }))
    //     .unwrap()
    //     .then(() => toast.success("Contact changed!"))
    //     .catch(() => toast.error("Error!"));
    //   setIsModalEditOpen(false);
    console.log(values);
  };

  return (
    <div>
      <h2>Edit the entered amount of water</h2>
      <div>Data //initial value of water which we are correcting//</div>
      <p>Correct entered data:</p>
      <Formik initialValues={initialValues} onSubmit={handleEditVolumeWater}>
        <Form>
          <p>Amount of water:</p>
          <button
            onClick={addValue}
            type="button"
            onBlur={() => setResult(amountOfWater)}
          >
            +
          </button>
          <p>{amountOfWater}ml</p>
          <button
            onClick={withdrawValue}
            type="button"
            disabled={isNoWater}
            onBlur={() => setResult(amountOfWater)}
          >
            -
          </button>

          <div>
            <label htmlFor={`${fieldId}-time`}>Recording time:</label>
            <Field as="select" name="time" id={`${fieldId}-time`}>
              <option value={timeNow} type="time">
                {timeNow}
              </option>
              {listOfTime.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </Field>
          </div>
          <div>
            <label htmlFor={`${fieldId}-value`}>
              Enter the value of the water used:
            </label>
            <Field
              type="text"
              name="value"
              id={`${fieldId}-value`}
              onBlur={(e) => {
                setAmountOfWater(Number(e.target.value));
                setResult(Number(e.target.value));
              }}
            />
          </div>

          <p>{result}ml</p>
          <button type="submit">Save</button>
        </Form>
      </Formik>
    </div>
  );
}
