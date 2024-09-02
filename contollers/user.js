const User=require('../models/user')
const express=require("express");

async function handleGetAllUsers(req,res){
    const allDbUsers=await User.find({});
    return res.json(allDbUsers);
}

async function getUserById(req,res){
    const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "user not found" });
        return res.json(user);
}
async function patchUserById(req,res){
    await User.findByIdAndUpdate(req.params.id, { last_name: "Changed" });
    return res.json({ status: "Success" });
}

async function deleteUserById(req,res){
        await User.deleteOne({ _id: req.params.id });
        return res.json({ status: "Success" });
    }

    async function handleCreateNewUser(req,res){
        const body=req.body;

        if (!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
            return res.status(400).json({ msg: "All fields are required" });

        }
        const result = await User.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            gender: body.gender,
            job_title: body.job_title
        });
        console.log("result", result);
        return res.status(201).json({ msg: "success" });
        
        
    }
module.exports={
    handleGetAllUsers,
    getUserById,
    patchUserById,
    deleteUserById,
    handleCreateNewUser
    
};