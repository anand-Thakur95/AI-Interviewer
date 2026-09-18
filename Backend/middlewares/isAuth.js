import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies
        if (!token) {
            return res.status(401).json({ message: "Token is not found" })
        }
        let verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!verifyToken) {
            return res.status(401).json({ message: "Token is invalid" })
        }
        req.userId = verifyToken.userId
        next()

    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Invalid or expired token" })
        }
        return res.status(500).json({ message: `is auth error ${error.message || error}` })
    }
}

export default isAuth