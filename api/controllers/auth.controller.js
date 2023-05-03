import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req, res, next )=>{
    const { username, email, isSeller, phone } = req.body;

    try{
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return next(createError(400, {
                username: "User already exist!"
            }));
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return next(createError(400, {
                email: "Email already exist!"
            }));
        }

        if (isSeller && phone === '') {
            return next(createError(400, {
                phone: "Phone Number is required!"
            }));
        }

        const existingPhone = await User.findOne({ phone });
        if (isSeller && existingPhone ) {
            return next(createError(400, {
                phone: "Phone number already exist!"
            }));
        }

        const hash = bcrypt.hashSync(req.body.password, 5);
        const newUser = new User({
            ...req.body,
            password: hash,
        });


        await newUser.save();
        res.status(201).send("User Has been registered");
    }catch(err){
        next(err);
    }

}

export const login = async (req, res, next)=>{
    try{
        const username = req.body.username.trim().charAt(0).toUpperCase() + req.body.username.trim().slice(1); // capitalize first letter only
        const user = await User.findOne({ username });

        if(!user) 
            return next(createError(400, "Wrong Username or Password!"));

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if(!isCorrect) 
            return next(createError(400, "Wrong Username or Password!"));

        const token = jwt.sign({
            id: user._id, 
            isSeller: user.isSeller,
        }, 
        process.env.JWT_KEY
        );

        const {password, ...info} = user._doc
        const expiresDate = new Date();
        expiresDate.setHours(expiresDate.getHours() + 24);
        res.cookie("accessToken", token, {
            httpOnly: true,
            expires: expiresDate,
        })
        .status(200)
        .send(info)
    }catch(err){
        next(err);
    }
};


export const logout = async (req, res)=>{
    res.clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
    })
    .status(200)
    .send("Successfully logged out.");
};