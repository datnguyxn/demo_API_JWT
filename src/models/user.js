import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 100,
    },
    googleId: {
        type: String,
        default: null,
    },
    facebookId: {
        type: String,
        default: null,
    },
    level: {
      type: String,
      enum: ['local', 'google', 'facebook'],
      default: 'local',
    },
    isAdmin: {
        type: Boolean,
        default: false,

    },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    try {
        if (this.level !== 'local') {
           next();
        } else {
            const salt = await bcrypt.genSalt();
            this.password = await bcrypt.hash(this.password, salt);
            next();
        }
    } catch (error) {
        next(error);
    }
});

export default mongoose.model("User", userSchema);