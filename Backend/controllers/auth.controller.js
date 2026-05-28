import genToken from "../config/Token"
import User from "../model/user.model"


export const googleAuth = async (req, res) => {
try {
    const {name, email} = req.body
    let user = await User.findOne({email})
    if(!user){
        user = new User.create({
            name,
            email
        })
    }
    let token = await genToken(user._id)
    res.cookie("token", token, {
       http:true,
       secure:false,
       sameSite: "strict",
       maxAge:7 * 24 * 60 * 1000

    })

    return res.status(200)

} catch (error) {
    return res.status(500).json({message: `Google auth error ${error}`})
}

}

export const logout = async (req, res) => {

    try {
        await res.clearCookies("token")
        return res.status(200).json({message: "Logout Successfully"})
    } catch (error) {
        return res.status(500).json({message: `Logout error ${error}`})
    }
}