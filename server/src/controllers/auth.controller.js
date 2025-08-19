import User from "../models/user.model.js"
import { generateToken } from "../utils/token.js"
import bcrypt from 'bcryptjs'
import { logger } from "../utils/logger.js"

/**
 * User signup
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const signUp = async (req, res) => {
    try {
        const { fullName, email, address, gender, userName, password } = req.body
        
        // Validate required fields
        if (!fullName || !email || !address || !gender || !userName || !password) {
            logger.warn('Missing required fields for signup')
            return res.status(400).json({ 
                success: false,
                msg: "All fields are required" 
            })
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            logger.warn(`Invalid email format: ${email}`)
            return res.status(400).json({ 
                success: false,
                msg: "Invalid email format" 
            })
        }
        
        // Check if user already exists
        const existUser = await User.findOne({
            $or: [{ userName: userName }, { email: email }]
        })
        
        if (existUser) {
            logger.warn(`User already exists: ${userName} or ${email}`)
            return res.status(409).json({ 
                success: false,
                msg: "User already exists with this username or email" 
            })
        }
        
        // Validate password strength (at least 6 characters)
        if (password.length < 6) {
            logger.warn('Password too short')
            return res.status(400).json({ 
                success: false,
                msg: "Password must be at least 6 characters long" 
            })
        }
        
        // Create new user
        const newUser = await User.create({
            fullName,
            email,
            address,
            gender,
            userName,
            password // Will be hashed by pre-save middleware in the model
        })
        
        logger.info(`New user created: ${newUser._id}`)
        res.status(201).json({
            success: true,
            msg: "User created successfully",
            data: {
                id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                email: newUser.email
            }
        })
    } catch (error) {
        logger.error('Error during signup:', error)
        res.status(500).json({ 
            success: false,
            error: "Internal server error during signup"
        })
    }
}

/**
 * User login
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const login = async (req, res) => {
    try {
        const { userName, email, password } = req.body
        
        // Validate input
        if ((!userName && !email) || !password) {
            logger.warn('Username/email or password missing for login')
            return res.status(400).json({ 
                success: false,
                msg: 'Username/email and password are required' 
            })
        }
        
        // Find user by username or email
        const existUser = await User.findOne({
            $or: [{ userName: userName }, { email: email }]
        })
        
        if (!existUser) {
            logger.warn(`User not found: ${userName || email}`)
            return res.status(404).json({ 
                success: false,
                msg: "User not found" 
            })
        }
        
        // Check password
        const isPasswordMatch = await bcrypt.compare(password, existUser.password)
        if (!isPasswordMatch) {
            logger.warn(`Invalid credentials for user: ${userName || email}`)
            return res.status(401).json({ 
                success: false,
                msg: "Invalid credentials" 
            })
        }
        
        // Generate token
        const token = generateToken(existUser._id, existUser.userType)
        
        logger.info(`User logged in successfully: ${existUser._id}`)
        res.status(200).json({
            success: true,
            msg: "User logged in successfully",
            data: {
                token,
                user: {
                    id: existUser._id,
                    userName: existUser.userName,
                    email: existUser.email,
                    userType: existUser.userType
                }
            }
        })
    } catch (error) {
        logger.error('Error during login:', error)
        res.status(500).json({ 
            success: false,
            error: "Internal server error during login"
        })
    }
}