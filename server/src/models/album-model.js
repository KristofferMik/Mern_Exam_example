const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Album = new Schema(
    {
        title: { type: String, required: true },
        artist: { type: String, required: true },
        genre: { type: String, required: true },
        releaseYear: { type: Number, required: true },
        reviews: [{ rating: {type: Number, required: true}, 
                    body: {type: String, required: false}, 
                    creator: {type: String, required: true},
                    DateOfCreation: {type: Date, required: true}
                }]
    }
);

module.exports = mongoose.model('albums', Album);