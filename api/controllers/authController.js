import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import { createError } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    try {
        //encrypt the users password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        //create a new user
        const newUser = User({
           ...req.body,
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

        //if password is correct create a new jwt token
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin },
            //generate a secret key
            process.env.JWT
        )

        //don't send password after successful login to the frontend
        const { password, isAdmin, ...otherDetails } = user._doc

        //adding cookies with the new token created
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({ details: { ...otherDetails }, isAdmin })

    }
    catch (err) {
        return next(err);
    }
}