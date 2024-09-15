const connection=require("./connection")
const data=require("./schema")
const reg=require("./regSchema")
const express=require("express");
const path=require("path")
const cors=require("cors")
const multer=require("multer")
const favion=require("serve-favicon")
const app=express()
app.use(cors())

app.use(express.json())
app.use(express.static("public"))
app.use(favion(path.join(__dirname,"favicon.ico")))

//multer config  http://localhost:4000/uploads/download.jpg

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{  
        cb(null,"public/uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload=multer({storage:storage}).single("pimage")

app.post("/",(req,resp)=>{
    upload(req,resp,(err)=>{
        if(err){
            resp.send(err)
        }
        else{
            const data1=new data({
                pid:req.body.pid,
                pname:req.body.pname,
                pprice:req.body.pprice,
                pdesc:req.body.pdesc,
                pcat:req.body.pcat,
                pimage:"http://localhost:4000/uploads/"+req.file.filename
            })
            data1.save();
            resp.send("Data Save SUccefully")
        }
    })
})

app.get("/",async(req,resp)=>{
    const data2= await data.find()
    resp.send(data2)
})

// app.get("/:key",async(req,resp)=>{
//     const data2= await data.find({pid:req.params.key})
//     resp.send(data2)
// })

// app.get("/search/:cat",async(req,resp)=>{
//     const data2= await data.find({pcat:req.params.cat})
//     resp.send(data2)
// })

app.post('/register',async(req,resp)=>{
    upload(req,resp,(err)=>{
        if(err){
            resp.send(err)
        }
        else{
            const data2=new reg({
                uname:req.body.uname,
                upass:req.body.upass,
                uemail:req.body.uemail,
                umob:req.body.umob,
               
            })
            data2.save();
            resp.send(" SUccefully reg")
        }
    })
})

app.get('/login',async (req,resp)=>{
    const appdata= await reg.findOne({uemail:req.body.uemail,upass:req.body.upass})
    // resp.send(appdata)
    if( appdata !="undefined" ){
        resp.send(true)
    }
    else{
        resp.send(false)
    }
})
app.listen(4000)