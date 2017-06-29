//mocha does not need to be required
const expect = require('expect');
const request = require('supertest');
const{ObjectID}= require ('mongodb');

const {app} = require('./../server3');
const {Todo} = require('./../models/todo');
const{User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');


//runs before every test case
beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Any Value Tset todo text';

    //request from super test
    request(app)
    .post('/todos')
    .set('x-auth', users[0].tokens[0].token)
    .send({text})
    .expect(200)
    .expect((res)=> {
      expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      if (err){
        return done(err);
      }
      Todo.find({text}).then((todos) =>{
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => done(e));
    });
  });

  // it('should not create todo with invalid body data', (done) => {
  //   request(app)
  //   .post('/todos')
  //   .send({})//no valid data point is what happens when invalid data is sent should be 400
  //   .expect(400)
  //   .end(err, res) => {
  //     if (err) {
  //       return done(err);
  //     }
  //     Todo.find().then((todos) => {
  //       expect(todos.length).toBe(0);
  //       done();
  //     }).catch((e) => done(e));
  //   });
  //
  // });

  it('should not create todo with invalid body data', (done) => {
   request(app)
     .post('/todos')
     .set('x-auth', users[0].tokens[0].token)
     .send({})
     .expect(400)
     .end((err, res) => {
       if (err) {
         return done(err);
       }

       Todo.find().then((todos) => {
         expect(todos.length).toBe(2);
         done();
       }).catch((e) => done(e));
     });
 });

});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
    .get('/todos')
    .set('x-auth', users[0].tokens[0].token)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).toBe(1);
    })
    .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .set('x-auth', users[0].tokens[0].token)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it('it should not return todo doc created by other user', (done) => {
    request(app)
    .get(`/todos/${todos[1]._id.toHexString()}`)
    .set('x-auth', users[0].tokens[0].token)
    .expect(404)
    .end(done);
  });

 it('should return a 404 if todo not found', (done) => {
   var hexId = new ObjectID().toHexString();
   request(app)
   .get(`/todos/${hexId}`)
   .set('x-auth', users[0].tokens[0].token)
   .expect(404)
   .end(done);
   //make a request using a realobject id and call its tohexstring method and new objectid to create a new one
   //expectation setup is status code

 });

 it('should return 404 for non-object ids', (done)=>{
   request(app)
   .get('/todos/123abc')
   .set('x-auth', users[0].tokens[0].token)
   .expect(404)
   .end(done);
 });
  //pass in url /todos/123 expectation when get request is made a 404 status code is result
});


describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[0]._id.toHexString();
//request ap d
    request(app)
      .delete(`/todos/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo)=> {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
        //query database using findById
        //expect (null).toNotExist();
      });
  });

  it('should remove a todo', (done) => {
//try to get first user with second user for error
    var hexId = todos[1]._id.toHexString();
//request ap d
    request(app)
      .delete(`/todos/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo)=> {
          expect(todo).toExist();
          done();
        }).catch((e) => done(e));
        //query database using findById
        //expect (null).toNotExist();
      });
  });

  it('should return a 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
    .delete(`/todos/${hexId}`)
    .set('x-auth', users[1].tokens[0].token)
    .expect(404)
    .end(done);
  });

  it('should return a 404 if object id is invalid', (done) =>{
    request(app)
    .delete('/todos/123abc')
    .set('x-auth', users[1].tokens[0].token)
    .expect(404)
    .end(done);
  });
});


describe ('PATCH /todos/:id', () => {
  it ('should update the todo', (done) => {

    var hexId = todos[0]._id.toHexString();
    var text = 'This should be the new text';

    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      completed: true,
      text: text
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(true);
      expect(res.body.todo.completedAt).toBeA('number');
    })
    .end(done);
    //grab id of first item
    //update text set completed to true
    //assert that you get 200 back
    //assert text is changed, completedis true, completedAt is a number .toBeA
  });

  it('should clear completedAt when todo is not completed', (done) => {
    //grab id of second todo item
    //update text, set completed to false
    //assert 200
    //asert text is changed, check completed is false. completedAt is null .toNotExist
    var hexId = todos[1]._id.toHexString();
    var text = 'This should be the new text';

    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      completed: false,
      text: text
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toNotExist();
    })
    .end(done);

  });
});

describe('GET /users/me', () => {

  it('should return user if authenticate', (done) => {
    request(app)
    .get('/users/me')
    .set('x-auth', users[0].tokens[0].token)
    .expect(200)
    .expect((res) => {
      expect(res.body._id).toBe(users[0]._id.toHexString());
      expect(res.body.email).toBe(users[0].email);
    })
    .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    //user me route expect 401 back and body is = to empty object which it should be if user is not authenticated
    //--call done-when comparing response object to another response object use toequal not toBe
    request(app)
    .get('/users/me')
    .expect(401)
    .expect((res) => {
      expect(res.body).toEqual({});
    })
    .end(done);
  });
});

describe('POST /users', () => {
  it ('should create a user', (done) => {
    var email = 'example@what.com';
    var password = '123abc!';

    request(app)
    .post('/users')
    .send({email, password})
    .expect(200)
    .expect((res) => {
      //you need to use brackets instead of . notation for [x-auth] since it has a dach
      expect(res.headers['x-auth']).toExist();
      expect(res.body._id).toExist();
      expect(res.body.email).toBe(email);
    })
    .end((err) =>{
    if(err){
      return done(err);
    }

    User.findOne({email}).then((user) =>{
      expect(user).toExist();
      expect(user.password).toNotBe(password);
      done();
    })
  });
});

  it('should return validation errors if request invalid', (done) =>{

    request(app)
      .post('/users')
      .send({
        email: 'bull',
        password: 'shit'
      })
      .expect(400)
      .end(done);
  });

  it('should not create user if email in use', (done)=> {

    request(app)
    .post('/users')
    .send({
      email: users[0].email,
      password: 'Password123'
    })
    .expect(400)
    .end(done);
  });
});


describe('POST /users/login', () => {
  it('should login user and return auth token', (done)=> {
    request(app)
    .post('/users/login')
    .send({
    email: users[1].email,
    password: users[1].password
    })
    .expect(200)
    .expect((res) => {
      expect(res.headers['x-auth']).toExist();
    })
    .end((err, res) => {
      if(err){
        return done(err);
      }

      User.findById(users[1]._id).then((user) => {
        expect(user.tokens[1]).toInclude({
          access: 'auth',
          token: res.headers['x-auth']
        });
        done();
      }).catch((e) => done(e));

    });
  });

  it('should reject invalid login', (done) => {
    request(app)
    .post('/users/login')
    .send({
      email: users[1].email,
      password: 'badpassword'
    })
    .expect(400)
    .expect((res) => {
      expect(res.header['x-auth']).toNotExist();
    })
    .end((err, res) => {
      if(err){
        return done(err);
      }

      User.findById(users[1]._id).then((user) => {
        expect(user.tokens.length).toBe(1);

      done()
    }).catch((e) => done(e));
});
  });
});

describe('DELETE /users/me/token', () => {
  it('should remove auth token on logout', (done) => {
    request(app)
    .delete('/users/me/token')
    .set('x-auth', users[0].tokens[0].token)
    .expect(200)
    .end((err, res) => {
      if(err){
        return done(err);
      }
      User.findById(users[0]._id).then((user) => {
        expect(user.tokens.length).toBe(0);
        done();
      }).catch((e) => done(e));

      });

  });
});
