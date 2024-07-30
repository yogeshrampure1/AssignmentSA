import React, { useState } from "react";
import Question from "./Questions";
import { QUESTIONS } from "../questions";

const Quiz: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<boolean[]>(
    Array(QUESTIONS.length).fill(false)
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const handleAnswerChange = (index: number, value: boolean) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const score = userAnswers.filter((answer, index) => answer === true).length;
    setScore(score);
    setIsSubmitted(true);
  };
  const handleRetry = () => {
    setUserAnswers(Array(QUESTIONS.length).fill(false));
  };

  return (
    <div>
      {QUESTIONS.map((q, index) => (
        <Question
          key={index}
          index={index}
          questionText={q.questionText}
          handleAnswerChange={handleAnswerChange}
        />
      ))}
      <button onClick={handleSubmit}>Submit</button>
      {isSubmitted && (
        <div>
          Your score is: {score} / {QUESTIONS.length}
        </div>
      )}
    </div>
  );
};

export default Quiz;
