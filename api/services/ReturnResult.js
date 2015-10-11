/**
 * Created by lhk on 2015/10/10.
 */
module.exports = {
    success: function(res, data){
        console.log(data);
        res.send({result: 'SUCCESS',message: data});
    },
    fail: function(res, error){
        console.log(error);
        res.send({result: 'FAIL',message: error});
    }
}
