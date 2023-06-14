import { createAccessToken, createRefreshToken } from "../middleware/token.js";
import bcrypt from "bcrypt";
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import createCookie from "../store/cookie.js";

class AuthController  {
    async registerUser(req, res) {
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            });
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    async loginUser(req, res) {
        try {
            const user = await User.findOne({ username: req.body.username });
            !user && res.status(404).json("Wrong Username");
            if (user) {
                const accessToken = createAccessToken(user);
                const refreshToken = createRefreshToken(user);
                createCookie(res, "refreshToken", refreshToken, '/');
                const { password, ...others } = user._doc;
                res.status(200).json({...others , accessToken});
                // res.status(200).json(user);
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    async requestRefreshToken(req, res){
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(401).json("You are not authenticated!");
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
            if(err){
                console.log(err);
            }
            const newAccessToken = createAccessToken(user);
            // const newRefreshToken = createRefreshToken(user);
            // createCookie(res, "refreshToken", newRefreshToken, '/');
            res.status(200).json({accessToken: newAccessToken});
        })
    }
    async logoutUser(req, res) {
        res.clearCookie("refreshToken");
        res.status(200).json("Logged out");
    }

    async secret(req, res) {
        res.status(200).json({resources: true});
    }
    async googleOAuth(req, res) {
        console.log('req.user', req.user);
        const token = createAccessToken(req.user);
        res.status(200).json({token});
    }
}

export default new AuthController();