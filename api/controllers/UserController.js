/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    login:function(req,res){
      console.log('login');
      var params = req.body;
      console.log(params);
      if(params.password&&params.name) {
        User.findOne({name: params.name}).exec(function (err, data) {
          if (err) {
            ReturnResult.fail(res, err);
          } else {
            if(data) {
              if (data.password == Tool.md5(params.password)) {
                delete data.password;
                ReturnResult.success(res, data);
              } else {
                ReturnResult.fail(res, "密码错误");
              }
            }else{
              ReturnResult.fail(res, "没有此用户");
            }
          }
        });
      }else{
        ReturnResult.fail(res, "请输入用户名和密码");
      }
    },
    register:function(req,res){
        var params = req.body;
        User.find({name:params.name}).exec(function(err,data){
            if(err){
                ReturnResult.fail(res,err);
            }else{
                if(data.length>0){
                    ReturnResult.fail(res,"账号已存在");
                }else{
                    params.password = Tool.md5(params.password);
                    User.create(params).exec(function(err,data){
                        if(err){
                            ReturnResult.fail(res,err);
                        }else{
                            delete data.password;
                            ReturnResult.success(res, data);
                        }
                    });
                }
            }
        });
    }
};

