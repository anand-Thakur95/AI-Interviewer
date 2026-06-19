import genToken from "../config/Token.js"
import User from "../model/user.model.js"


export const googleAuth = async (req, res) => {
    try {
        const { name, email } = req.body
        let user = await User.findOne({ email })

        if (!user) {
            user = await User.create({ name, email })
        }
       

        let token = await genToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,   
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000  
        })

        return res.status(200).json({ success: true, user })  

    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const logout = async (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Logout Successfully" });
  };