"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Calendar, Trophy, Target, BookOpen, ExternalLink } from "lucide-react"
import { questions } from "./data/questions"
import StudyGuides, { getStudyResourcesForCategory } from "../components/study-guides"

interface GameStats {
  streak: number
  totalCorrect: number
  totalAnswered: number
  lastPlayedDate: string
  deviceId: string
}

export default function DATPrep() {
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [gameStats, setGameStats] = useState<GameStats>({
    streak: 0,
    totalCorrect: 0,
    totalAnswered: 0,
    lastPlayedDate: "",
    deviceId: "",
  })
  const [hasPlayedToday, setHasPlayedToday] = useState(false)
  const [showStudyGuides, setShowStudyGuides] = useState(false)

  // Generate a unique device ID
  const generateDeviceId = () => {
    return "device_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now().toString(36)
  }

  // Get current date in EST timezone
  const getCurrentDateEST = () => {
    const now = new Date()
    const utc = now.getTime() + now.getTimezoneOffset() * 60000
    const est = new Date(utc + -5 * 3600000) // EST is UTC-5
    return est.toDateString()
  }

  // Get today's question based on EST date
  const getTodaysQuestion = () => {
    const estDate = new Date()
    const utc = estDate.getTime() + estDate.getTimezoneOffset() * 60000
    const est = new Date(utc + -5 * 3600000) // EST is UTC-5

    // Calculate days since epoch in EST
    const epochStart = new Date("1970-01-01T00:00:00-05:00") // EST epoch
    const daysSinceEpoch = Math.floor((est.getTime() - epochStart.getTime()) / (1000 * 60 * 60 * 24))

    return questions[daysSinceEpoch % questions.length]
  }

  // Load game stats from localStorage with device-specific storage
  useEffect(() => {
    let deviceId = localStorage.getItem("datPrepDeviceId")
    if (!deviceId) {
      deviceId = generateDeviceId()
      localStorage.setItem("datPrepDeviceId", deviceId)
    }

    const savedStats = localStorage.getItem(`datPrepStats_${deviceId}`)
    if (savedStats) {
      const stats = JSON.parse(savedStats)
      setGameStats({ ...stats, deviceId })

      const todayEST = getCurrentDateEST()
      setHasPlayedToday(stats.lastPlayedDate === todayEST)
    } else {
      // Initialize new stats for this device
      setGameStats((prev) => ({ ...prev, deviceId }))
    }

    setCurrentQuestion(getTodaysQuestion())

    // Set up interval to check for midnight EST and refresh question
    const checkMidnight = setInterval(() => {
      const now = new Date()
      const utc = now.getTime() + now.getTimezoneOffset() * 60000
      const est = new Date(utc + -5 * 3600000)

      // Check if it's midnight EST (within 1 minute window)
      if (est.getHours() === 0 && est.getMinutes() === 0) {
        setCurrentQuestion(getTodaysQuestion())
        setSelectedAnswer(null)
        setShowResult(false)
        setHasPlayedToday(false)
      }
    }, 60000) // Check every minute

    return () => clearInterval(checkMidnight)
  }, [])

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return
    setSelectedAnswer(answer)
  }

  const handleSubmit = () => {
    if (!selectedAnswer || !currentQuestion) return

    const correct = selectedAnswer === currentQuestion.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)

    // Update stats
    const todayEST = getCurrentDateEST()
    const newStats = {
      ...gameStats,
      totalAnswered: gameStats.totalAnswered + 1,
      totalCorrect: gameStats.totalCorrect + (correct ? 1 : 0),
      streak: correct ? gameStats.streak + 1 : 0,
      lastPlayedDate: todayEST,
    }

    setGameStats(newStats)
    setHasPlayedToday(true)
    localStorage.setItem(`datPrepStats_${gameStats.deviceId}`, JSON.stringify(newStats))
  }

  const accuracy =
    gameStats.totalAnswered > 0 ? Math.round((gameStats.totalCorrect / gameStats.totalAnswered) * 100) : 0

  // Get study resources for the current question's category
  const studyResources = currentQuestion ? getStudyResourcesForCategory(currentQuestion.category) : []

  // Get next question time (midnight EST)
  const getNextQuestionTime = () => {
    const now = new Date()
    const utc = now.getTime() + now.getTimezoneOffset() * 60000
    const est = new Date(utc + -5 * 3600000)

    // Set to next midnight EST
    const nextMidnight = new Date(est)
    nextMidnight.setHours(24, 0, 0, 0)

    return nextMidnight.toLocaleString("en-US", {
      timeZone: "America/New_York",
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    })
  }

  if (!currentQuestion) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">5 MIN DAT PREP</h1>
          <p className="text-gray-600">Daily practice questions to ace your DAT</p>
          <p className="text-sm text-gray-500 mt-2">Questions refresh daily at midnight EST</p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <Button variant={!showStudyGuides ? "default" : "outline"} onClick={() => setShowStudyGuides(false)}>
            Daily Question
          </Button>
          <Button variant={showStudyGuides ? "default" : "outline"} onClick={() => setShowStudyGuides(true)}>
            Study Guides
          </Button>
        </div>

        {!showStudyGuides ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="text-2xl font-bold">{gameStats.streak}</span>
                  </div>
                  <p className="text-sm text-gray-600">Day Streak</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Target className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-2xl font-bold">{accuracy}%</span>
                  </div>
                  <p className="text-sm text-gray-600">Accuracy</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-2xl font-bold">{gameStats.totalCorrect}</span>
                  </div>
                  <p className="text-sm text-gray-600">Correct</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Calendar className="h-5 w-5 text-purple-500 mr-2" />
                    <span className="text-2xl font-bold">{gameStats.totalAnswered}</span>
                  </div>
                  <p className="text-sm text-gray-600">Total Answered</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Question Card */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="mb-2">
                    {currentQuestion.category}
                  </Badge>
                  <Badge variant={hasPlayedToday ? "default" : "secondary"}>
                    {hasPlayedToday ? "Completed Today" : "Today's Question"}
                  </Badge>
                </div>
                <CardTitle className="text-xl">Question of the Day</CardTitle>
                <CardDescription>
                  {new Date().toLocaleDateString("en-US", {
                    timeZone: "America/New_York",
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  (EST)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>

                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => {
                      const optionLetter = String.fromCharCode(65 + index) // A, B, C, D
                      const isSelected = selectedAnswer === optionLetter
                      const isCorrectAnswer = currentQuestion.correctAnswer === optionLetter

                      let buttonVariant = "outline"
                      let buttonClass = ""

                      if (showResult) {
                        if (isCorrectAnswer) {
                          buttonVariant = "default"
                          buttonClass = "bg-green-500 hover:bg-green-600 text-white border-green-500"
                        } else if (isSelected && !isCorrectAnswer) {
                          buttonVariant = "destructive"
                        }
                      } else if (isSelected) {
                        buttonVariant = "default"
                      }

                      return (
                        <Button
                          key={index}
                          variant={buttonVariant}
                          className={`w-full justify-start text-left h-auto p-4 ${buttonClass}`}
                          onClick={() => handleAnswerSelect(optionLetter)}
                          disabled={showResult}
                        >
                          <span className="font-semibold mr-3">{optionLetter}.</span>
                          <span>{option}</span>
                          {showResult && isCorrectAnswer && <CheckCircle className="h-5 w-5 ml-auto" />}
                          {showResult && isSelected && !isCorrectAnswer && <XCircle className="h-5 w-5 ml-auto" />}
                        </Button>
                      )
                    })}
                  </div>
                </div>

                {!showResult && selectedAnswer && (
                  <Button onClick={handleSubmit} className="w-full" size="lg">
                    Submit Answer
                  </Button>
                )}

                {showResult && (
                  <div className="mt-6 p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center mb-3">
                      {isCorrect ? (
                        <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-500 mr-2" />
                      )}
                      <span className="font-semibold text-lg">{isCorrect ? "Correct!" : "Incorrect"}</span>
                    </div>

                    <div className="mb-4">
                      <p className="font-medium mb-2">Explanation:</p>
                      <p className="text-gray-700">{currentQuestion.explanation}</p>
                    </div>

                    {/* Study Resources for Wrong Answers */}
                    {!isCorrect && studyResources.length > 0 && (
                      <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center mb-3">
                          <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                          <h4 className="font-semibold text-blue-900">Need help with {currentQuestion.category}?</h4>
                        </div>
                        <p className="text-blue-700 text-sm mb-3">Check out these resources to master this topic:</p>
                        <div className="space-y-2">
                          {studyResources.map((resource, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="w-full justify-start bg-white hover:bg-blue-50 border-blue-200"
                              onClick={() => window.open(resource.url, "_blank")}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              {resource.title}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Come back tomorrow for a new question!</p>
                      <p className="text-xs text-gray-500">Next question available: {getNextQuestionTime()}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <StudyGuides />
        )}

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>New question available daily at midnight EST • Good luck on your DAT!</p>
        </div>
      </div>
    </div>
  )
}
