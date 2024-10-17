"use client"

import React from 'react';
import { Question } from "@/types/question";

interface QuestionDetailProps {
  question: Question;
}

const QuestionDetail: React.FC<QuestionDetailProps> = ({ question }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{question.question}</h2>
      <div>
        <h3 className="text-xl font-semibold mb-2">Answer:</h3>
        <p>{question.answer}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Simplified Explanation:</h3>
        <p>{question.simplifiedExplanation}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Practical Example:</h3>
        <p>{question.practicalExample}</p>
      </div>
      {question.codeSnippet && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Code Snippet:</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            <code>{question.codeSnippet}</code>
          </pre>
        </div>
      )}
      <div>
        <h3 className="text-xl font-semibold mb-2">Category:</h3>
        <p>{question.category}</p>
      </div>
    </div>
  );
};

export default QuestionDetail;
