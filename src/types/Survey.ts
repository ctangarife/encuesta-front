export interface Question {
  id: string;
  question: string;
  questionType: {
    name: QuestionType; // Utilizamos el `name` del tipo de pregunta aquí
  };
  isActive: boolean;
  isRequired: boolean;
  order: number;
  options?: string[];
}

export interface Survey {
  id: string;
  name: string;
  description: string;
  questions: Question[];
}

export enum QuestionType {
  Closed = "closed", // Boolean
  MultipleChoice = "multiple_choice", // Checkbox
  Text = "text", // Textfield
  ExtendedText = "extended_text", // TextArea
  NumericRange = "numeric_range", // Range
}
