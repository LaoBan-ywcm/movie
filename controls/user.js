/**
 * Created by hp-pc on 2017/6/10 0010.
 */
var User = require('../modules/user');


//用户注册页面
exports.showSignUp = function(req,res){
    res.render('signup',{
        title :'注册页面'
    })
};

//用户登录页面
exports.showSignIn = function(req,res){
    res.render('signin',{
        title :'登录页面'
    })
};

//用户注册
exports.signup = function(req,res){
    var _user = req.body.user;
    var userObj = new User(_user);

    //查找用户名是否存在
    User.findOne({name:_user.name},function (err,user) {
        if(err){
            console.log(err);
        }

        if(user){//存在
            res.redirect('/signin');
        }else{
            userObj.save(function(err,user){
                if(err){
                    console.log(err)
                }

                console.log(user);

                res.redirect('/signin');
            })
        }
    });
};

//用户登录
exports.signin =function (req,res) {
    var _user = req.body.user;
    var userObj = new User(_user);
    var _name = userObj.name;
    var _password = userObj.password;

    User.findOne({name:_name},function(err,user){
        if(err){
            console.log(err);
        }
        if(!user){
            res.redirect('/signup');
            return console.log("没有该用户");
        }

        user.comparePassword(_password,function(err,isMatch){
            if(err){
                console.log(err);
            }

            if(isMatch){
                //设置session
                req.session.user = user;
                console.log("用户登录成功");
                res.redirect('/');
            }else{
                console.log("用户密码错误");
                res.redirect('/signin')
            }
        });


    })
};

//用户登出
exports.logout =function (req,res) {
    delete req.session.user;
    res.redirect('/');
};

//用户列表
exports.userList =function(req,res){
    res.locals.user = req.session.user;
    User.fetch(function(err,users){
        if(err){
            console.log(err);
        }

        res.render('userlist',{
            title:'用户列表页',
            users:users
        });
    });
};

//注册验证
exports.signinRequired = function(req,res,next){
   var _user = req.session.user;
   if(!_user){
      return res.redirect('/signin');
   }
   next();
};

//管理员验证
exports.adminRequired = function(req,res,next){
    var _user = req.session.user;
    if(_user.role <= 10){
        return res.redirect('/signin');
    }
    next();
};

//删除用户
exports.delUser = function (req,res,next) {
    var id = req.query.id;
    if(id){
        User.remove({_id:id},function(err,user){
            if(err){
                console.log(err);
            }else{
                res.json({success:1});
            }
        })
    }
};