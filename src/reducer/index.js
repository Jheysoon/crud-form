export const initialState = [];

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return [...state, { coffee: "", quantity: 0 }];

    case "MODIFY_QUANTITY":
      return state.map((product, key) => {
        if (key === action.productIndex) {
          return { ...product, quantity: action.quantity };
        }

        return product;
      });

    case "MODIFY_COFFEE":
      return state.map((product, key) => {
        if (key === action.productIndex) {
          return { ...product, coffee: action.coffee };
        }

        return product;
      });

    case "REMOVE_PRODUCT":
      const products = [];

      state.forEach((product, key) => {
        if (key !== action.productIndex) {
          products.push(product);
        }
      });

      return products;

    default:
      return state;
  }
};
