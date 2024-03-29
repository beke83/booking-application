import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) => {
    //using the Hotel model to create new hotel
    const newHotel = await new Hotel(req.body)

    try {
        const savedHotel = newHotel.save()
        res.status(200).json(savedHotel)
    }
    catch (err) {
        return next(err);
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        //find the Hotn  el and update it using the set method
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedHotel)
    }
    catch (err) {
        return next(err);
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        //find the Hotel and update it using the set method
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted")
    }
    catch (err) {
        return next(err);
    }
}
export const getHotel = async (req, res, next) => {
    try {
        //get a hotel by id
        const hotel = await Hotel.findById(req.params.id)
        console.log(req.params.id)
        res.status(200).json(hotel)
    }
    catch (err) {
        return next(err);
    }
}

export const getHotels = async (req, res, next) => {
    //const failed = true
    //if (failed) return next(createError(401, "You are not authenticated!"));

    const { min, max, ...others } = req.query
    console.log(req.query)
    try {
        //get all hotel
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: {
                $gt: min | 1,   // greater than minimum or 1
                $lt: max | 999   // less than maximum or 999
            }
        }).limit(req.query.limit)
        console.log(hotels)
        res.status(200).json(hotels)
    }
    catch (err) {
        return next(err);
    }
}

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
}

export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villa", count: villaCount },
            { type: "cabin", count: cabinCount },
        ])
    }
    catch (err) {
        return next(err);
    }
}

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        console.log(hotel)
        const list = await Promise.all(hotel.rooms.map(room => {
            return Room.findById(room)
        })
        )
        res.status(200).json(list)
    }
    catch (err) {
        next(err);
    }
}
