import React, { useEffect } from "react";
import { Form, Radio, Button } from "antd";

let dummyAnswers = {
  1: "Didn't answer",
  2: "Didn't answer",
  3: "Didn't answer",
  4: "Didn't answer",
  5: "Didn't answer",
  6: "Didn't answer",
  7: "Didn't answer",
  8: "Didn't answer",
  9: "Didn't answer",
  10: "Didn't answer",
  11: "Didn't answer",
  12: "Didn't answer",
  13: "Didn't answer",
  14: "Didn't answer",
  15: "Didn't answer",
  16: "Didn't answer",
  17: "Didn't answer",
  18: "Didn't answer",
  19: "Didn't answer",
  20: "Didn't answer",
};

let numberOfAnsweredQuestions = 0;

function Questions({ questions, updateAnswers }) {
  const answered = (e, quesitonID) => {
    dummyAnswers[quesitonID] = e.target.value;
    numberOfAnsweredQuestions = 0;
    for (let i = 1; i < 21; i++) {
      if (dummyAnswers[i] !== "Didn't answer") {
        numberOfAnsweredQuestions += 1;
      }
    }
  };

  return questions.map((question) => (
    <div>
      <h3>Question {question.id}</h3>
      <Form.Item
        name={`${question.id}`}
        label={question.question}
        className="quesiton"
        style={{ borderBottom: "solid lightGrey", paddingBottom: "0.8rem" }}
      >
        <Radio.Group
          style={{ display: "flex", flexDirection: "column" }}
          onChange={(e) => {
            answered(e, question.id);
          }}
        >
          {question.answers.map((answer) => (
            <Radio
              onChange={updateAnswers}
              value={answer}
              style={{ width: "fit-content" }}
            >
              {answer}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    </div>
  ));
}

function Exam({ onFinish, updateAnswers, timeFinished, QUESTIONS }) {
  useEffect(() => {
    if (timeFinished) {
      onFinish(dummyAnswers);
    }
  }, [onFinish, timeFinished]);

  return (
    <Form onFinish={onFinish} autoComplete="off">
      <Questions
        questions={QUESTIONS}
        updateAnswers={updateAnswers(numberOfAnsweredQuestions)}
      />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit Exam
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Exam;
