"use client"

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import QuestionList from '@/components/QuestionList';
import QuestionDetail from '@/components/QuestionDetail';
import FileUpload from '@/components/FileUpload';
import { Question } from '@/types/question';

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleFileUpload = (data: Question[]) => {
    setQuestions(data);
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "questions_export.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const filteredQuestions = questions.filter(q => 
    (selectedCategory === 'All' || q.category === selectedCategory) &&
    (q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
     q.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const categories = ['All', ...new Set(questions.map(q => q.category))];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Q&A Application</h1>
      <div className="mb-4">
        <FileUpload onUpload={handleFileUpload} />
        <Button onClick={handleExport} className="ml-2">Export Questions</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-2"
            />
            <Tabs defaultValue="All" className="w-full">
              <TabsList className="grid grid-cols-3 mb-2">
                {categories.slice(0, 3).map(category => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              {categories.length > 3 && (
                <select
                  className="w-full p-2 border rounded"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              )}
            </Tabs>
            <QuestionList
              questions={filteredQuestions}
              onSelectQuestion={setSelectedQuestion}
            />
          </CardContent>
        </Card>
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Question Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedQuestion ? (
              <QuestionDetail question={selectedQuestion} />
            ) : (
              <p>Select a question to view details</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}