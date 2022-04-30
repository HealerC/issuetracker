'use strict';
const {
  getIssues,
  createIssue,
  updateIssue,
  deleteIssue
} = require('../controllers/api.js');
const {
  getProject, 
  createAndGetProject
} = require('../middlewares/project-handler.js');

module.exports = function (app) {
  app.route('/api/issues/:project')
  
    .get(getProject, getIssues)
    
    .post(createAndGetProject, createIssue)
    
    .put(getProject, updateIssue)

    .delete(getProject, deleteIssue);
};
