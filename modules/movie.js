/**
 * Created by hp-pc on 2017/6/9 0009.
 */
var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movie');
var Movie = mongoose.model('Movie',MovieSchema);

module.exports = Movie;
