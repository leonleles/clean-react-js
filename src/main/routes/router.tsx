import { ApiContext } from '@/presentation/contexts'
import { SurveyList } from '@/presentation/pages'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { setCurrentAccountAdapter } from '../adapters/current-account-adapter'
import { MakeLogin } from '../factories/pages/login/login-factory'
import { MakeSignUp } from '../factories/pages/signup/signup-factory'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountAdapter }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<MakeLogin />} />
          <Route path="/signup" element={<MakeSignUp />} />
          <Route path="/" element={<SurveyList />} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
