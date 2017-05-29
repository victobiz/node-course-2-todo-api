//mocha does not need to be required
const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server3');
const {Todo} = require('./../models/todo');

//runs before every test case
beforeEach((done) => {
  //similar to mongodb native method that wipes all our todos
  Todo.remove({}).then(() => {
    done();
  })
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Any Value Tset todo text';

    //request from super test
    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res)=> {
      expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      if (err){
        return done(err);
      }
      Todo.find().then((todos) =>{
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
     .send({})
     .expect(400)
     .end((err, res) => {
       if (err) {
         return done(err);
       }

       Todo.find().then((todos) => {
         expect(todos.length).toBe(0);
         done();
       }).catch((e) => done(e));
     });
 });

});
