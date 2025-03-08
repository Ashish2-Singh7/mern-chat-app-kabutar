import jwt from "jsonwebtoken";

const generateTokenAndSetCookies = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: '15d'
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // in millisecond expiry time=15days
        httpOnly: true, // PREVENT XSS attacks cross-site scripting attacks, makes it inaccessible using javascript
        sameSite: "strict", // CSRF attacks cross-site forgery attacks
        secure: process.env.NODE_ENV != 'development'
    });
};
// secure==false as https is not there

export default generateTokenAndSetCookies;