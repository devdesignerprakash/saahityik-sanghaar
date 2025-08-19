import User from "../models/user.model.js"
import { logger } from "../utils/logger.js"

/**
 * Get all users
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find()
        
        if (allUsers.length === 0) {
            logger.info('No users found in database')
            return res.status(404).json({ 
                success: false,
                msg: "No users found" 
            })
        }
        
        logger.info(`Retrieved ${allUsers.length} users`)
        res.status(200).json({
            success: true,
            data: allUsers
        })
    } catch (error) {
        logger.error('Error fetching all users:', error)
        res.status(500).json({ 
            success: false,
            error: "Internal server error while fetching users"
        })
    }
}

/**
 * Get current user
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const getUser = async (req, res) => {
    try {
        const { id } = req.user
        
        if (!id) {
            logger.warn('User ID not found in request')
            return res.status(400).json({ 
                success: false,
                msg: "User ID is required" 
            })
        }
        
        const user = await User.findById(id)
        
        if (!user) {
            logger.warn(`User not found with ID: ${id}`)
            return res.status(404).json({ 
                success: false,
                msg: "User not found" 
            })
        }
        
        // Remove sensitive information
        const { password, ...userDetails } = user._doc
        
        logger.info(`User retrieved successfully: ${id}`)
        res.status(200).json({
            success: true,
            data: userDetails
        })
    } catch (error) {
        logger.error('Error fetching user:', error)
        res.status(500).json({ 
            success: false,
            error: "Internal server error while fetching user"
        })
    }
}

/**
 * Delete user
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const deleteUser = async (req, res) => {
    try {
        const { userType } = req.user
        const { id } = req.params
        
        // Check if user is admin
        if (userType !== 'admin') {
            logger.warn(`Unauthorized delete attempt by user type: ${userType}`)
            return res.status(403).json({ 
                success: false,
                msg: "Unauthorized action - admin access required" 
            })
        }
        
        // Validate user ID
        if (!id) {
            logger.warn('User ID not provided for deletion')
            return res.status(400).json({ 
                success: false,
                msg: "User ID is required" 
            })
        }
        
        const deletedUser = await User.findByIdAndDelete(id)
        
        if (!deletedUser) {
            logger.warn(`User not found for deletion: ${id}`)
            return res.status(404).json({ 
                success: false,
                msg: "User not found for deletion" 
            })
        }
        
        logger.info(`User deleted successfully: ${id}`)
        res.status(200).json({ 
            success: true,
            msg: "User deleted successfully",
            data: deletedUser
        })
    } catch (error) {
        logger.error('Error deleting user:', error)
        res.status(500).json({ 
            success: false,
            error: "Internal server error while deleting user"
        })
    }
}