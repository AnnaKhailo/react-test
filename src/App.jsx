import AddWater from "./AddWater/AddWater";
import "./App.css";
// import EditWater from "./EditWater/EditWater";

// import { useState } from "react";

const App = () => {
  // const [values, setValues] = useState({
  //   x: 0,
  //   y: 0,
  // });

  // const updateX = () => {
  //   setValues({
  //     ...values,
  //     x: values.x + 50,
  //   });
  // };

  // const updateY = () => {
  //   setValues({
  //     ...values,
  //     y: values.y + 1,
  //   });
  // };

  return (
    <div>
      {/* <p>
        x: {values.x}, y: {values.y}
      </p>

      <button onClick={updateX}>Update x</button>
      <button onClick={updateY}>Update y</button> */}
      <AddWater />
      {/* <EditWater /> */}
    </div>
  );
};

export default App;
