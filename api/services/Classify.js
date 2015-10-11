/**
 * Created by LHK on 2015/10/11.
 */
module.exports = {
  do:function(path,callback){
    var classify = require('./classify/program/classify.js');
    classify.do(path,function(err,data){
      callback(err,data);
    });
  }
}
