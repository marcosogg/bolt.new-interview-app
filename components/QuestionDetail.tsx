"use client"

import React from 'react';
import { Question } from '@/types/question';

interface QuestionDetailProps {
  question: Question;
}

const QuestionDetail: React.FC<QuestionDetailProps> = ({ question }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">{question.question}</h2>
      <p className="mb-4"><strong>Answer:</strong> {question.answer}</p>
      <p className="mb-4"><strong>ELI12:</strong> {question.eli12}</p>
      <p className="mb-4"><strong>Practical Example:</strong> {question.practicalExample}</p>
      <div className="mb-4">
        <strong>Code Snippet:</strong>
        <pre className="bg-gray-100 p-2 rounded mt-2">{question.codeSnippet}</pre>
      </div>
    </div>
  );
};

export default QuestionDetail;