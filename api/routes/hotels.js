import express from "express"
import Hotel from "../models/Hotel.js";

const router = express.Router();

//CREATE
router.post("/", async (req, res) => {
    //using the Hotel model to create new hotel
    const newHotel = await new Hotel(req.body)

    try {
        const savedHotel = newHotel.save()
        res.status(200).json(savedHotel)
    }
    catch (err) {
        res.status(500).json(err)
    }
});

//UPDATE
router.put("/:id", async (req, res) => {
    try {
        //find the Hotn  el and update it using the set method
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedHotel)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});


//DELETE
router.delete("/:id", async (req, res) => {
    try {
        //find the Hotn  el and update it using the set method
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted")
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});


//GET
router.get("/:id", async (req, res) => {
    try {
        //get a hotel by id
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

//GET ALL
router.get("/", async (req, res) => {
    try {
        //get all hotel
        const hotels = await Hotel.find()
        res.status(200).json(hotels)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});


export default router;