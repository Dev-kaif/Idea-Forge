import express, { Request, Response } from 'express';
import { any, number, string, z } from 'zod';

import { UserModel, ContentModel } from './Database/schema';

import bcrypt from 'bcrypt'
const saltRounds = 5;


import jwt  from "jsonwebtoken";
import {JWT_SECRET,mongo} from '../config'
import mongoose from 'mongoose';

import auth from './auth';
type fun = Promise<any>

const app = express()
app.use(express.json())

const reqBody = z.object({
    email:z.string().email(),
    username:z.string().max(100).min(1),
    firstName:z.string().max(100).min(1),
    lastName:z.string().max(100).min(1),
    password:z.string().max(30).min(8,{message:"Password must atleast have 8 letters or numbers"})
 })
 
type SignupRequest = z.infer<typeof reqBody>;

app.post('/signup', async function (req:Request,res:Response):fun {


    const safeParseData = reqBody.safeParse(req.body)

    if(!safeParseData.success){
       return res.status(400).json({
           message: "Invalid input format",
           errors: safeParseData.error.errors
       });
    }

    try {

       const {email,username,firstName,lastName,password}:SignupRequest = safeParseData.data;

       const hash = await bcrypt.hash(password,saltRounds);

       await UserModel.create({
           firstName,
           lastName,
           username,
           email,
           password:hash
       })

       return res.status(201).json({message:"SignUp Sucessfull"})
       
    } catch (error: any) {
        return res.status(409).json({
            message: "User already exists",
        });
    }
})


app.post("./api/v1/signin",async function (req:Request,res:Response):fun{

    type ReqSign = Pick<SignupRequest, 'email' | 'password'>;

    const { email, password }: ReqSign = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.json({ message: "Please Sign up" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, JWT_SECRET);
            res.json({ token, message: "You have successfully signed in" });
            
        } else {
             res.status(403).json({ message: "Incorrect credentials" });
        }
    } catch (error:any) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
})

app.use(auth)


interface IGetUserAuthInfoRequest extends Request {
    userId?: string; // Optional; validate if required
}

interface ContentInfo {
    title: string;
    link: string;
    tag: string;
}


app.post('/api/v1/content', async (req: IGetUserAuthInfoRequest, res: Response):fun => {
    try {
        const { title, link, tag }: ContentInfo = req.body;

        // Validate required fields
        if (!title || !link || !tag) {
            return res.status(400).json({ message: "Missing required fields: title, link, or tag." });
        }

        // Validate userId
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated." });
        }

        // Create content
        await ContentModel.create({
            title,
            link,
            tag,
            userId,
        });

        res.status(201).json({ message: "Content saved successfully." });
    } catch (error) {
        console.error('Error saving content:', error);
        res.status(500).json({ message: "An internal server error occurred." });
    }
});


app.get('/api/v1/contents', async (req: IGetUserAuthInfoRequest, res: Response):fun => {
    try {
        // Validate user authentication
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated." });
        }

        // Fetch content for the user
        const content = await ContentModel.find({ userId }).populate("userId","username")

        // Return the content
        res.status(200).json({ content });
    } catch (error) {
        console.error('Error fetching content:', error);
        res.status(500).json({ message: "An internal server error occurred." });
    }
});


app.delete('/api/v1/content', async (req: IGetUserAuthInfoRequest, res: Response):fun => {
    try {
        const { contentId } = req.body;
        const userId = req.userId;

        if (!contentId) {
            return res.status(400).json({ message: "Content ID is required." });
        }

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated." });
        }

        const result = await ContentModel.deleteOne({ _id: contentId, userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Content not found or not authorized to delete." });
        }
        res.status(200).json({ message: "Content deleted successfully." });

    } catch (error) {
        res.status(500).json({ message: "An internal server error occurred." });
    }
});

app.get('/api/v1/contents/content',async (req: IGetUserAuthInfoRequest, res: Response):fun => {
    try {
        const { contentId } = req.body;
        const userId = req.userId;

        if (!contentId) {
            return res.status(400).json({ message: "Content ID is required." });
        }

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated." });
        }

        const content = await ContentModel.findOne({ _id: contentId, userId });
        
        res.status(200).json({ message: "Content loaded successfully.",content });
    } catch (error) {
        res.status(500).json({ message: "An internal server error occurred." });
    }
})

// app.post('/api/v1/brain/share',(req,res)=>{
    
// })

// app.get('/api/v1/brain/:shareLink',(req,res)=>{

// })


async function main():Promise<void> {
    try {
        await mongoose.connect(mongo)
        console.log("connected to the database");
        
        app.listen(3000);

    } catch (error) {
        console.error("Failed to connect to the database:");
        process.exit(1);
    }
}

main();








