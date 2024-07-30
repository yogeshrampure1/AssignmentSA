import React from "react";

interface QuestionProps {
  index: number;
  questionText: string;
  handleAnswerChange: (index: number, value: boolean) => void;
  userAnswer: boolean | null;
}

const Question: React.FC<QuestionProps> = ({
  index,
  questionText,
  handleAnswerChange,
  userAnswer,
}) => {
  return (
    <div className="question-container">
      <p>
        {index + 1}. {questionText}
      </p>
      <label>
        <input
          type="radio"
          name={`question-${index}`}
          checked={userAnswer === true}
          onChange={() => handleAnswerChange(index, true)}
        />
        Yes
      </label>
      <label>
        <input
          type="radio"
          name={`question-${index}`}
          checked={userAnswer === false}
          onChange={() => handleAnswerChange(index, false)}
        />
        No
      </label>
    </div>
  );
};

export default Question;
