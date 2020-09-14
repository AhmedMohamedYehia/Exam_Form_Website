import React from 'react';
import '../App.css';
import { Progress, Row } from 'antd';

function DisplayTime(props) {
  const totalNumberOfMinutes=40;
  var percentage=(((props.time.minutes*60)+props.time.seconds)/(totalNumberOfMinutes*60))*100;
  return (
    <Row justify="center">
      <div id="display-time">
        <div className="display-time-container">
          <div style={{ color: "white" }}>
            <span>{(props.time.minutes >= 10) ? props.time.minutes : "0" + props.time.minutes}</span>&nbsp;:&nbsp;
            <span>{(props.time.seconds >= 10) ? props.time.seconds : "0" + props.time.seconds}</span>
          </div>
          <Progress percent={percentage} />
        </div>
      </div>
    </Row>
  );
}

export default DisplayTime;