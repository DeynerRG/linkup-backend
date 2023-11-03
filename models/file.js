import { model,Schema } from "mongoose";

const fileSchema = Schema({
    filename:{
        type: String,
        required: true
    },
    num_downloads: {
        type: Number,
        default: 1,
    }
});

const File = model('file', fileSchema);
export default File;