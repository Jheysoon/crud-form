import PRODUCT_LIST from "../constants/products";

const ProductSelect = ({ addProduct }) => {
  return (
    <select
      name="coffee"
      onChange={(e) => {
        if (e.target.value) {
          addProduct(e.target.value);
        }
      }}
      className="form-control"
      style={{ marginRight: 5 }}
    >
      <option value=""></option>
      {PRODUCT_LIST.map((productList) => (
        <option value={productList.value}>{productList.label}</option>
      ))}
    </select>
  );
};

export default ProductSelect;
