export interface Question {
  id: string;
  question: string;
  answer: string;
  simplifiedExplanation: string;
  practicalExample: string;
  category: string;
  codeSnippet?: string;
}
