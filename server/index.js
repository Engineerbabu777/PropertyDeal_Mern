import express from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import { databaseConnect } from './connectDb.js'

dotenv.config()

const app = express()

databaseConnect()

app.listen(3000, () => {
  console.log('Listening on Port: 3000!!!!')
})
