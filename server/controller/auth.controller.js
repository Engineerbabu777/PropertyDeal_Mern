import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
  // DESTRUCTURE USERNAME, EMAIL, AND PASSWORD FROM THE REQUEST BODY
  const { username, email, password } = req.body

  // HASH THE USER'S PASSWORD USING BCRYPT
  const hashedPassword = bcryptjs.hashSync(password, 10)

  //CREATE A NEW USER INSTANCE WITH THE PROVIDED USERNAME, EMAIL, AND HASHED PASSWORD
  const newUser = new User({ username, email, password: hashedPassword })

  try {
    //SAVE THE NEW USER TO THE DATABASE
    const user = await newUser.save()

    console.log(user)

    // IF SUCCESSFUL, SEND A 201 CREATED STATUS AND A JSON RESPONSE
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
    const token = jwt.sign({ id: validUser._id }, 'hvdsgvyuwtwdyutbvas')

    // EXTRACT THE PASSWORD FIELD FROM THE USER DOCUMENT (EXCLUDING IT) AND SEND THE REMAINING DATA IN THE RESPONSE
    const { password: pass, ...rest } = validUser._doc

    // SET THE 'ACCESS_TOKEN' COOKIE WITH THE JWT, MAKING IT ACCESSIBLE ONLY VIA HTTP
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({ ...rest, token })
  } catch (error) {
    // IF AN ERROR OCCURS DURING THE PROCESS, PASS THE ERROR TO THE ERROR-HANDLING MIDDLEWARE
    next(error)
  }
}

// GOOGLE SIGN-IN HANDLER
export const google = async (req, res, next) => {
  try {
    // CHECK IF A USER WITH THE PROVIDED EMAIL ALREADY EXISTS
    const user = await User.findOne({ email: req.body.email })

    // IF USER EXISTS, GENERATE A JWT TOKEN FOR THE USER AND SEND USER DATA IN RESPONSE
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      const { password: pass, ...rest } = user._doc
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest)
    } else {
      // IF USER DOES NOT EXIST, GENERATE A RANDOM PASSWORD AND CREATE A NEW USER
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8)
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
      const newUser = new User({
        // CREATE A UNIQUE USERNAME BASED ON NAME AND RANDOM STRING
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo
      })

      // SAVE THE NEW USER TO THE DATABASE
      await newUser.save()

      // GENERATE A JWT TOKEN FOR THE NEW USER AND SEND USER DATA IN RESPONSE
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
      const { password: pass, ...rest } = newUser._doc
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest)
    }
  } catch (error) {
    // IF AN ERROR OCCURS DURING THE PROCESS, PASS THE ERROR TO THE ERROR-HANDLING MIDDLEWARE
    next(error)
  }
}

// SIGN OUT HANDLER
export const signOut = async (req, res, next) => {
  try {
    // CLEAR THE 'ACCESS_TOKEN' COOKIE TO LOG OUT THE USER
    res.clearCookie('token_turk')
    res.status(200).json('User has been logged out!')
  } catch (error) {
    // IF AN ERROR OCCURS DURING THE PROCESS, PASS THE ERROR TO THE ERROR-HANDLING MIDDLEWARE
    next(error)
  }
}
