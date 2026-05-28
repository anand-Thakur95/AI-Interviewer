import jwt from "jsonwebtoken"
import { ReturnDocument } from "mongodb"

const genToken = async (userId) => {
    try {
        const token = jwt.sign({userId}, process.env.JWT_SECRET,  {expiresIn:"7d"})
        return token
    } catch (error) {
        console.log(error)
    }
}

export default genToken