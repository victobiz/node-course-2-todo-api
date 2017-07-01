var {User} = require('./../models/user');


//middlewear fuction to make routes private
//for middlewear the actual routes are not run until next gets called in the middlewear
var authenticate = (req, res, next) => {
//res.header lets us send a header (above) the req.header gets the value so the key is all that is neccessary
  var token = req.header('x-auth');

  User.findByToken(token).then((user) => {
   if(!user){
   //valid token but cannat find token in db
   return Promise.reject();
   }
   req.user= user;
   req.token = token;
//need to call next or code below will never execute
next();

 }).catch((e) => {
   //catches when x-auth is not valid
   res.status(401).send();
 });
 };



module.exports = {authenticate};
