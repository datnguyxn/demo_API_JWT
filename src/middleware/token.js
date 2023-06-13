import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const createAccessToken = (user) => {
    return jwt.sign({
            id: user.id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_ACCESS_TOKEN,
        {expiresIn: '3d'});
};

const createRefreshToken = (user) => {
    return jwt.sign({
            id: user.id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_REFRESH_TOKEN,
        {expiresIn: '30d'});
}

export {createAccessToken, createRefreshToken};