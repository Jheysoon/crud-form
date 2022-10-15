const Form = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        width: 400,
        margin: "0 auto",
        borderRadius: 4,
        padding: 10,
      }}
    >
      {children}
    </div>
  );
};

export default Form;
