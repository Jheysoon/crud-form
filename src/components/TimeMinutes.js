import HOURS from "../constants/hours";

const TimeMinutes = ({ addMinutes }) => {
  const date = new Date();

  const minutes = date.getMinutes().toString();
  const hour = date.getHours().toString();

  const currentTime = hour + minutes;

  return (
    <select
      name="time_minutes"
      className="form-control"
      style={{ marginLeft: 5 }}
      onChange={(e) => {
        addMinutes(e.target.value);
      }}
    >
      {HOURS.map((hour) => {
        if (hour.value > Number(currentTime)) {
          return <option value={hour.value}>{hour.label}</option>;
        }

        return null;
      })}
    </select>
  );
};

export default TimeMinutes;
