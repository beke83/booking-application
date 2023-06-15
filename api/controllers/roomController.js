import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
// import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {

    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save();
        console.log(savedRoom);
        try {

            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
        }
        catch (err) {
            next(err)
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedRoom)
    } catch (error) {
        next(error)
    }
}

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        //find the Hotel and update it using the set method
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } })
        }
        catch (err) {
            console.log(error)
            next(err)
        }
        res.status(200).json("Room has been deleted")
    }
    catch (err) {
        console.log(eror)
        return next(err);
    }
}
   
export const getRoom = async (req, res, next) => {
    try {
        //get a hotel by id
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    }
    catch (err) {
        return next(err);
    }
}

export const getRooms = async (req, res, next) => {
    //const failed = true
    //if (failed) return next(createError(401, "You are not authenticated!"));

    try {
        //get all hotel
        const rooms = await Room.find()
        res.status(200).json(rooms)
    }
    catch (err) {
        return next(err);
    }
}

export const updateRoomAvailability = async (req, res, next) => {
    try {
       //find the room using the roomNumber ID
       await Room.updateOne({"roomNumbers._id": req.params.id}, 
       {
        $push:{
            //when updating nested properties you write it this way
            "roomNumbers.$.unavailableDates": req.body.dates
        }
       })
        res.status(200).json("Room status has been updated")
    } catch (error) {
        next(error.message)
    }
} 