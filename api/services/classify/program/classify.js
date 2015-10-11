var callfile = require('child_process');
exports.do = function(path,callback){
  var arg1 = path;
  var arg2 = 'rule.example';
  callfile.exec('perl /home/allergen/allergen/classify/program/classify.pl '+arg1+' '+arg2+' ',function (err, stdout, stderr) {
    if(err){
      callback(err);
    }else{
      if(stderr){
        callback(stderr);
      }else{
        callback(null,stdout);
      }
    }
  });
}

