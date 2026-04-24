import type { Request, Response } from 'express';
import User from '../models/user';
import { loginSchema, singupSchema } from '../validation/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { admin, firebaseInitialized } from '../config/firebase';

// signup
export const signup = async (req: Request, res: Response) => {
  try {
    const result = singupSchema.safeParse(req.body);
    if(!result.success) return res.status(400).json({ success: false, message: "Invalid data", errors: result.error.issues });

    const { name, email, password } = result.data;
    const user = new User({name, email, password});
    await user.save();
    
    if(!user) return res.status(400).json({success: false, message: 'User not created'})
    
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET as string, { expiresIn: '7d' })

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    .status(200).json({ success: true, message: 'user created successfully', user});
  } catch (error:any) {
    return res.status(500).json({success: false, message: 'something went wrong', error: error.message})
  }
}

// login
export const login = async (req: Request, res: Response) => {
  try {
    const result = loginSchema.safeParse(req.body);
    if(!result.success) return res.status(400).json({ success: false, message: "Invalid data", errors: result.error.issues });
    
    const { email, password } = result.data;
    const user = await User.findOne({ email })
    if(!user) return res.status(400).json({success: false, message: 'User not exist'})
    
    if (!user.password) return res.status(400).json({ 
      success: false, 
      message: 'This email is registered with Google. Please use Google login.' 
    })

    // ✅ FIX — string mein convert karo pehle, phir compare karo
    const userPassword: string = user.password
    const isMatch = await bcrypt.compare(password, userPassword)
    if(!isMatch) return res.status(400).json({success: false, message: 'User password is incorrect'})
  
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET as string, { expiresIn: '7d' })

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    .status(200).json({ success: true, message: 'user logged in successfully', user});

  } catch (error:any) {
    return res.status(500).json({success: false, message: 'something went wrong', error: error.message})
  }
}

// google login
export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { idToken, email, name, profilePhoto } = req.body;
    
    if (!idToken || !email) {
      return res.status(400).json({ success: false, message: "Missing required fields (idToken, email)" });
    }

    if (firebaseInitialized) {
      try {
        await admin.auth().verifyIdToken(idToken);
      } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid Firebase token" });
      }
    } else {
      console.warn('Firebase not initialized - skipping token verification. Only use in development!');
    }
    
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name: name || email,
        email,
        password: null,
        profilePhoto: profilePhoto || undefined,
        lastLogin: new Date()
      });
      await user.save();
    } else {
      if (profilePhoto && !user.profilePhoto) {
        user.profilePhoto = profilePhoto;
      }
      user.lastLogin = new Date();
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    .status(200).json({ 
      success: true, 
      message: 'Google login successful', 
      user: { 
        _id: user._id, 
        name: user.name, 
        email: user.email, 
        profilePhoto: user.profilePhoto 
      }
    });

  } catch (error: any) {
    console.error('Google login error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Google login failed', 
      error: error.message 
    });
  }
}

// logout
export const logout = (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
  }).json({ success: true, message: 'Logged out successfully'});
};

// isAuth
export const isAuthme = async (req: Request, res: Response) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ success: false, message: 'token is missing', loggedIn: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    if (!decoded) return res.status(401).json({ success: false, message: 'token is invalid', loggedIn: false });
  
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ success: false, message: 'user not found', loggedIn: false });

    res.status(200).json({ 
      success: true, 
      message: 'token is valid', 
      loggedIn: true, 
      user: { 
        _id: user._id, 
        name: user.name, 
        email: user.email, 
        profilePhoto: user.profilePhoto 
      }
    });
  } catch {
    res.status(401).json({ success: false, message: 'token is invalid', loggedIn: false });
  }
};