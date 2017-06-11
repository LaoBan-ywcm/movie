/**
 * Created by hp-pc on 2017/6/11 0011.
 */
/**
 * Created by hp-pc on 2017/6/10 0010.
 */
var Movie = require('../modules/movie');
var Category = require('../modules/category');

var _ = require('underscore');



//表单录入
exports.addCategory =  function(req, res, next) {
    res.locals.user = req.session.user;
    res.render('admin_category', {
        title: '电影分类录入页',
        category:{}
    });
};

//修改表单，新增movie和修改movie都会admin,admin的表单都会提交到这
exports.cACCategory = function (req,res) {
    var _category = req.body.category;
    var category = new Category(_category);


    category.save(function(err,movie){
        if(err){
            console.log(err);
        }

        res.redirect('/admin/category/list');
    });
};


//电影列表页
exports.categoryList =  function(req, res, next) {
    res.locals.user = req.session.user;
    Category.fetch(function(err,categories){
        if(err){
            console.log(err);
        }

        res.render('categorylist',{
            title:'电影分类列表页',
            categories:categories
        });
    });
};



