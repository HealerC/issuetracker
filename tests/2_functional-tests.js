const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const { checkResponse } = require("./checkResponse");

chai.use(chaiHttp);

suite('Functional Tests', function() {
    
  let testId;
  suite('Create Issue', function(){
    test('with every field', function(done) {
        const payload = {
          issue_title: "functional test -title",
          issue_text: "functional test -text",
          created_by: "functional test -created_by",
          assigned_to: "functional test -assigned_to",
          status_text: "functional test -status_text"
        }
        chai
          .request(server)
          .post('/api/issues/func_test')
          .send(payload)
          .end(function(err, res) {
            assert.equal(res.status, 201);
            assert.equal(res.type, 'application/json');
            
            assert.isOk(res.body._id);
            testId = res.body._id;
            assert.equal(res.body.issue_title, payload.issue_title);
            assert.equal(res.body.assigned_to, payload.assigned_to);
            done();
          });
    });
    test('with only required fields', function(done) {
        const payload = {
          issue_title: "functional test -title",
          issue_text: "functional test -text",
          created_by: "functional test -created_by"
        };
        chai
          .request(server)
          .post('/api/issues/func_test')
          .send(payload)
          .end(function(err, res) {
            assert.equal(res.status, 201);
            assert.equal(res.type, 'application/json');
            
            assert.isOk(res.body._id);
            assert.equal(res.body.issue_title, payload.issue_title);
            assert.equal(res.body.issue_text, payload.issue_text);
            assert.equal(res.body.created_by, payload.created_by);
            assert.equal(res.body.assigned_to, "");
            assert.equal(res.body.status_text, "");
            done();
          });
    });
    test('with missing required fields', function(done) {
        const payload = {
          issue_title: "functional test -title",
          issue_text: "functional test -text",
        } 
        chai
          .request(server)
          .post('/api/issues/func_test')
          .send(payload)
          .end(function(err, res) {
            assert.equal(res.status, 400);
            assert.equal(res.type, 'application/json');

            assert.equal(res.body.error, "required field(s) missing");
            done();
          });
    });
  });

  suite('View Issues on a project', function(){
    test('all issues', function(done) {
        chai
          .request(server)
          .get('/api/issues/func_test')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            
            assert.isArray(res.body);
            done();
          });
    });
    test('with one filter', function(done) {
        const query = {open: 'true'}; 
        chai
          .request(server)
          .get('/api/issues/func_test')
          .query(query)
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            
            assert.isArray(res.body);
            assert.isTrue(checkResponse(res.body, query));
            done();
          });
    });
    test('with multiple filters', function(done) {
        const query = {open: 'true', status: 'In Progress'}; 
        chai
          .request(server)
          .get('/api/issues/func_test')
          .query(query)
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            
            assert.isArray(res.body);
            assert.isTrue(checkResponse(res.body, query));
            done();
          });
    });
  });
  
  suite('Update Issue', function(){
    test('with one field', function(done) {
        chai
          .request(server)
          .put('/api/issues/func_test')
          .send({
            _id: testId,
            issue_title: "update:functional test -title"
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            
            assert.equal(res.body._id, testId);
            assert.equal(res.body.result, 'successfully updated');
            done();
          });
    });
    test('with multiple fields', function(done) {
        chai
          .request(server)
          .put('/api/issues/func_test')
          .send({
            _id: testId,
            issue_title: "update:functional2 test -title",
            issue_text: "update:functional test -text"
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            
            assert.equal(res.body._id, testId);
            assert.equal(res.body.result, 'successfully updated');
            done();
          });
    });
    test('with missing _id', function(done) {
        chai
          .request(server)
          .put('/api/issues/func_test')
          .send({
            issue_title: "update:functional2 test -title",
            issue_text: "update:functional test -text"
          })
          .end(function(err, res) {
            assert.equal(res.status, 400);
            assert.equal(res.type, 'application/json');
            
            assert.equal(res.body.error, 'missing _id');
            done();
          });
    });
    test('with no fields to update', function(done) {
        chai
          .request(server)
          .put('/api/issues/func_test')
          .send({
            _id: testId
          })
          .end(function(err, res) {
            assert.equal(res.status, 400);
            assert.equal(res.type, 'application/json');
            
            assert.equal(res.body._id, testId);
            assert.equal(res.body.error, 'no update field(s) sent');
            done();
          });
    });
    test('with invalid _id', function(done) {
        const invalidId = testId + "abc";
        chai
          .request(server)
          .put('/api/issues/func_test')
          .send({
            _id: invalidId,
            issue_title: "update:functional test -title"
          })
          .end(function(err, res) {
            assert.equal(res.status, 400);
            assert.equal(res.type, 'application/json');
            
            assert.equal(res.body._id, invalidId);
            assert.equal(res.body.error, 'could not update');
            done();
          });
    });
  });
  suite('Delete Issue', function(){
    test('with valid _id', function(done) {
        chai
          .request(server)
          .delete('/api/issues/func_test')
          .send({
            _id: testId
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            
            assert.equal(res.body._id, testId);
            assert.equal(res.body.result, 'successfully deleted');
            done();
          });
    });
    test('with invalid _id', function(done) {
        const invalidId = testId + 'abc';
        chai
          .request(server)
          .delete('/api/issues/func_test')
          .send({
            _id: invalidId
          })
          .end(function(err, res) {
            assert.equal(res.status, 400);
            assert.equal(res.type, 'application/json');
            
            assert.equal(res.body._id, invalidId);
            assert.equal(res.body.error, 'could not delete');
            done();
          });
    });
    test('with missing _id', function(done) {
        chai
          .request(server)
          .delete('/api/issues/func_test')
          .end(function(err, res) {
            assert.equal(res.status, 400);
            assert.equal(res.type, 'application/json');
            
            assert.equal(res.body.error, 'missing _id');
            done();
          });
    });
  });

});

