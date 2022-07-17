import { SurveyModel } from '../models'
import faker from 'faker'

export const mockSurveyListModel = (): SurveyModel[] => ([
  {
    id: faker.random.uuid(),
    question: faker.random.words(10),
    answers: [
      {
        answer: faker.random.words(4),
        image: faker.internet.url()
      },
      {
        answer: faker.random.words(7)
      }
    ],
    didAnswer: faker.random.boolean(),
    data: faker.date.recent()
  }
])