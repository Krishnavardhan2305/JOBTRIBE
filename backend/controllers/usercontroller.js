import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookie from "cookie-parser"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
dotenv.config({ path: './config.env'});
export const register = async (req, res) => {
    try {
        const { Name, email, phoneNumber, password, role } = req.body;
        // console.log(Name, email, phoneNumber, password, role);
        
        if (!Name || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Please fill in all required fields.",
                success: false
            });
        }
        const file=req.file;
        const fileUri=getDataUri(file);
        const cloudResponse=await cloudinary.uploader.upload(fileUri.content);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "A user with this email already exists.",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            Name,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while creating the account.",
            success: false
        });
    }
}
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;


        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All Fields are Not properly filled",
                success: false
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect Email or Password",
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect Email or Password",
                success: false
            });
        }

        // Check role
        if (role !== user.role) {
            return res.status(400).json({
                message: "Incorrect role field",
                success: false
            });
        }

        const tokenData = {
            userId: user._id
        };

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        const userData = {
            _id: user._id,
            name: user.Name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'None'
            })
            .json({
                message: `Welcome back ${user.Name}`, 
                success: true,
                user: userData
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred",
            success: false
        });
    }
};
export const logout=async(req,res)=>
{
    try 
    {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged Out Succesfully",
            success:true
        })    
    } catch (error) {
        console.log(error);
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { Name, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        // cloudinary
        const fileUri=getDataUri(file);
        const cloudResponse=await cloudinary.uploader.upload(fileUri.content);



        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }

        const userId = req.id; 
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User Not found",
                success: false
            });
        }

        if (Name) user.Name = Name;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;
        
        // Additional code for handling resume (if needed)
        if(cloudResponse)
        {
            user.profile.resume=cloudResponse.secure_url
            // saves the cloudinary url
            user.profile.resumeOriginalName=file.originalname
            // saves the original file name
        }
        await user.save();

        user = {
            _id: user._id,
            name: user.Name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile Updated successfully",
            user,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while updating the profile.",
            success: false
        });
    }
}
