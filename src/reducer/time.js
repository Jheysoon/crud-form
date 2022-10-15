export const initialTimeState = {
  type: "asap",
  time: "",
};

export const timeReducer = (state, action) => {
  switch (action.type) {
    case "ADD_SCHEDULE":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
