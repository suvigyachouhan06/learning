const express=require("express")

const mongoose=require("mongoose")
const users= require("./MOCK_DATA.json");
const app=express();
const PORT = 8000;


mongoose?.connect('mongodb://localhost:27017/youtube-app-1')
.then(()=> console.log('MongoDB Connected'))
.catch(err => console.log("Mongo error",err))

const userSchema=new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String
    ,
    job_title:{
        type:String,
        required:true
    }
}

},{timestamps:true})
const User=mongoose.model("user",userSchema)
app.use(express.urlencoded({extended: false}))

app.use((req,res,next)=>{
    console.log("Hello from miidle ware 1 2");
    // return res.json("Hello from miidle ware 1");
    next();
})

app.get("/api/users", async (req,res)=>{
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
});

app.get("/users",async (req,res)=>{
    const allDbUsers = await User.find({});
    const html= `
    <ul>
    ${allDbUsers.map((user)=>`<li>${user.first_name} - ${user.email}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})
app.get("/api/users/:id", async (req,res)=>{
    
    const user= await User.findById(req.params.id);
    if (!user) return res.status(404).json({error: "user not found"})
    return res.json(user);
})

app.post("/api/users/", async(req,res)=>{
    const body =req.body;
    if(!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(200).json({msg:"All fields are required" })
    }
const result = await User.create({
    first_name:body.first_name,
    last_name:body.last_name,
    email:body.email,
    gender:body.gender,
    job_title:body.job_title
   });
   console.log("result",result)

   return res.status(201).json({msg:"success"}); 
})


app.listen(PORT,()=> console.log(`Server Start!! at port ${PORT}`));