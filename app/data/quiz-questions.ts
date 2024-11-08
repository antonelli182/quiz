export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const quizQuestions: Question[] = [
  {
    "id": 1,
    "question": "Which team won the rugby match between Scotland and Fiji on November 2, 2024?",
    "options": ["Scotland", "Fiji"],
    "correctAnswer": 0
    },
    {
    "id": 2,
    "question": "How many tries did Scotland score in their victory over Fiji?",
    "options": ["5", "7", "9", "11"],
    "correctAnswer": 2
    },
    {
    "id": 3,
    "question": "Who scored a hat-trick of tries for Scotland in the match against Fiji?",
    "options": ["Darcy Graham", "Adam Hastings", "Huw Jones", "Duhan Van der Merwe"],
    "correctAnswer": 0
    },
    {
    "id": 4,
    "question": "What was the final score of the match between Scotland and Fiji?",
    "options": ["57-17", "45-20", "50-15", "60-10"],
    "correctAnswer": 0
    },
    {
    "id": 5,
    "question": "Which player successfully converted multiple tries for Scotland?",
    "options": ["Kyle Rowe", "Adam Hastings", "Ali Price", "Rory Darge"],
    "correctAnswer": 1
    }
];