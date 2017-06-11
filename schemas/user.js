/**
 * Created by hp-pc on 2017/6/9 0009.
 */
/**
 * Created by hp-pc on 2017/6/9 0009.
 */

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
    name:{
        unique:true,
        type:String
    },
    password:String,
    role:{
        type:Number,
        default:0
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

UserSchema.pre('save',function(next){
    var user = this;
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }

    //密码加密
    bcrypt.genSalt((SALT_WORK_FACTOR),function(err,salt){//生成盐
        if(err){
            return next(err);
        }

        //hash方法对密码和盐进行加密，生成最后的密码
        bcrypt.hash(user.password,salt,function(err,hash){
            if(err){
                return next(err);
            }

            user.password = hash;
            next();
        })

    });

});


//实例方法，由document调用
UserSchema.methods = {
  comparePassword:function(_password,cb){
      bcrypt.compare(_password,this.password,function(err,isMatch){
          if(err){
              return cb(err)
          }

          cb(null,isMatch);
      })
  }
};


//静态方式，由Schemas调用
UserSchema.statics = {
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



module.exports = UserSchema;

