

import mongoose from 'mongoose'

export const databaseConnect = async () => {
  if (mongoose.connections.readyState === 1) {
    return mongoose.connection.asPromise()
  } else {
    return mongoose
      .connect(process.env.MONGO_URI || "mongodb+srv://awaismumtaz0099:25213291231919@cluster0.3so1bcq.mongodb.net/realState")
      .then(() => console.log('Database Connected')).catch((err) => console.log(err))
  }
}
