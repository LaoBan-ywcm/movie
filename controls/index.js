/**
 * Created by hp-pc on 2017/6/10 0010.
 */
var Movie = require('../modules/movie');
var Category = require('../modules/category');


//首页
exports.index = function(req, res, next) {
    res.locals.user = req.session.user;
    Category
        .find({})
        .populate({path:'movies',options:{limit:5}})
        .exec(function(err,categories){
            res.render('index', {
                title: '电影首页',
                categories: categories
            });
        });

};