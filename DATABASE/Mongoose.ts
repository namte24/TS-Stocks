import mongoose from 'mongoose'

const { MongoClient, ServerApiVersion } = require('mongodb');

declare global {
    // this allows the mongoose cache to exist
    var mongooseCache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    }
}

// We are using this global cache so hotreload in devlopment does not create a new conncetion, it will take the same old conncetion from the cache
let cached = global.mongooseCache;

if(!cached) {
    cached = global.mongooseCache = {conn: null, promise: null}
}

export const connectToDatabase = async () =>{
    const MONGODB_URI = process.env.MONGODB_URI

    if(!MONGODB_URI) throw new Error('MONGODB_URI must be set within .env')

    if(cached.conn) return cached.conn

    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URI, {bufferCommands: false})
    }

    try{
        cached.conn = await cached.promise
    } catch (err) {
        cached.promise = null
        throw err
    }

    console.log(`Connect to database ${process.env.NODE_ENV} ${MONGODB_URI}`)

    //return cached.conn;
}

// This function will ensure that the app always conncets to MongoDB efficiently, becuase
// in development NextJS hot reload wil open new connection on every change and this function 
// stores the connection in global cache so it does not open any duplicates 
// If a connection already exists it returns it immediately and if not it creats a new one by 
// calling mongoose.conn and then saves it in the cache