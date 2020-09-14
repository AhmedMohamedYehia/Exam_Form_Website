import React from "react";
import { Form, Radio, Button } from "antd";
import { QUESTIONS } from "../data/questions";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

function Questions({ questions, updateAnswers }) {
  return questions.map((question) => (
    <div>
      <h3>Question {question.id}</h3>
      <Form.Item
        name={`question${question.id}`}
        label={question.question}
        className="quesiton"
      >
        <Radio.Group style={{ display: "flex", flexDirection: "column" }}>
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

function Exam({ onFinish, updateAnswers }) {
  return (
    <Form {...layout} onFinish={onFinish} autoComplete="off">
      <Questions questions={QUESTIONS} updateAnswers={updateAnswers} />
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit Exam
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Exam;
