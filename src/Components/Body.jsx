import { useEffect, useState } from "react";
import "./body.css";

const Body = () => {
  const [toggle, setToogle] = useState(true);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeID, setTimeId] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // console.log(hours, minutes, seconds);

  const handlePause = () => {
    setIsPaused(true);
    clearInterval(timeID);
  };

  const handleResume = () => {
    setIsPaused(false);
    runTimmer(hours, seconds, minutes);
  };

  const handleSet = () => {
    if (
      (hours === 0 && minutes === 0 && seconds === 0) ||
      hours < 0 ||
      minutes < 0 ||
      seconds < 0
    )
      setToogle(true);
    else setToogle(false);
  };
  const handleReset = () => {
    setToogle(true);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const handleTime = (e) => {
    const value = parseInt(e.target.value);
    const id = e.target.id;
    console.log(value, id);

    if (id === "hours") {
      setHours(value);
    } else if (id === "minutes") {
      setMinutes(value);
    } else {
      setSeconds(value);
    }
  };

  const runTimmer = (hr, sec, min, tid) => {
    if (sec > 0) {
      setSeconds((s) => s - 1);
    } else if (sec === 0 && min > 0) {
      console.log("sec chnge");
      setMinutes((m) => m - 1);
      setSeconds(59);
    } else {
      setSeconds(59);
      setMinutes(59);
      setHours((h) => h - 1);
    }

    if (hr === 0 && min === 0 && sec === 0) {
      setToogle(true);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      clearInterval(tid);
    }
  };

  useEffect(() => {
    let tid;
    if (!toggle) {
      tid = setInterval(() => {
        runTimmer(hours, seconds, minutes, tid);
      }, 1000);
      setTimeId(tid);

      return () => {
        clearInterval(tid);
      };
    }
  }, [toggle, seconds, minutes]);
  return (
    <div>
      {toggle && (
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
      )}

      {!toggle && (
        <div>
          <div className="stopwatch-realtime">
            <h1>{hours < 10 ? "0" + " " + hours : hours}</h1>
            <h1>{minutes < 10 ? "0" + " " + minutes : minutes}</h1>
            <h1>{seconds < 10 ? "0" + " " + seconds : seconds}</h1>
            {isPaused ? (
              <button className="stopwatch-btn" onClick={handleResume}>
                Resume
              </button>
            ) : (
              <button className="stopwatch-btn" onClick={handlePause}>
                Pause
              </button>
            )}
            <button className="stopwatch-btn" onClick={handleReset}>
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;
