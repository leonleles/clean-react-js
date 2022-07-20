import { PrivateRoute } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '../adapters/current-account-adapter'
import { MakeLogin, MakeSignUp, MakeSurveyList } from '@/main/factories/pages'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountAdapter, getCurrentAccount: getCurrentAccountAdapter }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<MakeLogin />} />
          <Route path="/signup" element={<MakeSignUp />} />
          <Route path='/' element={<PrivateRoute element={<MakeSurveyList />}/>} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
