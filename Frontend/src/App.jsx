import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Home.jsx"
import Auth from "./Pages/Auth.jsx"
import { getCurrentUser } from "./services/api"

export const serverUrl = "http://localhost:3000"

function App() {
  useEffect(() => {
    getCurrentUser()
  }, [])
  
  return (
 <Routes>
<Route path= '/' element = {<Home/>}/>
<Route path= '/auth' element = {<Auth/>}/>

 </Routes>
  )
}

export default App
