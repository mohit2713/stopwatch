const StopWatchReal = ({
  handleResume,
  handlePause,
  handleReset,
  hours,
  minutes,
  seconds,
  isPaused,
}) => {
  const format = (val) => {
    return val < 10 ? `0${val}` : val;
  };
  return (
    <div>
      <div className="stopwatch-realtime">
        <h1>{format(hours)}</h1>
        <h1>{format(minutes)}</h1>
        <h1>{format(seconds)}</h1>
        {isPaused ? (
          <button className="stopwatch-btn" onClick={handleResume}>
            ▶ Resume
          </button>
        ) : (
          <button className="stopwatch-btn" onClick={handlePause}>
            ⏸ Pause
          </button>
        )}
        <button className="stopwatch-btn" onClick={handleReset}>
          🔄 Restart
        </button>
      </div>
    </div>
  );
};

export default StopWatchReal;
