/**
 * Created by lhk on 2015/10/9.
 */
crypto = require('crypto');
module.exports = {
    md5:function (str) {
        return crypto.createHash('md5').update(str).digest('hex')
    }
}