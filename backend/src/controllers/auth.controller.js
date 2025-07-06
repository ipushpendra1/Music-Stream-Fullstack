import userModel from '../models/user.model.js';
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import dotenv from "dotenv" 

dotenv.config();


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
        process.env.JWT_SECRET, 
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
          process.env.JWT_SECRET,
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

// export async function getUserProfile(req, res) {
//     try {
//         const userId = req.user.id;
//         const user = await userModel.findById(userId).select('-password');
        
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
        
//         res.status(200).json({
//             id: user._id,
//             username: user.username,
//             name: user.name || user.username,
//             email: user.email || '',
//             avatar: user.avatar || `https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=${user.username.charAt(0).toUpperCase()}`,
//             joinDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
//                 year: 'numeric', 
//                 month: 'long' 
//             }) : new Date().toLocaleDateString('en-US', { 
//                 year: 'numeric', 
//                 month: 'long' 
//             }),
//             totalSongs: user.totalSongs || 0,
//             totalPlaylists: user.totalPlaylists || 0
//         });
//     } catch (error) {
//         console.error('Error getting user profile:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }

// export async function updateUserProfile(req, res) {
//     try {
//         const userId = req.user.id;
//         const { name, email, avatar } = req.body;
        
//         const updateData = {};
//         if (name) updateData.name = name;
//         if (email) updateData.email = email;
//         if (avatar) updateData.avatar = avatar;
        
//         const updatedUser = await userModel.findByIdAndUpdate(
//             userId,
//             updateData,
//             { new: true, runValidators: true }
//         ).select('-password');
        
//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }
        
//         res.status(200).json({
//             message: 'Profile updated successfully',
//             user: {
//                 id: updatedUser._id,
//                 username: updatedUser.username,
//                 name: updatedUser.name || updatedUser.username,
//                 email: updatedUser.email || '',
//                 avatar: updatedUser.avatar || `https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=${updatedUser.username.charAt(0).toUpperCase()}`,
//                 joinDate: updatedUser.createdAt ? new Date(updatedUser.createdAt).toLocaleDateString('en-US', { 
//                     year: 'numeric', 
//                     month: 'long' 
//                 }) : new Date().toLocaleDateString('en-US', { 
//                     year: 'numeric', 
//                     month: 'long' 
//                 }),
//                 totalSongs: updatedUser.totalSongs || 0,
//                 totalPlaylists: updatedUser.totalPlaylists || 0
//             }
//         });
//     } catch (error) {
//         console.error('Error updating user profile:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }





