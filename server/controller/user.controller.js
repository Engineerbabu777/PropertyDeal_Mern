import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js'

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
