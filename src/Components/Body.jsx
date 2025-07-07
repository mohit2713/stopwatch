import { useEffect, useState } from "react";
import "../css/body.css";
import StopWatchUi from "./StopWatchUi";
import StopWatchReal from "./StopWatchReal";

const Body = () => {
  const [toggle, setToogle] = useState(true);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeID, setTimeId] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // console.log(hours, minutes, seconds);

  const setZeroAll = (tid) => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    clearInterval(tid);
  };

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
    ) {
      setToogle(true);
      alert("Invalid Input ❌");
    } else setToogle(false);
  };
  const handleReset = () => {
    setToogle(true);
    setZeroAll();
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
      setZeroAll(tid);
      alert("Timmer Completed ✅");
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
  }, [toggle, hours, seconds, minutes]);
  return (
    <div>
      {toggle && <StopWatchUi handleSet={handleSet} handleTime={handleTime} />}
      {!toggle && (
        <StopWatchReal
          handleResume={handleResume}
          handlePause={handlePause}
          handleReset={handleReset}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          isPaused={isPaused}
        />
      )}
    </div>
  );
};

export default Body;
