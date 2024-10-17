import React, { useState, useMemo } from 'react';
import { Question } from "../types/question";
import { Input } from "./ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";

interface QuestionListProps {
  questions: Question[];
  onSelectQuestion: (question: Question) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, onSelectQuestion }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    const categorySet = new Set(questions.map(q => q.category));
    console.log('Categories:', Array.from(categorySet)); // Log categories
    return Array.from(categorySet);
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    return questions.filter(question => 
      (selectedCategory === 'all' || question.category === selectedCategory) &&
      (question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
       question.answer.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [questions, searchTerm, selectedCategory]);

  console.log('Rendered QuestionList', { questionsCount: questions.length, categoriesCount: categories.length });

  if (questions.length === 0) {
    return <div>No questions available. Please upload a file.</div>;
  }

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Search questions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ul className="space-y-2">
        {filteredQuestions.map((question) => (
          <li
            key={question.id}
            className="cursor-pointer hover:bg-gray-100 p-2 rounded"
            onClick={() => onSelectQuestion(question)}
          >
            {question.question}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
