const Project = require('../models/Project.js');
const Issue = require('../models/Issue.js');

/* Get all issues concerning a project (with filters) */
const getIssues = async function(req, res) {
  let project = req.params.project;
  const projectId = await Project.find({name: project});
  //const { _id, issue_title, issue_text, created_by, assigned_to, 
  //        open, status, status_text, created_on, updated_on,   } = req.query;
  const issues = await Issue.find({projectId, ...req.query});
  //res.json({action: "get all issues", project, filters: req.query});
  res.json(issues);
}

const createIssue = async function(req, res) {
  let project = req.params.project;
  let projectId = await Project.findOne({name: project});
  if (!projectId) {
    projectId = await Project.create({name: project});
    projectId = projectId._id;
  }
  const issue = await Issue.create({projectId, ...req.body});
  res.status(201).json(issue);
}

const updateIssue = function(req, res) {
  let project = req.params.project;
  res.json({"action": "update issue", project, update: req.body});
}

const deleteIssue = function(req, res) {
  let project = req.params.project;
  res.json({"action": "delete issue", project, id: req.body._id});
}

module.exports = {
  getIssues,
  createIssue,
  updateIssue,
  deleteIssue
}; 