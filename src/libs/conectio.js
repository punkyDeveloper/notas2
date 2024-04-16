import mongoose from "mongoose";

const { MONGO_URI } = process.env

if (!MONGO_URI){
  throw new Error(" no se encontro uri")
}

export const connectDB = async () => {
  try {
    const{ connection } = await mongoose.connect(MONGO_URI)
    if (connection.readyState === 1) {
      console.log("Mongo en linea")
      return Promise.resolve(true)
    }
  } catch (error) {
    console.log(error)
    return Promise.reject(false)
  }
}