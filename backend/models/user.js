import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        requred:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['student','Recruiter'],
        required:true
    },
    profile:
    {
        bio:{type:String},
        skills:[{type:String,}],
        resume:{type:String},
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'},
        profilePhoto:{type:String,default:""}
    },
},{timestamps:true});
const User=mongoose.model('User',userSchema);
export default User;