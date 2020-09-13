import React, {useState, useEffect} from 'react';
import DisplayTime from './Components/DisplayTime';
import "antd/dist/antd.css";

function App() {
  const [time, setTime]= useState({seconds:0, minutes:40})
  const [interv, setInterv] = useState();

  var updatedSeconds=time.seconds;
  var updatedMinutes=time.minutes;

  useEffect(()=>{
      start();
  },[]);
  const start = () => {
    run();
    setInterv(setInterval(run, 1000));
  };

  const run = () => {
    if(updatedSeconds === 0 && updatedMinutes !== 0){
      updatedMinutes--;
      updatedSeconds = 60;
    }
    if(updatedMinutes === 0 && updatedSeconds ===0){}
    else{
      updatedSeconds--;
    }
    return setTime({seconds:updatedSeconds, minutes:updatedMinutes});
  };

  return (
    <div className="App">
      <DisplayTime time={time}/>
    </div>
  );
}

export default App;
