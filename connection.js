const mongoose=require("mongoose")

async function connectMongodb(url) {
mongoose?.connect(url)
.then(()=> console.log('MongoDB Connected'))
.catch(err => console.log("Mongo error",err))
    
}

module.exports={
    connectMongodb
}