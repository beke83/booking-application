import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
    try {
        //encrypt the users password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        //create a new user
        const newUser = User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })

        await newUser.save()
        res.status(201).json("User has been created")
    }
    catch (err) {
        return next(err);
    }
}

//
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return next(createError(404, "User not found"))

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"))

        console.log(user);

        //don't send password after successful login
        const { password, isAdmin, ...otherDetails } = user._doc

        res.status(200).json({ ...otherDetails })

    }
    catch (err) {
        return next(err);
    }
}