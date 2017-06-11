var express = require('express');
var router = express.Router();
var Index = require('../controls/index');
var Movie = require('../controls/movie');
var User = require('../controls/user');
var Comment = require('../controls/comment');
var Category = require('../controls/category');



//首页
router.get('/', Index.index);

//电影
router.get('/admin/movie/list', User.signinRequired,User.adminRequired,Movie.movieList);
router.get('/movie/:id',Movie.movieDetail);
router.delete('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.delMovie);
router.get('/admin/movie/update/:id',User.signinRequired,User.adminRequired,Movie.updata);
router.get('/admin/movie', User.signinRequired,User.adminRequired,Movie.addMovie);
router.post('/admin/movie/new',User.signinRequired,User.adminRequired,Movie.cACMovie);

//用户
router.get('/signin',User.showSignIn);
router.get('/signup',User.showSignUp);
router.get('/admin/user/list',User.signinRequired,User.adminRequired,User.userList);
router.post('/user/signup',User.signup);
router.post('/user/signin',User.signin);
router.get('/logout',User.logout);
router.delete('/admin/user/list',User.signinRequired,User.adminRequired,User.delUser);

//评论
router.post('/user/comment',User.signinRequired,Comment.save);

//分类
router.post('/admin/category/new',User.signinRequired,User.adminRequired,Category.cACCategory);
router.get('/admin/category', User.signinRequired,User.adminRequired,Category.addCategory);
router.get('/admin/category/list', User.signinRequired,User.adminRequired,Category.categoryList);

module.exports = router;
