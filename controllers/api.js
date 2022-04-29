const Project = require('../models/Project.js');
const Issue = require('../models/Issue.js');

/* Get all issues concerning a project (with filters) */
const getIssues = async function(req, res) {
  const project = await Project.find({name: req.params.project});
  const issues = await Issue.find({projectId: project._id, ...req.query});
  //res.json({action: "get all issues", project, filters: req.query});
  res.json(issues);
}

const createIssue = async function(req, res) {
  const projectName = req.params.project;
  let project = await Project.findOne({name: projectName});
  if (!project) {
    project = await Project.create({name: projectName});
  }
  const issue = await Issue.create({projectId: project._id, ...req.body});
  res.status(201).json(issue);
}

const updateIssue = async function(req, res) {
  //let project = req.params.project;
  const {_id} = req.body;
  let project = await Project.findOne({name: req.params.project});
  const issue = await Issue.findOneAndUpdate(
    {_id, projectId: project._id},
    req.body,
    {new: true, runValidators: true}
  );
  res.status(200).json(issue);
}

const deleteIssue = async function(req, res) {
  const {_id} = req.body;
  let project = await Project.findOne({name: req.params.project});
  const issue = await Issue.findByIdAndRemove({
    _id, projectId: project._id
  });
  res.status(200).json({"action": "delete issue", issue});
}

module.exports = {
  getIssues,
  createIssue,
  updateIssue,
  deleteIssue
}; 