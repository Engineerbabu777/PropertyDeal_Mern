import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
  // DESTRUCTURE USERNAME, EMAIL, AND PASSWORD FROM THE REQUEST BODY
  const { username, email, password } = req.body

  // HASH THE USER'S PASSWORD USING BCRYPT WITH A SALT FACTOR OF 10
  const hashedPassword = bcryptjs.hashSync(password, 10)

  // CREATE A NEW USER INSTANCE WITH THE PROVIDED USERNAME, EMAIL, AND HASHED PASSWORD
  const newUser = new User({ username, email, password: hashedPassword })

  try {
    // ATTEMPT TO SAVE THE NEW USER TO THE DATABASE
    const user = await newUser.save()

    console.log(user)

    // IF SUCCESSFUL, SEND A 201 CREATED STATUS AND A JSON RESPONSE INDICATING SUCCESS
    res.status(201).json('User created successfully!')
  } catch (error) {
    // IF AN ERROR OCCURS DURING THE PROCESS, PASS THE ERROR TO THE ERROR-HANDLING MIDDLEWARE
    next(error)
  }
}

// SIGN-IN FUNCTIONALITY
export const signin = async (req, res, next) => {
  // DESTRUCTURE EMAIL AND PASSWORD FROM THE REQUEST BODY
  const { email, password } = req.body

  try {
    // FIND A USER IN THE DATABASE WITH THE PROVIDED EMAIL
    const validUser = await User.findOne({ email })

    // IF NO USER IS FOUND, INVOKE THE ERROR-HANDLING MIDDLEWARE WITH A 404 STATUS AND MESSAGE
    if (!validUser) return next(errorHandler(404, 'User not found!'))

    // COMPARE THE PROVIDED PASSWORD WITH THE HASHED PASSWORD STORED IN THE DATABASE
    const validPassword = bcryptjs.compareSync(password, validUser.password)

    // IF THE PASSWORD IS NOT VALID, INVOKE THE ERROR-HANDLING MIDDLEWARE WITH A 401 STATUS AND MESSAGE
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'))

    // GENERATE A JSON WEB TOKEN (JWT) USING THE USER'S ID AND THE SECRET KEY
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)

    // EXTRACT THE PASSWORD FIELD FROM THE USER DOCUMENT (EXCLUDING IT) AND SEND THE REMAINING DATA IN THE RESPONSE
    const { password: pass, ...rest } = validUser._doc

    // SET THE 'ACCESS_TOKEN' COOKIE WITH THE JWT, MAKING IT ACCESSIBLE ONLY VIA HTTP
    res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
  } catch (error) {
    // IF AN ERROR OCCURS DURING THE PROCESS, PASS THE ERROR TO THE ERROR-HANDLING MIDDLEWARE
    next(error)
  }
}
