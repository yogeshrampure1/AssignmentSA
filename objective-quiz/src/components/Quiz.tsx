import React, { useState, useEffect } from "react";
import Question from "./Questions";
import { QUESTIONS } from "../questions";

const Quiz: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<(boolean | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [averageScore, setAverageScore] = useState<number>(0);

  useEffect(() => {
    const scores = JSON.parse(localStorage.getItem("scores") || "[]");
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
    const score = userAnswers.filter((answer, index) => answer === true).length;
    setScore(score);
    setIsSubmitted(true);

    const scores = JSON.parse(localStorage.getItem("scores") || "[]");
    scores.push(score);
    localStorage.setItem("scores", JSON.stringify(scores));

    const totalScore = scores.reduce(
      (acc: number, curr: number) => acc + curr,
      0
    );
    setAverageScore(totalScore / scores.length);
  };

  const handleRetry = () => {
    setUserAnswers(Array(QUESTIONS.length).fill(null));
    setIsSubmitted(false);
    setScore(0);
  };
  const calculatedScore = (100 * score) / QUESTIONS.length;
  return (
    <div>
      {QUESTIONS.map((q, index) => (
        <Question
          key={index}
          index={index}
          questionText={q.questionText}
          handleAnswerChange={handleAnswerChange}
          userAnswer={userAnswers[index]}
        />
      ))}
      <button onClick={handleSubmit}>Submit</button>
      {isSubmitted && (
        <div>
          <h3>Your score is: {calculatedScore}</h3>
          <h3> Average : {averageScore.toFixed(2)} </h3>
          <button onClick={handleRetry}>Retry</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
