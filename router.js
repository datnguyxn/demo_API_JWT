import express from "express";
import authRoute from "./src/routes/auth.js";
import userRoute from "./src/routes/user.js";

const setRoutes = (app) => {
    app.use('/v1/auth', authRoute);
    app.use('/v1/users', userRoute);
}

export default setRoutes;