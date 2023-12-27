import express from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import { databaseConnect } from './connectDb.js'
import cookieParser from 'cookie-parser'

// FOR USING ENV VARAIBLES!
dotenv.config()

// SETTING APP!
const app = express()

app.use(express.json())
app.use(cookieParser())


// CONNECTING TO DATABASE!
databaseConnect()

// API ROUTES!
app.use('/api/auth', authRouter)

// RUNNING OUR SERVER!
app.listen(3000, () => {
  console.log('Listening on Port: 3000!!!!')
})


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});