var mongoose = require('mongoose'),
  crypto = require('crypto');

module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log('multivision db opened. connected to ' + config.db);
  });

  var userSchema = mongoose.Schema({
      firstName: String,
      lastName: String,
      username: String,
      salt: String,
      hashed_pwd: String,
      roles: [String]
  });
  userSchema.methods = {
    authenticate: function(passwordToMatch) {
      return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
  }
  var User = mongoose.model('User', userSchema);

  User.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      var salt, hash;
      salt = createSalt();
      hash = hashPwd(salt, 'joe');
      User.create({firstName:'Joe',lastName:'Doe',username:'joe', salt: salt, hashed_pwd: hash, roles:['admin']});

      salt = createSalt();
      hash = hashPwd(salt, 'johnny');
      User.create({firstName:'John',lastName:'Smith',username:'johnny', salt: salt, hashed_pwd: hash, roles:[]});

      salt = createSalt();
      hash = hashPwd(salt, 'benny');
      User.create({firstName:'Benoit',lastName:'Rion',username:'benny', salt: salt, hashed_pwd: hash});
    }
  })
}

function createSalt() {
  return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
  var hmac = crypto.createHmac('sha1', salt);
  hmac.setEncoding('hex');
  hmac.write(pwd);
  hmac.end();
  return hmac.read();
}
