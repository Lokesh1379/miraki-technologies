import React from 'react'
import LoginComponent from './component/LoginFolder';
import { BrowserRouter } from "react-router-dom"
import TaskManager from './component/TaskFolder';
export const App = () => {
  return <>
    <BrowserRouter>
      <LoginComponent />
    </BrowserRouter>
  </>
}

export default App;