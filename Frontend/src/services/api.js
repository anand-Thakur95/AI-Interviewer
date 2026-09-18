import axios from "axios"
import { serverUrl } from "../App"

export const getCurrentUser = async () => {
    try {
        const result = await axios.get(serverUrl + "/api/user/current", {
            withCredentials: true,
        })
        return result.data
    } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 400)) {
            return null
        }
        console.error("getCurrentUser error:", error)
        return null
    }
}