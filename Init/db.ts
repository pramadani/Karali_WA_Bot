import mongoose, { Mongoose } from "mongoose";

export async function setDB(MONGODB_URL: string): Promise<Mongoose> {
    const db: Mongoose = await mongoose.connect(MONGODB_URL);
    return db;
}
