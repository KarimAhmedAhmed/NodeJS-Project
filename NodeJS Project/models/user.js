const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;


// User Schema
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String,
    nickname: {type: String, unique: true},
    role: {type: String, default: "member"},
    age: Number,
}, { timestamps: true });


// methods ======================

userSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
// this method takes the password and compares it to the user's own password
// when the two passwords are equal, it means the passwords match
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.isMember = function() {
    return (this.role === "member");
};
userSchema.methods.isAuthor = function() {
    return (this.role === "author");
};

module.exports = mongoose.model('User', userSchema);