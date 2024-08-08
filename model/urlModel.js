import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
        unique: true,
    },
    shortenedUrl: {
        type: String,
        required: true,
        unique: true,
    },
    string:{
        type: String,
        required: true,
        unique: true,
    }
})

const urlModel = mongoose.model('url', urlSchema);
export default urlModel;