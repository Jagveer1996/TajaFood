import jwt from "jsonwebtoken"

const genToken = async (userId)=>{
    try {
        const token = await jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn : "1hrs"});
        return token;
    } catch (error) {
        console.log("gentoken_error",error);
        
    }
};

export default genToken;