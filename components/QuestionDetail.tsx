"use client"

import React from 'react';
import { Question } from '../types/question';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Code, Lightbulb, FileText } from 'lucide-react';

interface QuestionDetailProps {
  question: Question;
}

const QuestionDetail: React.FC<QuestionDetailProps> = ({ question }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <BookOpen className="h-5 w-5" />
          <CardTitle>Answer</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{question.answer}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          <CardTitle>Simplified Explanation</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{question.simplifiedExplanation}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <FileText className="h-5 w-5" />
          <CardTitle>Practical Example</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{question.practicalExample}</p>
        </CardContent>
      </Card>

      {question.codeSnippet && (
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Code className="h-5 w-5" />
            <CardTitle>Code Snippet</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
              <code>
                {question.codeSnippet.split('\n').map((line, index, array) => (
                  <React.Fragment key={index}>
                    <span className="text-green-400">$</span> {line}
                    {index < array.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </code>
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuestionDetail;
