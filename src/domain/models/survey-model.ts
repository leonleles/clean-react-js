export type SurveyModel = {
  id: string
  question: string
  answers: SurveyAnswerModel[]
  data: Date
  didAnswer: boolean
}

export type SurveyAnswerModel = {
  image?: string
  answer: string
}
