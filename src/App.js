import { useReducer } from "react";

import "./App.css";
import Form from "./components/Form";
import NumberField from "./components/NumberField";
import ProductSelect from "./components/ProductSelect";
import TimeMinutes from "./components/TimeMinutes";
import TimeType from "./components/TimeType";

import { initialState, reducer } from "./reducer";
import { initialTimeState, timeReducer } from "./reducer/time";

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
                  timeDispatch({
                    type: "ADD_SCHEDULE",
                    payload: { type: type, time: "" },
                  });
                }}
              />

              {time.type === "today" && (
                <TimeMinutes
                  addMinutes={(time) => {
                    timeDispatch({
                      type: "ADD_SCHEDULE",
                      payload: { time: time },
                    });
                  }}
                />
              )}
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
