import express, { Request, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import { UserModel, ContentModel, LinkModel } from './Database/schema';
import { JWT_SECRET, mongo } from './config';
import authMiddleware from './auth';
import cors from 'cors'
const app = express();
const saltRounds = 5;

app.use(cors())

app.use(express.json());

// Validation Schema
const reqBody = z.object({
  email: z.string().email(),
  username: z.string().min(1).max(100),
  name: z.string().min(1).max(100),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }).max(30),
});

type SignupRequest = z.infer<typeof reqBody>;

interface IGetUserAuthInfoRequest extends Request {
  userId?: string;
}

interface ContentInfo {
  title: string;
  link: string;
  tags: string[];
}

type fun = Promise<any>

// Signup Route
app.post('/api/v1/signup', async (req: Request, res: Response): fun => {
  const validation = reqBody.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      message: "Invalid input format",
      errors: validation.error.errors,
    });
  }

  const { email, username, name ,password }: SignupRequest = validation.data;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await UserModel.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "Signup successful" });
  } catch (error: any) {
    return res.status(409).json({ message: "User already exists", error: error.message });
  }
});

// Signin Route
app.post('/api/v1/signin', async (req: Request, res: Response): fun => {
  const { email, password }: Pick<SignupRequest, 'email' | 'password'> = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Please sign up" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(403).json({ message: "Incorrect credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ token, message: "Signin successful" });

  } catch (error: any) {
    return res.status(500).json({ message: "An error occurred", error: error.message });
  }
});



// acess to the shared link
app.get('/api/v1/brain/:shareLink',async (req: Request, res: Response): fun => {
    try {
      const hash = req.params.shareLink;

      // Find the link by hash and populate the associated user
      const link = await LinkModel.findOne({ hash }).populate('userId','username');
      
      if (!link) {
        return res.status(401).json({ message: 'Invalid or expired link' });
      }

      // Find the content associated with the user
      const content = await ContentModel.findOne({ userId: link.userId });

      if (!content) {
        return res.status(404).json({ message: 'No content found for the provided link' });
      }

      //username finding
      let user= link.userId["username"];

      // Return the username and content
      res.json({user, content });

    } catch (error) {
      console.error('Error fetching shared content:', error);
      res.status(500).json({ message: 'An error occurred while processing the request' });
    }
  }
);




// Authentication Middleware
app.use(authMiddleware);

// Create Content
app.post('/api/v1/content', async (req: IGetUserAuthInfoRequest, res: Response): fun => {
  const { title, link, tags }: ContentInfo = req.body;

  if (!title || !link || !tags) {
    return res.status(400).json({ message: "Missing required fields: title, link, or tag." });
  }

  if (!req.userId) {
    return res.status(401).json({ message: "User not authenticated." });
  }

  try {

    await ContentModel.create({ title, link, tags , userId: req.userId });

    return res.status(201).json({ message: "Content created successfully." });
    
  } catch (error: any) {
    return res.status(500).json({ message: "An internal error occurred", error: error.message });
  }
});

// Fetch User's Contents
app.get('/api/v1/contents', async (req: IGetUserAuthInfoRequest, res: Response): fun => {
  if (!req.userId) {
    return res.status(401).json({ message: "User not authenticated." });
  }

  try {
    const contents = await ContentModel.find({ userId: req.userId }).populate('userId', 'username');
    return res.status(200).json({ contents });
  } catch (error: any) {
    return res.status(500).json({ message: "An internal error occurred", error: error.message });
  }
});

// Delete Content
app.delete('/api/v1/content', async (req: IGetUserAuthInfoRequest, res: Response): fun => {
  const { contentId } = req.body;

  if (!contentId) {
    return res.status(400).json({ message: "Content ID is required." });
  }

  if (!req.userId) {
    return res.status(401).json({ message: "User not authenticated." });
  }

  try {
    const result = await ContentModel.deleteOne({ _id: contentId, userId: req.userId });
    if (!result.deletedCount) {
      return res.status(404).json({ message: "Content not found or unauthorized." });
    }

    return res.status(200).json({ message: "Content deleted successfully." });
  } catch (error: any) {
    return res.status(500).json({ message: "An internal error occurred", error: error.message });
  }
});

//get single content
app.get('/api/v1/contents/content',async (req: IGetUserAuthInfoRequest, res: Response):fun => {
    const { contentId } = req.body;
    const userId = req.userId;

    if (!contentId) {
        return res.status(400).json({ message: "Content ID is required." });
    }

    if (!userId) {
        return res.status(401).json({ message: "User not authenticated." });
    }
    try {
        const content = await ContentModel.findOne({ _id: contentId, userId });
        
        res.status(200).json({ message: "Content loaded successfully.",content });
    } catch (error) {
        res.status(500).json({ message: "An internal server error occurred." });
    }
})

function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
  ).join('');
}

app.post('/api/v1/brain/share',async (req: IGetUserAuthInfoRequest, res: Response):fun => {
    try {
        const share: boolean = req.body.share;
        
        if (share) {
          
          const exist = await LinkModel.findOne({userId: req.userId})

          if(exist){
            const hash = exist.hash
            return res.json({ message: 'Shareable link ', hash });
          }

          const hash: string = generateRandomString(10);
          // Create a new shareable link
          await LinkModel.create({
            hash,
            userId: req.userId,
          });
          return res.json({ message: 'Shareable link created', hash });

        } else {

          await LinkModel.deleteMany({
            userId: req.userId,
          });
          return res.json({ message: 'Shareable links removed' });

        }
    } catch (error) {
      console.error('Error updating shareable link:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  }
);



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








