'use strinct'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = Schema({
    title: String,
    desctiption : String,
    year: Number,
    image: String,
    artist : { type: Schema.ObjectId, ref: 'Artists'}
    
});

module.exports = mongoose.model('Albums',AlbumSchema);