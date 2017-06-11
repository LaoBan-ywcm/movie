/**
 * Created by hp-pc on 2017/6/9 0009.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var MovieSchema = new Schema({
    doctor:String,
    title:String,
    language:String,
    country:String,
    summary:String,
    flash:String,
    poster:String,
    year:String,
    category:{
        type:ObjectId,
        ref:'Category'
    },
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

MovieSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }

    next()
});

MovieSchema.statics = {
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

module.exports = MovieSchema;

