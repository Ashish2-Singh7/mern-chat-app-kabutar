import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Error in protect route middleware", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}

export default protectRoute;