/**
 * Created by hp-pc on 2017/6/10 0010.
 */
/**
 * Created by hp-pc on 2017/6/10 0010.
 */
var Comment = require('../modules/comment');


//修改表单，新增movie和修改movie都会admin,admin的表单都会提交到这
exports.save = function (req,res) {
    res.locals.user = req.session.user;
    var _comment = req.body.comment;
    var movieId = _comment.movie;

    if(_comment.cid){//回复
        Comment.findById(_comment.cid,function(err,comment){
            var reply = {
                from:_comment.from,
                to:_comment.tid,
                content:_comment.content
            };

            comment.reply.push(reply);

            comment.save(function(err,comment){
                if(err){
                    console.log(err);
                }

                res.redirect('/movie/' + movieId);
            })
        })
    }else{//新增评论
        var comment = new Comment(_comment);

        comment.save(function(err,comment){
            if(err){
                console.log(err);
            }

            res.redirect('/movie/' + movieId);
        })
    }
};


