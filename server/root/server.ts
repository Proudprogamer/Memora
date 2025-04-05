import express, { Request, Response, NextFunction } from "express";
import { z } from "zod"
import { usermodel } from "./db"
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { contentModel } from "./db";
import { ObjectId } from "mongodb";
import cors from "cors";


const JWT_SECRET= "abcdefghijklmnopqrstuvwxyz1234567HDIAUENBAPPOEQUTVML"

const app = express();
app.use(express.json())

app.use(cors());

app.post('/', (req : Request,res : Response)=>{
    console.log("home page!");
})


const auth=async(req :Request,res : Response,next : NextFunction)=>{

    const username = req.body.username
    const password = req.body.password
    try {
        await usermodel.findOne({username:username}).then(doc=>{

            if(doc!=null)
            {
                if(password == doc.password)
                    next()
                else{
                    res.status(403).json({
                        message : "Wrong email or password"
                    })
                }
            }
        })
    }
    catch(Error)
    {
        res.status(500).json({
            message : "User not found!"
        })
    }
}

const check_auth = async(req :Request,res : Response,next : NextFunction)=>{

    const token = req.headers.token as string;
    try{
        const decoded = jwt.verify(token, JWT_SECRET) as {username : string};
        req.body.username = decoded.username;
        next()
    }
    catch(Error){
        res.status(411).json({
            message : "Invalid token"
        })
    }

}

app.post('/sign-up', async(req : Request,res : Response)=>{

    
    const data = JSON.stringify(req.body);

    let userdata = JSON.parse(data);


    console.log("received request : " + userdata.username + " " + userdata.password)

    const username = userdata.username;
    const password = userdata.password;

    const details = {
        username : username,
        password : password
    }

    const pass_schema = z.object({
        username : z.string(),
        password : z.string().min(8).max(20).regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[\W_]/, "Password must contain at least one special character")
    })

    const user = pass_schema.safeParse(details);

    if(user.success)
    {
    
        try {
            await usermodel.create({
                username : username,
                password : password 
            })

            res.status(200).json({
                message : "user created!"
            })
        }
        catch(Error){
            res.status(403).json({message : "User already exists!"});
        }

    }
    else{
        res.status(411).json({message : "Invalid format in inputs!"});
    }

})

app.post('/sign-in',auth, async(req : Request,res : Response)=>{

    const username = req.body.username;

    const token = jwt.sign({ username: username },JWT_SECRET);
    res.status(200).json({
        token: token
    })


})

app.post('/add-content', check_auth, async (req, res) => {
    console.log("Received request body:", req.body);
    console.log("Received token:", req.headers.token);

    const token = req.headers.token as string;

    let decoded;
    try {
        decoded = jwt.verify(token, JWT_SECRET) as { username: string };
        console.log("Decoded token:", decoded);
    } catch (err) {
        console.error("JWT verification failed:", err);
        res.status(411).json({ message: "user not verified!" });
        return;
    }

    if (decoded.username == req.body.username) {
        let userdata;
        try {
            userdata = await usermodel.findOne({ username: decoded.username });
            console.log("User data:", userdata);
        } catch (err) {
            console.error("Error finding user:", err);
            res.status(411).json({ message: "There was an error in finding the user!" });
            return;
        }

        if (userdata) {
            try {
                await contentModel.create({
                    username: userdata.username,
                    content: {
                        type: req.body.type,
                        link: req.body.link,
                        title: req.body.title,
                        sub_title: req.body.sub_title,
                        description: req.body.description,
                        tags: req.body.tags
                    }
                });
                console.log("Content added successfully!");
                res.status(200).json({ message: "Content added!" });
            } catch (err) {
                console.error("Error adding content:", err);
                res.status(411).json({
                    message: "There was an error in adding content"
                });
            }
        }
    } else {
        console.warn("Username in token does not match request body:", decoded.username, req.body.username);
        res.status(411).json({
            message: "user not verified!"
        });
    }
});


app.post('/fetch-docs',check_auth, async(req,res)=>{

    const token = req.headers.token as string;
    const decoded = jwt.verify(token, JWT_SECRET) as {username : string};
    if(decoded.username == req.body.username)
    {

        const user = await usermodel.findOne({username : decoded.username}).catch(()=>{
            res.status(411).json({message : "There was an error in finding the user!"});
        })
        if(user)
        {
            const userdata = await contentModel.find({username : user.username}).catch(()=>{
                res.status(411).json("There was an error in finding the user content!");
            })

            if(!userdata)
                res.status(411).json({message : "Content not found!"});
            else{
                res.status(200).json({message : "Content found", data : userdata})
            }
        }

    }
    else{
        res.status(411).json({
            message : "user not verified!"
        })
    }

})


app.delete('/delete-doc', check_auth, async (req, res) => {

    const token = req.headers.token as string;
    const decoded = jwt.verify(token, JWT_SECRET) as {username : string};
    if(decoded.username == req.body.username)
    {
        const id  : string= req.body._id;
        const ob = new ObjectId(id);

        await contentModel.deleteMany({
            _id :ob 
        })

        res.status(200).json({message : "document deleted!"})

    }
    else{
        res.status(411).json({
            message : "user not verified!"
        })
    }    
});


const main= async()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/brainly",{
    serverSelectionTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 45000, // 45 seconds
  }).then(()=>{
     console.log("database is connected!");}
  );

  

  }

app.listen(3000, ()=>{
main();
console.log("app listening on port 3000");
});



