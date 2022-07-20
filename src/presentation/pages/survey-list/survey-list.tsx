import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases'
import { Footer, Header } from '@/presentation/components'
import {
  SurveyListItems,
  SurveyContext,
  SurveyListError
} from '@/presentation/pages/survey-list/components'
import React, { useEffect, useState } from 'react'
import Styles from './survey-list-styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: ''
  })

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState({ ...state, surveys }))
      .catch((error) => setState({ ...state, error: error.message }))
  }, [])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? <SurveyListError /> : <SurveyListItems />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
