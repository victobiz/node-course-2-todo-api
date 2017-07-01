//AES  //MD5   //SHA256

//npm i crypto-js

const {SHA256} = require ('crypto-js');
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcryptjs');

var password = '123abc!';

//the larger the gensalt the longer it will take for brute force attack
bcrypt.genSalt(10, (err, salt)=> {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});

var hashedPassword ='$2a$10$4Qp.36X/0Df41G4OnZ8e0Oz5BmBKYGI7fTJhKPf6ENGoRYmFYVr5m';
bcrypt.compare(password, hashedPassword, (err, res)=> {
  console.log(res);
});
var data = {
  id: 10
};


//takes object and signs it
var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify (token, '123abc');
console.log('decoded', decoded);
//takes token and make sure data was not manipulated
//jwt.verify()
//you dont need to write out the bottom code because of existing libraries.
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data ={
//   id: 4
// };
//
// var token ={
//   data,
//   //salt the hash
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// //man in the middle attack doesnt have access to the salt 'somesecret'
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// if(resultHash === token.hash) {
//   console.log('Data was not changed');
// }else {
//   console.log('Data was changed. Do not trust!');
// }
