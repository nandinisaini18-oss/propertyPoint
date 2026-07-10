import dotenv from "dotenv"
dotenv.config()

if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI is not defined in environment variables")
}

if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET is not defined in environment variables")
}

if(!process.env.IMAGEKIT_PRIVATE_KEY){
    throw new Error("IMAGEKIT_PRIVATE_KEY is not defined in environment variables")
}

if(!process.env.IMAGEKIT_PUBLIC_KEY){
    throw new Error("IMAGEKIT_PUBLIC_KEY is not defined in environment variables")
}

if(!process.env.IMAGEKIT_URL_ENDPOINT){
    throw new Error("IMAGEKIT_URL_ENDPOINT is not defined in environment variables")
}

if(!process.env.NODE_ENV){
    throw new Error("NODE_ENV is not defined in environment variables")
}

export const config = {
    MONGO_URI : process.env.MONGO_URI,
    JWT_SECRET : process.env.JWT_SECRET,
    IMAGEKIT_PRIVATE_KEY : process.env.IMAGEKIT_PRIVATE_KEY,
    IMAGEKIT_PUBLIC_KEY : process.env.IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_URL_ENDPOINT : process.env.IMAGEKIT_URL_ENDPOINT,
    NODE_ENV : process.env.NODE_ENV
}