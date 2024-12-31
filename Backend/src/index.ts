import express, { Request, Response } from 'express';
import { number, string, z } from 'zod';

import { UserModel , ContentModel} from './Database/schema';

import bcrypt from 'bcrypt'
const saltRounds = 5;


import jwt  from "jsonwebtoken";
import {JWT_SECRET,mongo} from '../config'
import mongoose from 'mongoose';


const app = express()
app.use(express.json())

const reqBody = z.object({
    email:z.string().email(),
    firstName:z.string().max(100).min(1),
    lastName:z.string().max(100).min(1),
    password:z.string().max(30).min(8,{message:"Password must atleast have 8 letters or numbers"})
 })
 
type SignupRequest = z.infer<typeof reqBody>;

app.post('/signup', async function (req:Request,res:Response):Promise<any> {


    const safeParseData = reqBody.safeParse(req.body)

    if(!safeParseData.success){
       return res.status(400).json({
           message: "Invalid input format",
           errors: safeParseData.error.errors
       });
    }

    try {

       const {email,firstName,lastName,password}:SignupRequest = safeParseData.data;

       const hash = await bcrypt.hash(password,saltRounds);

       await UserModel.create({
           firstName,
           lastName,
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


app.post("./api/v1/signin",async function (req:Request,res:Response):Promise<any>{

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

app.post('/api/v1/content',(req,res)=>{

})

app.get('/api/v1/content',(req,res)=>{

})

app.delete('/api/v1/content',(req,res)=>{

})

app.post('/api/v1/brain/share',(req,res)=>{

})

app.get('/api/v1/brain/:shareLink',(req,res)=>{

})


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








