export type SurveyModel = {
  id: string
  question: string
  answers: [
    {
      image?: string
      answer: string
    }
  ]
  data: Date
  didAnswer: boolean
}
