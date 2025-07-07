const StopWatchUi = ({ handleTime, handleSet }) => {
  return (
    <div>
      <div className="stopwatch-timebtn">
        <input
          id="hours"
          className="stopwatch-box"
          placeholder="Hr"
          onChange={handleTime}
        />
        <input
          id="minutes"
          className="stopwatch-box"
          placeholder="Min"
          onChange={handleTime}
        />
        <input
          id="seconds"
          className="stopwatch-box"
          placeholder="Sec"
          onChange={handleTime}
        />
        <button onClick={handleSet} className="stopwatch-btn">
          Start
        </button>
      </div>
    </div>
  );
};

export default StopWatchUi;
