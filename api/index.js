import express from 'express';  // step 1
import dotenv from 'dotenv';   // step 4
import mongoose from 'mongoose'; //step 5
import authRoute from './routes/auth.js' //step 7
import usersRoute from './routes/users.js' //step 7
import hotelsRoute from './routes/hotels.js' //step 7
import roomsRoute from './routes/rooms.js' //step 7


const app = express(); //step 2

dotenv.config(); //reachhing the mongodb in the env //step 4

//connecting to the mongodb using mongoose library  - step 5
const connect = async () => {
    try {
        await mongoose.connect(process.env.MongoDB);
        console.log('Connected to MongoDB');
    } catch (error) {
        throw error;
    }
}

//step 6
// if it disconnects it would try to reconnect
mongoose.connection.on("disconnected", () => {
    console.log('mongodb disconnected');
})


//step 8
//middleware
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

//step 3
app.listen("5000", () => {
    connect();  //whenever we connect to the backend server we call the connect func
    console.log("Connected to backend server");
})