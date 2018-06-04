var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    db:'mongodb://127.0.0.1:27017/multivision',
    rootPath: rootPath,
    port: process.env.PORT || 3030
  },
  production: {
    db:'mongodb://benoitrion:multivision@ds133630.mlab.com:33630/multivision',
    rootPath: rootPath,
    port: process.env.PORT || 8000
  }
}
