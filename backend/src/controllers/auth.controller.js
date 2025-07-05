import userModel from '../models/user.model.js';
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


const JWT_SECRET = "dfb828bb2bf78502b2c49308097db6cd7ad00d8edf2299ede56b85199ea9397d";

export async function registerUser(req, res) {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (user) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({ username, password: hashedPassword });
    const token = jwt.sign({ 
        id: newUser._id }, 
        JWT_SECRET, 
        { expiresIn: '1d' }
    );

    res.cookie("token",token)

    res.status(201).json({
        message: 'User registered successfully', newUser: {
            id: newUser._id,
            username: newUser.username,
        },
        token
    })
}




export async function loginUser(req, res) {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: 'In valid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: 'In valid username or password' });
    }


    const token = jwt.sign({
         id: user._id },
          JWT_SECRET, 
          { expiresIn: '1d' }
        );
    res.cookie("token",token)

    res.status(200).json({
        message: 'User logged in successfully', newUser: {
            id: user._id,
            username: user.username,
        },
        token
    })


}





