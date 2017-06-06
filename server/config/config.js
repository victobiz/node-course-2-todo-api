//node env variable that needs to be set up in process/test/development enviorments
var env = process.env.NODE_ENV || 'development';

if (env === 'development'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
}else if (env ==='test'){
  process.env.PORT =3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
