import axios from "axios"
import { serverUrl } from "../App"

export const getCurrentUser = async ()=>{
    try {
        const result = await axios.get(serverUrl + "/api/user/current",
            {withCredentials: true}
        )
        console.log(result.data)
    } catch (error) {
        console.error("ERROR:", error)
    }
}