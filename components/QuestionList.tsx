import React from 'react';
import { Question } from '@/types/question';

interface QuestionListProps {
  questions: Question[];
  onSelectQuestion: (question: Question) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, onSelectQuestion }) => {
  return (
    <ul className="space-y-2">
      {questions.map((question, index) => (
        <li
          key={index}
          className="cursor-pointer hover:bg-gray-100 p-2 rounded"
          onClick={() => onSelectQuestion(question)}
        >
          {question.question}
        </li>
      ))}
    </ul>
  );
};

export default QuestionList;