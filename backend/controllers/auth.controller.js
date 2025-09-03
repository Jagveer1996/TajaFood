import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";

export const signUp = async (req, res) => {
    try {
        const { fullName, email, password, mobile, role } = req.body;

        if (!fullName || !email || !password || !mobile || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        if (mobile.toString().length < 10) {
            return res.status(400).json({ message: "Mobile number must be at least 10 digits" });
        }

        const normalizedEmail = email.trim().toLowerCase();
        let user = await User.findOne({ email: normalizedEmail });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            fullName,
            email: normalizedEmail,
            role,
            mobile,
            password: hashPassword
        });

        const token = await genToken(user._id);

        res.cookie("token", token, {
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000, // 1 hour
            httpOnly: true
        });

        return res.status(201).json({ message: "User created successfully", user });

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "An unexpected error occurred during sign up." });
    }
};



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