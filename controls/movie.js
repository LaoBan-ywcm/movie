/**
 * Created by hp-pc on 2017/6/10 0010.
 */
var Movie = require('../modules/movie');
var Comment = require('../modules/comment');
var Category = require('../modules/category');
var _ = require('underscore');

//详情页
exports.movieDetail = function (req, res, next) {
    res.locals.user = req.session.user;
    var id = req.params.id;

    Movie.findById(id, function (err, movie) {
        if (err) {
            console.log(err)
        }
        Comment
        //根据movie._id找到影片所有对应的评论
            .find({movie: id})
            //根据每条评论的from属性（user._id）从User中找到user.name,并添加到comment的from属性中
            .populate('from', 'name')
            .populate('reply.from reply.to', 'name')
            .exec(function (err, comment) {
                // console.log(comment[1].reply);
                res.render('detail', {
                    title: movie.title + '详情',
                    movie: movie,
                    comment: comment
                });
            });
    });
};

//修改表单，新增movie和修改movie都会admin,admin的表单都会提交到这
exports.cACMovie = function (req, res) {
    var id = req.body.movie._id;//提交movie的id
    var movieObj = req.body.movie;//提交movie
    var _movie;
    console.log(movieObj);

    if (id) {//如果id存在，说明是修改
        Movie.findById(id, function (err, movie) {

            // 找到原来的电影所属的分类，并在这个分类中将该电影删除
            Category.findOne({_id: movie.category}, function (err, category) {
                category.movies.remove(movie._id);
                category.save(function (err, category) {

                    if (err) {
                        console.log(err);
                    }

                    // 找到修改后的电影所属的分类，并把该电影添加到这个分类中
                    Category.findOne({_id: movieObj.category}, function (err, category) {
                        category.movies.push(movie._id);
                        category.save(function (err, category) {

                            if (err) {
                                console.log(err);
                            }
                            //把分类中电影的增删修改完后，修改电影的数据
                            _movie = _.extend(movie, movieObj);
                            _movie.save(function (err, movie) {//保存
                                if (err) {
                                    console.log(err);
                                }

                                res.redirect('/movie/' + movie._id);
                            })

                        });
                    });

                });
            });
        });
    } else {//新增movie
        _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash,
            category: movieObj.category
        });

        var categoryId = _movie.category;

        var cId = movieObj.category;
        var categoryName = movieObj.categoryName;


        _movie.save(function (err, movie) {
            if (err) {
                console.log(err);
            }

            if (cId) {//是在圆点中选择已有的分类
                //通过分类的ID找到该分类，并把这个电影的id加到分类的movies数组中
                Category.findById(categoryId, function (err, category) {
                    category.movies.push(movie._id);

                    category.save(function (err, category) {
                        res.redirect('/movie/' + movie._id);
                    })
                });

            } else if (categoryName) {
                //    自己新加的分类
                var category = new Category({
                    name: categoryName,
                    movies: [movie._id]
                });

                category.save(function (err, category) {
                    //在自定义的分类存到数据库后，在设置这部电影的分类
                    movie.category = category._id;
                    movie.save(function(err,movie){
                        res.redirect('/movie/' + movie._id);
                    });
                })
            }
        });

    }
};


//表单录入
exports.addMovie = function (req, res, next) {
    res.locals.user = req.session.user;

    Category.find({}, function (err, categories) {
        res.render('admin', {
            title: '后台录入页',
            categories: categories,
            movie: {
                title: '',
                doctor: '',
                country: '',
                year: '',
                poster: '',
                flash: '',
                summary: '',
                language: ''
            }
        });
    });

};


//电影列表页
exports.movieList = function (req, res, next) {
    res.locals.user = req.session.user;
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }

        res.render('list', {
            title: '电影列表页',
            movies: movies
        });
    });
};

//删除电影列表项
exports.delMovie = function (req, res) {
    var id = req.query.id;
    if (id) {
        Movie.remove({_id: id}, function (err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.json({success: 1});
            }
        })
    }
};

exports.updata = function (req, res) {
    res.locals.user = req.session.user;
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function (err, movie) {
            Category.find({}, function (err, categories) {
                res.render('admin', {
                    title: '后台更新页',
                    movie: movie,
                    categories: categories
                })
            });
        })
    }
};