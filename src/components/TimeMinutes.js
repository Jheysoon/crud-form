import HOURS from "../constants/hours";

const TimeMinutes = ({ addMinutes, timeType, value }) => {
  const date = new Date(); //new Date(2022, 9, 15, 10, 0);

  if (timeType === "today") {
    date.setMinutes(date.getMinutes() + 15);
  }

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
      disabled={timeType === "asap"}
      value={value}
    >
      {(timeType === "tomorrow" || timeType === "today") && (
        <>
          {HOURS.map((hour) => {
            if (hour.value >= Number(currentTime) || timeType === "tomorrow") {
              return <option value={hour.value}>{hour.label}</option>;
            }

            return null;
          })}
        </>
      )}

      {timeType === "asap" && (
        <>
          {HOURS.map((hour) => (
            <option value={hour.value}>{hour.label}</option>
          ))}
        </>
      )}
    </select>
  );
};

export default TimeMinutes;
