/**
 * Created by hp-pc on 2017/6/10 0010.
 */
var mongoose = require('mongoose');
var CommentSchema = require('../schemas/comment');
var Comment = mongoose.model('Comment',CommentSchema);

module.exports = Comment;