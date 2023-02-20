import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  const [stuff, setStuff] = useState({});
  const [mathCalc, setMathCalc] = useState(0);

  useEffect(() => {
    const { x, y, z } = stuff;

    calc(Math.sqrt(x * x + y * y + z * z));
  }, [stuff]);

  const calc = (accel) => {
    console.log({ accel });
    console.log({ mathCalc });
    const { x, y, z } = stuff;
    if (accel > mathCalc) {
      setMathCalc(Math.sqrt(x * x + y * y + z * z));
    }
  };

  const doDeviceMotion = () => {
    if (
      typeof DeviceMotionEvent !== 'undefined' &&
      typeof DeviceMotionEvent.requestPermission === 'function'
    ) {
      DeviceMotionEvent.requestPermission().then((response) => {
        if (response === 'granted') {
          window.addEventListener('devicemotion', (event) => {
            setStuff(event.accelerationIncludingGravity);
            console.log(event.accelerationIncludingGravity);
          });
        }
      });
    } else {
      window.addEventListener('devicemotion', (event) => {
        setStuff(event.accelerationIncludingGravity);
        console.log(event.accelerationIncludingGravity);
      });
    }
  };

  return (
    <div className="App">
      <div> {JSON.stringify(stuff)}</div>
      <div> {mathCalc} </div>
      <div className="card">
        <button onClick={() => doDeviceMotion()}>Click me</button>
      </div>
    </div>
  );
}

export default App;
