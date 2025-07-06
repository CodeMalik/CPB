import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Cannot connect to the URI in .env")
}


let cached = global.mongoose || { conn: null, promise: null}


export const connectDB = async () => {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "custom-pack-boxes",
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then((m) => {
      console.log("Successfully connected to the database")
      return m
    }).catch((error) => {
      console.error("Failed to connect to database", error)
    })
  }

  cached.conn = await cached.promise

  global.mongoose = cached.conn
  return cached.conn
}



