import { RouterProvider } from 'react-router-dom'
import { useEffect } from "react";
import routes  from './app.routes'
import { useAuth } from '../features/auth/hook/useAuth';
import "./App.css"

function App() {
  const {handleGetMe} = useAuth()

  useEffect(() => {
    handleGetMe()
  }, [])

  return (
      <RouterProvider router={routes} />
      
  )
}

export default App
