/**
 * Created by hp-pc on 2017/6/10 0010.
 */
/**
 * Created by hp-pc on 2017/6/9 0009.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CommentSchema = new Schema({
    movie:{
        type:ObjectId,
        ref:'Movie'
    },
    from:{
        type:ObjectId,
        ref:'User'
    },
    reply:[{
        from:{
            type:ObjectId,
            ref:'User'
        },
        to:{
            type:ObjectId,
            ref:'User'
        },
        content:String
    }],
    content:String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});

CommentSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }

    next()
});

CommentSchema.statics = {
    //  查找全部
    fetch:function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    //  根据ID查找
    findById:function(id,cb){
        return this
            .findOne({_id:id})
            .exec(cb)
    }
};

module.exports = CommentSchema;

