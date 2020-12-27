import { useEffect, useReducer, useCallback, useRef, useState } from 'react';
import './App.css';

const SET_TIME = 'SET_TIME';

// useInterval hook from 30secondsofcode
// https://www.30secondsofcode.org/react/s/use-interval
const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const initialState = {
  hour: undefined, 
  minutes: undefined, 
  seconds: undefined
}

function reducer(state, action) {
  if (action.type === SET_TIME) {
    return {
      ...state,
      ...action.payload
    };
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [darkMode, setDarkMode] = useState(true);

  function toggleDarkMode() {
    console.log(darkMode);
    if (darkMode) {
      document.querySelector('body').style.background = 'white';
    } else {
      document.querySelector('body').style.background = '#212';
    }
    setDarkMode(!darkMode);
  }

  function setTime({hour, minutes, seconds}) {
    dispatch({
      type: SET_TIME,
      payload:{
        hour,
        minutes,
        seconds
      }
    })
  }

  const setDate = useCallback(
    () => {
      const now = new Date();

      const seconds = now.getSeconds();

      const minutes = now.getMinutes();

      const hour = now.getHours();

      setTime({hour, minutes, seconds});
    },
    [],
  );

  useInterval(() => {
    setDate();
  }, 100);
  
  const { hour, minutes, seconds } = state;

  return (
    <div className={`App ${darkMode ? '' : `light-mode`}`}>
      <div className={`display ${darkMode ? '' : `light-mode`}`}>
        <h1 className={`display__time`}>{hour < 10 ? `0${hour}` : hour}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
      </div>
      <div>
        <label className="switch">
          <input type="checkbox" onChange={() => toggleDarkMode()}/>
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
}

export default App;
