"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface QuizProps {
  questions: {
    question: string
    options: string[]
    correctAnswer: string
  }[]
}

export default function Quiz({ questions }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswer = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer("")
    } else {
      setShowResult(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer("")
    setShowResult(false)
    setScore(0)
  }

  if (showResult) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        <p className="text-lg mb-4">
          You scored {score} out of {questions.length}
        </p>
        <Button onClick={resetQuiz}>Retry Quiz</Button>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h2>
      <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
        {questions[currentQuestion].options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value={option} id={`option-${index}`} />
            <Label htmlFor={`option-${index}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
      <Button onClick={handleAnswer} disabled={!selectedAnswer} className="mt-4">
        {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
      </Button>
    </div>
  )
}

