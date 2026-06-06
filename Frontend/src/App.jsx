import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Auth from "./Pages/Auth"
import { getCurrentUser }  from "./service/api"

export const serverURL = "http://localhost:3000"


function App() {
 useEffect(()=>{
getCurrentUser()

 })
  return (
 <Routes>
<Route path= '/' element = {<Home/>}/>
<Route path= '/auth' element = {<Auth/>}/>

 </Routes>
  )
}

export default App
