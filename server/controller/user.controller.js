import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js'
import Listing from '../models/listing.model.js'

// UPDATE USER ROUTE HANDLER
export const updateUser = async (req, res, next) => {
  // CHECK IF THE REQUESTING USER IS UPDATING THEIR OWN ACCOUNT
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account!'))

  try {
    // HASH THE PASSWORD IF INCLUDED IN THE REQUEST BODY
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }

    // UPDATE USER DOCUMENT IN THE DATABASE
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar
        }
      },
      { new: true }
    )

    // EXCLUDE PASSWORD FROM THE RESPONSE OBJECT
    const { password, ...rest } = updatedUser._doc

    // SEND SUCCESSFUL RESPONSE WITH UPDATED USER DETAILS
    res.status(200).json(rest)
  } catch (error) {
    // HANDLE ERRORS
    next(error)
  }
}

// DELETE USER ROUTE HANDLER
export const deleteUser = async (req, res, next) => {
  // CHECK IF THE REQUESTING USER IS DELETING THEIR OWN ACCOUNT
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only delete your own account!'))

  try {
    // DELETE USER DOCUMENT FROM THE DATABASE
    await User.findByIdAndDelete(req.params.id)

    // CLEAR ACCESS TOKEN COOKIE AND SEND SUCCESSFUL RESPONSE
    res.clearCookie('access_token')
    res.status(200).json('User has been deleted!')
  } catch (error) {
    // HANDLE ERRORS
    next(error)
  }
}



// GET LISTINGS BELONGING TO A SPECIFIC USER
export const getUserListings = async (req, res, next) => {
    // Check if the requesting user is the same as the requested user
    if (req.user.id === req.params.id) {
      try {
        // Attempt to find listings associated with the specified user ID
        const listings = await Listing.find({ userRef: req.params.id });
        // Respond with the found listings
        res.status(200).json(listings);
      } catch (error) {
        // Handle errors by passing them to the next middleware
        next(error);
      }
    } else {
      // Respond with a 401 Unauthorized error if the requesting user is not the same as the requested user
      return next(errorHandler(401, 'You can only view your own listings!'));
    }
  };
  
  // GET USER INFORMATION BY ID
  export const getUser = async (req, res, next) => {
    try {
      // Attempt to find the user by ID
      const user = await User.findById(req.params.id);
    
      // Check if the user exists
      if (!user) return next(errorHandler(404, 'User not found!'));
    
      // Exclude the password field from the user data
      const { password: pass, ...rest } = user._doc;
    
      // Respond with the user information (excluding password)
      res.status(200).json(rest);
    } catch (error) {
      // Handle errors by passing them to the next middleware
      next(error);
    }
  };