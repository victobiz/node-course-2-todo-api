//node env variable that needs to be set up in process/test/development enviorments
var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test'){
  var config = require('./config.json');
  //console.log(config);

  //use bracket notation to use a variable to access a propetry(json)
  var envConfig = config[env];
  //console.log(Object.keys(envConfig)) will print out the json property keys in an array ( PORT and MONGODB_URI)
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}

// if (env === 'development'){
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// }else if (env ==='test'){
//   process.env.PORT =3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }
