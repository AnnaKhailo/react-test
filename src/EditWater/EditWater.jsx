import { Form, Formik, Field } from "formik";
import { useId, useState } from "react";

export default function EditWater() {
  const [amountOfWater, setAmountOfWater] = useState(0);
  const [result, setResult] = useState(0);
  const fieldId = useId();

  const addAmount = () => {
    setAmountOfWater(amountOfWater + 50);
  };

  const withdrawAmount = () => {
    setAmountOfWater(amountOfWater - 50);
  };

  const isNoWater = amountOfWater === 0;

  const handleEditWater = (values, actions) => {
    // dispatch(addWater(values));
    console.log(values);
    actions.resetForm();
  };

  return (
    <div>
      <Formik initialValues={{ amount: 0 }} onSubmit={handleEditWater}>
        {({ setFieldValue }) => (
          <Form>
            <h2>Edit the entered amount of water</h2>
            <div>Data //initial value of water which we are correcting//</div>
            <p>Correct entered data:</p>
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
              disabled={isNoWater}
              onBlur={() => {
                setFieldValue("amount", amountOfWater);
                setResult(amountOfWater);
              }}
            >
              -
            </button>
            <div>
              <label htmlFor={`${fieldId}-amount`}>
                Enter the value of the water used:
              </label>
              <Field
                name="amount"
                id={`${fieldId}-amount`}
                onBlur={(e) => {
                  setAmountOfWater(Number(e.target.value));
                  setResult(Number(e.target.value));
                }}
              />
            </div>
            <p>{result}ml</p>
            <button type="submit">Save</button>
            <button type="button">Close</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
