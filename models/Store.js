const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // es6 promises
const slug = require('slugs'); // url-friendly names

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter a store name', // passing a string -> true, but gives a more useful error
    },
    slug: String,
    description: {
        type: String,
        trim: true,
    },
    tags: [String],
    created: {
        type: Date,
        default: Date.now
    },
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: [{
            type: Number,
            required: 'You must supply coordinates!'
        }],
        address: {
            type: String,
            required: 'You must supply an address!'
        }
    },
    photo: String
});

// autogenerate slugs before save
storeSchema.pre('save', function(next) {
    if (!this.isModified('name')) {
        next();
        return;
    }
    this.slug = slug(this.name);
    next();
    // TODO: make more resilient so slugs are unique
})

module.exports = mongoose.model('Store', storeSchema);