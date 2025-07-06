import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    name: {
        type: String,
        default: function() {
            return this.username;
        }
    },
    email: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: function() {
            return `https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=${this.username.charAt(0).toUpperCase()}`;
        }
    },
    totalSongs: {
        type: Number,
        default: 0
    },
    totalPlaylists: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const userModel = mongoose.model("user",userSchema);
export default userModel;