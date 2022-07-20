import { SurveyModel } from '@/domain/models'
import React, { useContext } from 'react'
import { SurveyContext } from '..'
import SurveyItemEmpty from '../item-empty/item-empty'
import SurveyItem from '../item/item'
import Styles from './list-styles.scss'

const List: React.FC = () => {
  const { state } = useContext(SurveyContext)
  return (
    <ul data-testid="survey-list" className={Styles.listWrap}>
      {state.surveys.length
        ? (
            state.surveys.map((survey: SurveyModel) => (
          <SurveyItem key={survey.id} survey={survey} />
            ))
          )
        : <SurveyItemEmpty />}
    </ul>
  )
}

export default List
