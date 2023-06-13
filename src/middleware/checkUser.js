import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, user) => {
            if (err) res.status(403).json("Token is not valid");
            req.user = user;
            next();
        })
    } else {
        res.status(401).json("You are not authenticated!");
    }
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not authorized to do that!");
        }
    })
};

export { verifyToken, verifyTokenAndAdmin };