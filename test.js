const express=require("express")
const {logReqRes}=require("./middleware/index")
const {connectMongodb}= require('./connection')
const userRouter=require('./routes/user')
const app=express();
const PORT = 8000;

connectMongodb('mongodb://127.0.0.1:27017/youtube-app-1');



app.use(express.urlencoded({extended: false}))


app.use(logReqRes("log.txt"));

app.use("/user",userRouter)


app.listen(PORT,()=> console.log(`Server Start!! at port ${PORT}`));