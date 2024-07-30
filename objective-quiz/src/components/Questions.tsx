import React from "react";

interface QuestionProps {
  index: number;
  questionText: string;
  handleAnswerChange: (index: number, value: boolean) => void;
}

const Question: React.FC<QuestionProps> = ({
  index,
  questionText,
  handleAnswerChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleAnswerChange(index, event.target.value === "yes");
  };

  return (
    <div>
      <p>{questionText}</p>
      <label>
        <input
          type="radio"
          name={`question-${index}`}
          value="yes"
          onChange={handleChange}
        />
        Yes
      </label>
      <label>
        <input
          type="radio"
          name={`question-${index}`}
          value="no"
          onChange={handleChange}
        />
        No
      </label>
    </div>
  );
};

export default Question;
