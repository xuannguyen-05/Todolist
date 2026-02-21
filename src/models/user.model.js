const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true 
        },
        password: {
            type: String,
            required: true
        },
        fullname: {
            type: String,
        },
        role: {
            type: String,
            enum: ["admin", "normal"],
            default: "normal"
        }
    },
    {timestamps: true}
);

const User = mongoose.model("User", UserSchema)

module.exports = User