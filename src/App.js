import React, { useEffect, useState } from "react";
import DisplayTime from "./Components/DisplayTime";
import Exam from "./Components/Exam";
import "./App.css";
import "antd/dist/antd.css";
import image from "./logo.png";
import { QUESTIONS } from "./data/questions";

import {
  Layout,
  Row,
  Col,
  Avatar,
  Image,
  Form,
  Input,
  Button,
  Descriptions,
  BackTop 
} from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const { Header, Content, Footer } = Layout;

function App() {
  const [takingExam, setTakingExam] = useState(false);
  const [finishedExam, setFinishedExam] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [userData, setUserData] = useState({});
  const [time, setTime] = useState({ seconds: 0, minutes: 40 });
  const [timeFinished,setTimeFinished] = useState(false)
  var updatedSeconds = time.seconds;
  var updatedMinutes = time.minutes;

  useEffect(()=>{
    if(time.minutes === 0 && time.seconds===0){
      setTimeFinished(true)
    }
  },[time])
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

  const updateAnswers = (numberOfAnsweredQuestions) => setAnsweredQuestions(numberOfAnsweredQuestions);

  const onLoginFinish = (values) => {
    setUserData(values);
    setTakingExam(true);
    start();
  };

  const onExamFinish = (values) => {
    Object.values(values).forEach(
      (answer, index) =>
        typeof answer === "undefined" &&
        (values[`${index + 1}`] = "Didn't answer")
    );
    
    console.log(values[1]);
    setAnsweredQuestions(0);
    setTakingExam(false);
    setFinishedExam(true);
  };

  
  return (
    <Layout
      style={{ minHeight: "100vh", backgroundColor: "white" }}
      className="hide"
    >
      <Header style={{ position: "fixed", zIndex: 1, width: "100%"}}>
        <Row>
          <Col span={2}>
            <Avatar size="large" src={image} />
          </Col>
          <Col offset={8} style={{ color: "white" }}>
            Remaining Time:
          </Col>
          <Col span={2}>
            <DisplayTime time={time} />
          </Col>
          {takingExam ? (
            <Col span={2} offset={7} style={{ color: "white" }}>
              {answeredQuestions}/20
            </Col>
          ) : (
            ""
          )}
        </Row>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <Row>
          <Col
            span={16}
            offset={4}
            style={{ backgroundColor: "#eee", paddingTop: "1rem" }}
          >
            <div className="info-section">
              <div className="logo">
                <Col span={15} offset={9}>
                  <Image width={200} src={image} alt="Energia Powered's logo" />
                </Col>
              </div>
              <div className="name">
                <Col>
                  <h1 style={{ fontSize: "1.8rem", textAlign: "center" }}>
                    Energia Powered
                  </h1>
                </Col>
              </div>
              <div
                className="info"
                style={{ padding: "0.8rem", textAlign: "justify" }}
              >
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
                <p>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.{" "}
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur.{" "}
                </p>
                <p>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
              <div
                id="login"
                className="login"
                style={{
                  marginTop: "1rem",
                  display: takingExam || finishedExam ? "none" : "",
                }}
              >
                <Col span={16} offset={2}>
                  <Form {...layout} onFinish={onLoginFinish} autoComplete="off">
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
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                      <Button type="secondry" htmlType="submit">
                        Start Exam
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
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
                  <Exam onFinish={onExamFinish} updateAnswers={updateAnswers} timeFinished={timeFinished} QUESTIONS={QUESTIONS} />
                </Col>
              </div>
            </div>
            <div
              className="result"
              style={{
                display: !finishedExam ? "none" : "block",
              }}
            >
              <Col>
                <p style={{ fontSize: "19px", textAlign: "center" }}>
                  Thank you {finishedExam ? userData.user.name : ""} for taking
                  the exam. <br />
                  Your answers are submitted.
                </p>
              </Col>
            </div>
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: "center", backgroundColor: "white" }}>
        ©2020 Energia Powered
      </Footer>
      <BackTop>
        <div 
          style = {{
            height: 40,
            width: 40,
            lineHeight: '40px',
            borderRadius: 4,
            backgroundColor: '#1088e9',
            color: '#fff',
            textAlign: 'center',
            fontSize: 14,
        }}>
          Top
        </div>
      </BackTop>
    </Layout>
  );
}

export default App;
