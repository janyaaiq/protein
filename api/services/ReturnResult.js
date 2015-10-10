/**
 * Created by lhk on 2015/10/10.
 */
module.exports = {
    success: function(res, data){
        res.send({result: 'SUCCESS',message: data});
    },
    fail: function(res, error){
        res.send({result: 'FAIL',message: error});
    }
}