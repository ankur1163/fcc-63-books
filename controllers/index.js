var PollsController = require("./PollsController");
var CommentController = require("./CommentController");
var Yelpcontroller = require("./Yelpcontroller");
var BooksController = require("./BooksController");

module.exports = {
    comment: CommentController,
    polls: PollsController,
    yelp:Yelpcontroller,
    books:BooksController
};