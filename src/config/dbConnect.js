import mongoose from "mongoose";

mongoose.connect("mongodb+srv://alura:alura123@alura.r4glodr.mongodb.net/alura-node")

let db = mongoose.connection;

export default db;