import React, { useEffect, useState } from "react";
import Question from "./Questions";
import { QUESTIONS } from "../questions";

const Quiz: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<boolean[]>(
    Array(QUESTIONS.length).fill(false)
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [averageScore, setAverageScore] = useState<number>(0);
  const scores = JSON.parse(localStorage.getItem("scores") || "[]");

  useEffect(() => {
    if (scores.length > 0) {
      const totalScore = scores.reduce(
        (acc: number, curr: number) => acc + curr,
        0
      );
      setAverageScore(totalScore / scores.length);
    }
  }, []);

  const handleAnswerChange = (index: number, value: boolean) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const currentScore = userAnswers.filter(
      (answer, index) => answer === true
    ).length;
    setScore(currentScore);
    setIsSubmitted(true);
    localStorage.setItem("scores", JSON.stringify([...scores, currentScore]));
  };
  const handleRetry = () => {
    setUserAnswers(Array(QUESTIONS.length).fill(false));
  };
  const calculatedScore = (100 * score) / QUESTIONS.length;

  return (
    <div className="main">
      {QUESTIONS.map((q, index) => (
        <Question
          key={index}
          index={index}
          questionText={q.questionText}
          handleAnswerChange={handleAnswerChange}
        />
      ))}
      <div className="output-container">
        <button onClick={handleSubmit}>Submit</button>
        {isSubmitted && (
          <div>
            <h3>Your score is: {calculatedScore}</h3>

            <h3> Average : {averageScore}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
