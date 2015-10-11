/**
 * LoadDataController
 *
 * @description :: Server-side logic for managing loaddatas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	classify:function(req,res){
    Classify.do(req.param('path'),function(err,data){
      if(err){
        ReturnResult.fail(res,err);
      }else{
        ReturnResult.success(res,data);
      }
    });
  }
};

