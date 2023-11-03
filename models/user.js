import { model, Schema } from "mongoose";

const userSchema = Schema({

    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    }
    

});

const User = model('User', userSchema);
export default User;