/**
 * Created by hp-pc on 2017/6/9 0009.
 */
/**
 * Created by hp-pc on 2017/6/9 0009.
 */
var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');
var User = mongoose.model('User',UserSchema);

module.exports = User;
