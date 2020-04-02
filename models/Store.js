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