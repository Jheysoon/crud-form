const TimeType = ({ value, addTimeType }) => {
  return (
    <select
      name="time_type"
      className="form-control"
      style={{ marginRight: 5 }}
      value={value}
      onChange={(e) => {
        addTimeType(e.target.value);
      }}
    >
      <option value="today">Today</option>
      <option value="asap">Asap</option>
      <option value="tomorrow">Tomorrow</option>
    </select>
  );
};

export default TimeType;
