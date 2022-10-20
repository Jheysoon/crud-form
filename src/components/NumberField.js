import { useState, useMemo } from "react";

const NumberField = ({ products, addQuantity }) => {
  const [value, setValue] = useState("");

  const availableQuantity = useMemo(() => {
    const initialValue = 5;
    const sumWithInitial = products.reduce(
      (previousValue, currentValue) => previousValue - currentValue.quantity,
      initialValue
    );

    return sumWithInitial;
  }, [products]);

  return (
    <input
      className="form-control"
      type="number"
      name="quantity"
      min={1}
      max={5}
      value={value}
      onChange={(e) => {
        const _val = e.target.value;

        if (_val === "" || _val > availableQuantity) {
          setValue("");
          addQuantity(0);

          return;
        }

        if (_val > 0 && _val <= availableQuantity) {
          setValue(_val);
          addQuantity(_val);

          return;
        }

        if (_val < 6 && _val > 0) {
          setValue(_val);
          addQuantity(_val);
        }
      }}
      style={{ marginLeft: 5 }}
    />
  );
};

export default NumberField;
