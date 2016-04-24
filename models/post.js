import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: {type: String, default: ' '},
    content: String,
    author: {type: String, ref: 'User'},
    date: {type: Date, default: Date.now} 
});

export default mongoose.model('Post', PostSchema);