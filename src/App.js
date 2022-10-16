import { useReducer } from "react";

import "./App.css";
import Form from "./components/Form";
import NumberField from "./components/NumberField";
import ProductSelect from "./components/ProductSelect";
import TimeMinutes from "./components/TimeMinutes";
import TimeType from "./components/TimeType";

import { initialState, reducer } from "./reducer";
import { initialTimeState, timeReducer } from "./reducer/time";

import HOURS from "./constants/hours";

const App = () => {
  const [products, productDispatch] = useReducer(reducer, initialState);
  const [time, timeDispatch] = useReducer(timeReducer, initialTimeState);

  const addCoffeeBtn = () => {
    let totalQuantity = 0;
    let quantityHasZero = false;

    products.forEach((product) => {
      totalQuantity += product.quantity;

      if (product.quantity === 0) {
        quantityHasZero = true;
      }
    });

    if (totalQuantity < 5 && quantityHasZero === false) {
      productDispatch({ type: "ADD_PRODUCT" });
    }
  };

  const submitBtn = async () => {
    const payload = {
      products: products,
      ...time,
    };

    await fetch("/", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  };

  const setTime = (type) => {
    const date = new Date(); // new Date(2022, 9, 15, 10, 0);

    if (type === "today") {
      date.setMinutes(date.getMinutes() + 15);
    }

    //prettier-ignore
    const minutes = date.getMinutes().toString() === "0"  ? "00" : date.getMinutes().toString();
    const hour = date.getHours().toString();

    const currentTime = hour + minutes;

    for (let i = 0; i < HOURS.length; i++) {
      if (HOURS[i].value >= Number(currentTime)) {
        timeDispatch({
          type: "ADD_SCHEDULE",
          payload: { time: HOURS[i].value },
        });

        break;
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Form>
          <fieldset>
            <legend style={{ color: "#000" }}>Select Orders</legend>
            {products.map((_, key) => (
              <div key={key} style={{ display: "flex" }}>
                <ProductSelect
                  addProduct={(coffee) => {
                    productDispatch({
                      type: "MODIFY_COFFEE",
                      productIndex: key,
                      coffee: coffee,
                    });
                  }}
                />

                <NumberField
                  products={products}
                  addQuantity={(quantity) => {
                    productDispatch({
                      type: "MODIFY_QUANTITY",
                      productIndex: key,
                      quantity: quantity,
                    });
                  }}
                />
              </div>
            ))}

            <button
              className="btn btn-primary"
              type="button"
              onClick={addCoffeeBtn}
            >
              Add Order
            </button>
          </fieldset>

          <fieldset>
            <legend style={{ color: "#000" }}>Select Time</legend>
            <div style={{ display: "flex" }}>
              <TimeType
                value={time.type}
                addTimeType={(type) => {
                  let _time = {};

                  if (type === "tomorrow") {
                    _time = { time: HOURS[0].value };
                  }

                  timeDispatch({
                    type: "ADD_SCHEDULE",
                    payload: { type: type, ..._time },
                  });

                  // set the default time whenever change time type is change
                  if (type === "asap" || type === "today") {
                    setTime(type);
                  }
                }}
              />

              <TimeMinutes
                value={time.time}
                timeType={time.type}
                addMinutes={(time) => {
                  timeDispatch({
                    type: "ADD_SCHEDULE",
                    payload: { time: time },
                  });
                }}
              />
            </div>
          </fieldset>

          <button
            className="btn btn-primary"
            type="button"
            onClick={submitBtn}
            style={{ width: "100%" }}
          >
            Submit
          </button>
        </Form>
      </header>
    </div>
  );
};

export default App;
