import User from "../model/user.model.js";
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookies from "../utils/generateToken.js";

export const signUpUser = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password != confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const isUserExists = await User.findOne({ username });

        if (isUserExists) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // HASH THE PASSWORD 
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // PROFILE PIC

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new User({
            fullName,
            username,
            password: hashPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        });
        if (newUser) {
            generateTokenAndSetCookies(newUser._id, res);
            newUser.save();
            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
                gender: newUser.gender
            });
        }
        else {
            return res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in sign-up controller", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || ""); // if user not present user?.password evaluates to undefined to avoid the error we use || "" this.

        if (!isPasswordCorrect || !user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        generateTokenAndSetCookies(user._id, res);

        return res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
            gender: user.gender,
        })
    } catch (error) {
        console.log("Error in login controller", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        console.log("Error in logout controller", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}
