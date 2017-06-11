/**
 * Created by hp-pc on 2017/6/11 0011.
 */
/**
 * Created by hp-pc on 2017/6/9 0009.
 */
var mongoose = require('mongoose');
var CategorySchema = require('../schemas/category');
var Category = mongoose.model('Category',CategorySchema);

module.exports = Category;
