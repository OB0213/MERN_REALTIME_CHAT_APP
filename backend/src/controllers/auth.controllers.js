import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
export const signup=async(req,res)=>{
    try{
        if(!req.body.fullName || !req.body.email || !req.body.password)
        {
            return res.status(400).json({message:"Please Fill All the Data"});
        }
       if(req.body.password.length<6)
       {
        return res.status(400).json({message:"Password must be atleast of 6 characters"});
       }

       const user=await User.findOne({email:req.body.email});
       if(user)
       {
        return res.status(400).json({message:"Email Already Exists"});
       
       }

        const salt = await bcrypt.genSalt(10);//salt for hashing password
        const hashedPassword = await bcrypt.hash(req.body.password, salt);//Used for hashing password

        const newUser=new User({
            fullName:req.body.fullName,
            email:req.body.email,
            password:hashedPassword
        });

        if(newUser)
        {
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic
            })
        }
        else
        {
            res.status(400).json({message:"Invalid User Data"});
        }


        

    }catch(err)
    {
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }

}

export const login = async(req, res) => {
    const {email,password}=req.body;
try{
    const user=await User.findOne({email:email});

    if(!user)
    {
        return res.status(400).json({message:"Invalid Email or password"})
    }

    const isPasswordCorrect=await bcrypt.compare(password,user.password);

    if(!isPasswordCorrect)
    {
        res.status(400).json({message:"Invalid Password or email"});
    }

     generateToken(user._id, res);
     res.status(200).json({
       _id: user._id,
       fullName: user.fullName,
       email: user.email,
       profilePic: user.profilePic,
     });

}
catch(err)
{
    console.log(err);
    res.status(500).json({message:"Internal Server Error"});
}
};

export const logout = (req, res) => {
try{

    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"User Logged out successfully"});

}
catch(err)
{
    
    console.log(err);
}
};

export const updateProfile=async(req,res)=>{
try{
  const {profilePic}=req.body;
  const userId=req.user._id;

  if(!profilePic)
  {
    res.status(400).json({message:"Profile Pic is required"});
  }

 const uploaderResponse= await cloudinary.uploader.upload(profilePic);
 const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:uploaderResponse.secure_url},{new:true});

 res.status(200).json(updatedUser)

}
catch(err)
{
  console.log(err);
  res.status(500).json({message:"Internal Server Error"});
}
}

export const checkAuth=(req,res)=>{
    try
    {
        res.status(200).json(req.user);
    }
    catch(err)
    {
        console.log(err);
    }
}