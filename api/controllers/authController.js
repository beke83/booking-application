import User from "../models/User.js";

export const register = async (req, res, next) => {
    try {
        //create a new user
        const newUser = User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })

        await newUser.save()
        res.status(201).json("User has been created")
    }
    catch (err) {
        return next(err);
    }
}