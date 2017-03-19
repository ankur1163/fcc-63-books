var mongoose = require('mongoose');

var BooksSchema = new mongoose.Schema({
    username:{type:String},
    mybooks:{type:Array,default:[]},
    selectedbooks:{type:Array,default:[]},
    count:{type:Number,default:10},
    requestsrecieved:{type:Array,default:[]},
    requestssent:{type:Array,default:[]},
    approved:{type:Array,default:[]}
 
});

module.exports = mongoose.model('BooksSchema', BooksSchema);