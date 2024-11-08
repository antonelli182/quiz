"use client";

import { useState } from "react";
import { Question, quizQuestions } from "../data/quiz-questions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(quizQuestions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(curr => curr + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(curr => curr - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(quizQuestions.length).fill(-1));
    setShowResults(false);
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / quizQuestions.length) * 100;

    return (
      <Card className="w-full max-w-2xl mx-auto p-8">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
          <p className="text-xl mb-4">
            Your score: {score} out of {quizQuestions.length} ({percentage.toFixed(1)}%)
          </p>
          
          <div className="space-y-4 mt-8">
            {quizQuestions.map((q, index) => (
              <div key={q.id} className="text-left p-4 rounded-lg bg-secondary">
                <p className="font-medium mb-2">
                  {index + 1}. {q.question}
                </p>
                <p className="text-sm">
                  Your answer: 
                  <span className={selectedAnswers[index] === q.correctAnswer ? 
                    "text-green-600 font-medium ml-2" : 
                    "text-red-600 font-medium ml-2"}>
                    {q.options[selectedAnswers[index]]}
                  </span>
                </p>
                {selectedAnswers[index] !== q.correctAnswer && (
                  <p className="text-sm text-green-600">
                    Correct answer: {q.options[q.correctAnswer]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <Button 
            onClick={resetQuiz}
            className="mt-8"
            variant="outline"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </Card>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <Card className="w-full max-w-2xl mx-auto p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </h2>
          <span className="text-sm text-muted-foreground">
            {selectedAnswers.filter(a => a !== -1).length} answered
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-medium mb-6">{question.question}</h3>
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswers[currentQuestion] === index ? "default" : "outline"}
              className={cn(
                "w-full justify-start text-left h-auto p-4",
                selectedAnswers[currentQuestion] === index && "bg-primary text-primary-foreground"
              )}
              onClick={() => handleAnswerSelect(index)}
            >
              <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
              {option}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          variant="outline"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={selectedAnswers[currentQuestion] === -1}
        >
          {currentQuestion === quizQuestions.length - 1 ? (
            "Finish Quiz"
          ) : (
            <>
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}