import User from '../models/User.js';

export const createUser = async (req, res, next) => {
    const newUser = await new User(req.body)

    try {
        const savedUser = newUser.save()
        res.status(200).json(savedUser)

    } catch (err) {
        return next(err)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedUser)

    } catch (err) {
        return next(err)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")

    } catch (err) {
        return next(err)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const getUser = await User.findById(req.params.id)
        res.status(200).json(getUser);
    } catch (err) {
        return next(err)
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).json(users)

    } catch (err) {
        return next(err)
    }
}