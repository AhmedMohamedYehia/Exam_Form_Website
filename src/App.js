import React, { useEffect, useState } from "react";
import DisplayTime from "./Components/DisplayTime";
import Exam from "./Components/Exam";
import "./App.css";
import "antd/dist/antd.css";
import image from "./logo.png";
import $ from "jquery";
import { QUESTIONS } from "./data/questions";
import { Col, Avatar, Form, Input, Button, Descriptions, BackTop } from "antd";

function App() {
  const [takingExam, setTakingExam] = useState(false);
  const [finishedExam, setFinishedExam] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [userGrade, setUserGrade] = useState(0);
  const [userData, setUserData] = useState({});
  const [time, setTime] = useState({ seconds: 0, minutes: 10 });
  const [timeFinished, setTimeFinished] = useState(false);

  var updatedSeconds = time.seconds;
  var updatedMinutes = time.minutes;

  useEffect(() => {
    if (time.minutes === 0 && time.seconds === 0) {
      setTimeFinished(true);
    }
  }, [time]);

  const start = () => {
    run();
    setInterval(run, 1000);
  };

  const run = () => {
    if (updatedSeconds === 0 && updatedMinutes !== 0) {
      updatedMinutes--;
      updatedSeconds = 60;
    }
    if (updatedMinutes === 0 && updatedSeconds === 0) {
      setFinishedExam(true);
      setTakingExam(false);
    } else {
      updatedSeconds--;
    }
    return setTime({ seconds: updatedSeconds, minutes: updatedMinutes });
  };

  const updateAnswers = (numberOfAnsweredQuestions) =>
    setAnsweredQuestions(numberOfAnsweredQuestions);

  const onLoginFinish = (values) => {
    setUserData(values);
    setTakingExam(true);
    start();
  };

  const onExamFinish = (values) => {
    let grade = userGrade;
    Object.values(values).forEach((answer, index) => {
      typeof answer === "undefined" &&
        (values[`${index + 1}`] = "Didn't answer");
      if (QUESTIONS[index] && answer === QUESTIONS[index].correct) {
        grade += 1
      }
    })

    setUserGrade(grade);

    values["name"] = userData.user.name;
    values["email"] = userData.user.email;
    values["grade"] = grade;

    setAnsweredQuestions(0);
    setTakingExam(false);
    setFinishedExam(true);
    setTime({ seconds: 999, minutes: 999 });

    $.ajax({
      url:
        "https://script.google.com/macros/s/AKfycbzm-iZ_pf9sd0XGLcAk3-2hzhXHLpc4uv5nW9mVk5Q2ZjvyOWdx/exec",
      method: "GET",
      dataType: "json",
      data: values,
    });
  }

  return (
    <>
      <div
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          top: "0",
          backgroundColor: "#333",
        }}
      >
        <dic className="row">
          <div
            className="col-1"
            style={{
              marginLeft: "1rem",
              marginTop: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            <Avatar size="large" src={image} />
          </div>
          <div className="col-4"></div>
          <div
            className="col-2"
            style={{ paddingTop: "1rem", display: finishedExam ? "none" : "" }}
          >
            <DisplayTime time={time} />
          </div>
          <div
            className="col-3"
            style={{ display: takingExam ? "none" : "" }}
          ></div>
          {/* <div className="col-1" style={{display:takingExam?"":"none"}}></div> */}
          {takingExam ? (
            <div
              className="col-1"
              offset={7}
              style={{ color: "white", paddingTop: "1rem" }}
            >
              {answeredQuestions}/{QUESTIONS.length}
            </div>
          ) : (
              ""
            )}
        </dic>
      </div>
      <div
        className="site-layout"
        style={{ padding: "0 50px", marginTop: "100px" }}
      >
        <div className="row">
          <div className="col-lg-2 col-sm-0"></div>
          <div
            className="col-lg-8 col-sm-12"
            style={{ backgroundColor: "#eee", paddingTop: "1rem" }}
          >
            <div className="info-section">
              <div className="logo row">
                <div className="col-4"></div>
                <div className="col-lg-4 col-sm-0 col-md-2">
                  <img
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                    src={image}
                    alt="Energia Powered's logo"
                  />
                </div>
              </div>
              <div className="name">
                <div className="col">
                  <h1 style={{ fontSize: "1.8rem", textAlign: "center" }}>
                    Energia Powered
                  </h1>
                </div>
              </div>
              <div
                className="info"
                style={{ padding: "0.8rem", textAlign: "center" }}
              >
                {finishedExam ?
                  <p>
                    You did it!<br />
                    Thank you for your interest to join us.<br />
                    Wait for us, we will contact you soon.
                  </p>
                  :
                  <p>
                    Thank you for applying with us.<br />
                    This IQ test is the 2<sup>nd</sup> step of applying before the interview so be sure doing your best to pass it , so we can meet you at the interview.
                    Good luck.
                  </p>
                }
              </div>
              <div
                id="login"
                className="login"
                style={{
                  marginTop: "1rem",
                  display: takingExam || finishedExam ? "none" : "",
                }}
              >
                <div className="col-lg-2 col-sm-0"></div>
                <div className="col-lg-8 col-sm-8">
                  <Form onFinish={onLoginFinish} autoComplete="off">
                    <Form.Item
                      name={["user", "name"]}
                      label="Name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter a Name",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name={["user", "email"]}
                      label="Email"
                      rules={[
                        {
                          type: "email",
                          message: "Please enter a valid email",
                        },
                        {
                          required: true,
                          message: "Please enter an Email",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item>
                      <Button type="secondry" htmlType="submit" size="large">
                        Start Exam
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
            <div
              className="entered-data"
              style={{ display: !takingExam ? "none" : "" }}
            >
              <Col span={16} offset={6}>
                <Descriptions title="Entered User Info">
                  <Descriptions.Item label="Name">
                    {takingExam ? userData.user.name : ""}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {takingExam ? userData.user.email : ""}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
              <div className="questions-section">
                <Col span={16} offset={4}>
                  <Exam
                    onFinish={onExamFinish}
                    updateAnswers={updateAnswers}
                    timeFinished={timeFinished}
                    QUESTIONS={QUESTIONS}
                  />
                </Col>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "white",
          margin: "1.5rem",
        }}
      >
        ©2020 Energia Powered
      </div>
      <BackTop>
        <div
          style={{
            height: 40,
            width: 40,
            lineHeight: "40px",
            borderRadius: 4,
            backgroundColor: "#1088e9",
            color: "#fff",
            textAlign: "center",
            fontSize: 14,
          }}
        >
          Top
        </div>
      </BackTop>
    </>
  );
}

export default App;
