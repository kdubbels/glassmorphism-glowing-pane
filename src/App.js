import { useEffect, useReducer, useCallback, useRef } from 'react';
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
    <div className="App">
      <div className={`display`}>
        <h1 className={`display__time`}>{hour < 10 ? `0${hour}` : hour}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
      </div>
    </div>
  );
}

export default App;
