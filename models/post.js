import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let PostSchema = new Schema({
    title: {type: String, default: ' '},
    content: String,
    author: {type: String, ref: 'User'},
    date: {type: Date, default: Date.now} 
});

export default mongoose.model('Post', PostSchema);