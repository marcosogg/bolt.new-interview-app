"use client"

import React, { useState, useEffect } from 'react';
import FileUpload from '../components/FileUpload';
import QuestionList from '../components/QuestionList';
import QuestionDetail from '../components/QuestionDetail';
import { Question } from '../types/question';

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  useEffect(() => {
    console.log('Questions state updated:', questions);
  }, [questions]);

  const handleUpload = (data: Question[]) => {
    console.log('Uploaded data:', data);
    setQuestions(data);
    setSelectedQuestion(null);
  };

  const handleSelectQuestion = (question: Question) => {
    console.log('Selected question:', question);
    setSelectedQuestion(question);
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">QA Application</h1>
      <div className="mb-8">
        <FileUpload onUpload={handleUpload} data={questions} />
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Questions</h2>
          <QuestionList questions={questions} onSelectQuestion={handleSelectQuestion} />
        </div>
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-semibold mb-4">Question Details</h2>
          {selectedQuestion ? (
            <QuestionDetail question={selectedQuestion} />
          ) : (
            <p>Select a question to view details.</p>
          )}
        </div>
      </div>
    </main>
  );
}
