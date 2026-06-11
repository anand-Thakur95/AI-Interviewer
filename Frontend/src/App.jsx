import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Home.jsx"
import Auth from "./Pages/Auth.jsx"
import { useDispatch } from "react-redux"
import axios from "axios"
import { setUserData } from "./redux/user.slice.js"

export const serverUrl = "http://localhost:3000"

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
  const getUser = async () => {
   try {
      const result = await axios.get(serverUrl + "/api/user/current",
        {withCredentials: true}
      )
      dispatch(setUserData(result.data.user ?? result.data))
      } catch (error) {
      console.error("ERROR:", error)
    }
  }
  getUser()
  }, [ dispatch ]);
  
  return (
 <Routes>
<Route path= '/' element = {<Home/>}/>
<Route path= '/auth' element = {<Auth/>}/>

 </Routes>
  )
}

export default App
