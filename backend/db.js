const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://anurag_prasad:anurag_prasad@cluster0.hz6pe4d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName : String,
    userName: String,
    password: String,
})

const accountSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    balance: {
        type: Number,
        required : true 
    }
})

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account
}