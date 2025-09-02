import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";

export const signUp = async (req, res)=>{
    try{
        const {fullName, email, password, mobile, role} = req.body;

        const user = await User.findOne({email});
        
        if(user){
            return res.status(400).json({message : "User Already exist"})
        }

        if(password.length < 6){
            return res.status(400).json({message : "Password must be atleast 6 characters"})
        }

        if(mobile < 10){
            return res.status(400).json({message : "mobile no. must be atleast 10 digits"})
        }

        const hashPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            fullName,
            email,
            role,
            mobile,
            password:hashPassword
        })

        const token = await genToken(user._id);
        res.cookie("token", token, {
            secure:false,
            sameSite:"strict",
            maxAge:60*60*1000,
            httpOnly: true
        })

        return res.status(201).json({message:"user created successfully", user})

    }catch(error){
        return res.status(500).json({message:"sign up error", error})
        
    }
}


export const signIn = async (req, res)=>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        
        if(!user){
            return res.status(400).json({message : "User does not exist"})
        }

        const passMatch = await bcrypt.compare(password,user.password);

        if(!passMatch){
            return res.status(400).json({message : "Incorrect Password"});
        };

        const token = await genToken(user._id);
        res.cookie("token", token, {
            secure:false,
            sameSite:"strict",
            maxAge:60*60*1000,
            httpOnly: true
        })

        return res.status(200).json({message:"user sign in successfully", user})

    }catch(error){
        return res.status(500).json({message:"sign in error", error})
        
    }
}

export const signOut = async (req, res)=>{
    try {
        res.clearCookie("token");

        return res.status(200).json({message : "Log out Successfully"})
    } catch (error) {
        return res.status(500).json({message : "Signout error"}, error)
    }
}