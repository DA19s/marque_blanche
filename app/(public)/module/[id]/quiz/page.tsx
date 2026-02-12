"use client"

import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"

export default function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { data: session } = useSession()
  const router = useRouter()
  const resolvedParams = React.use(params)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  // Mock data - à remplacer par des données réelles
  const questions = [
    {
      id: "1",
      question: "Qu'est-ce que le développement durable ?",
      answers: [
        { id: "1", text: "Un développement qui répond aux besoins du présent sans compromettre l'avenir", isCorrect: true },
        { id: "2", text: "Un développement économique uniquement", isCorrect: false },
        { id: "3", text: "Un développement environnemental uniquement", isCorrect: false },
      ],
    },
    {
      id: "2",
      question: "Combien y a-t-il de piliers dans le développement durable ?",
      answers: [
        { id: "1", text: "2", isCorrect: false },
        { id: "2", text: "3", isCorrect: true },
        { id: "3", text: "4", isCorrect: false },
      ],
    },
  ]

  const handleAnswer = (questionId: string, answerId: string) => {
    setAnswers({ ...answers, [questionId]: answerId })
  }

  const handleSubmit = () => {
    let correct = 0
    questions.forEach((q) => {
      const selectedAnswer = q.answers.find((a) => a.id === answers[q.id])
      if (selectedAnswer?.isCorrect) {
        correct++
      }
    })
    const finalScore = Math.round((correct / questions.length) * 100)
    setScore(finalScore)
    setShowResults(true)
  }

  const passingScore = 70
  const passed = score >= passingScore

  useEffect(() => {
    if (!session) {
      router.push("/login")
    }
  }, [session, router])

  if (!session || !resolvedParams) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-6">
          <Link href={`/module/${resolvedParams.id}`}>
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au module
            </Button>
          </Link>
        </div>

        {!showResults ? (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle>Quiz d'Évaluation</CardTitle>
                <Badge>
                  Question {currentQuestion + 1} / {questions.length}
                </Badge>
              </div>
              <CardDescription>
                Testez vos connaissances
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentQuestion < questions.length ? (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                      {questions[currentQuestion].question}
                    </h2>
                    <div className="space-y-3">
                      {questions[currentQuestion].answers.map((answer) => (
                        <button
                          key={answer.id}
                          onClick={() => handleAnswer(questions[currentQuestion].id, answer.id)}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            answers[questions[currentQuestion].id] === answer.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {answer.text}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                      disabled={currentQuestion === 0}
                    >
                      Précédent
                    </Button>
                    {currentQuestion < questions.length - 1 ? (
                      <Button
                        onClick={() => setCurrentQuestion(currentQuestion + 1)}
                        disabled={!answers[questions[currentQuestion].id]}
                        style={{
                          background: `linear-gradient(to right, var(--tenant-primary), var(--tenant-secondary))`
                        }}
                      >
                        Suivant
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={!answers[questions[currentQuestion].id]}
                        style={{
                          background: `linear-gradient(to right, var(--tenant-primary), var(--tenant-secondary))`
                        }}
                      >
                        Terminer le quiz
                      </Button>
                    )}
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Résultats du Quiz</CardTitle>
              <CardDescription>
                Votre score: {score}%
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
                  passed ? "bg-green-100" : "bg-red-100"
                }`}>
                  {passed ? (
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                  ) : (
                    <XCircle className="h-12 w-12 text-red-600" />
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {passed ? "Félicitations !" : "Dommage !"}
                </h2>
                <p className="text-gray-600 mb-4">
                  Vous avez obtenu {score}% (Score de passage: {passingScore}%)
                </p>
                {passed && (
                  <Badge variant="success" className="text-lg px-4 py-2">
                    Quiz réussi !
                  </Badge>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <h3 className="font-semibold">Correction</h3>
                {questions.map((q) => {
                  const selectedAnswer = q.answers.find((a) => a.id === answers[q.id])
                  const isCorrect = selectedAnswer?.isCorrect || false
                  return (
                    <div key={q.id} className="p-4 border rounded-lg">
                      <p className="font-medium mb-2">{q.question}</p>
                      <div className="space-y-2">
                        {q.answers.map((answer) => {
                          const isSelected = answers[q.id] === answer.id
                          return (
                            <div
                              key={answer.id}
                              className={`p-2 rounded ${
                                answer.isCorrect
                                  ? "bg-green-50 border border-green-200"
                                  : isSelected && !answer.isCorrect
                                  ? "bg-red-50 border border-red-200"
                                  : "bg-gray-50"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {answer.isCorrect && (
                                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                                )}
                                {isSelected && !answer.isCorrect && (
                                  <XCircle className="h-4 w-4 text-red-600" />
                                )}
                                <span className={answer.isCorrect ? "font-medium" : ""}>
                                  {answer.text}
                                </span>
                                {answer.isCorrect && (
                                  <Badge variant="success" className="ml-auto">Correcte</Badge>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex gap-4">
                <Link href={`/module/${resolvedParams.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    Retour au module
                  </Button>
                </Link>
                {passed && (
                  <Link href="/dashboard" className="flex-1">
                    <Button
                      className="w-full text-white"
                      style={{
                        background: `linear-gradient(to right, var(--tenant-primary), var(--tenant-secondary))`
                      }}
                    >
                      Voir mes certificats
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
