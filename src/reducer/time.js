export const initialTimeState = {
  type: "today",
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
