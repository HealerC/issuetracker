const Project = require('../models/Project.js');
const Issue = require('../models/Issue.js');

const BadRequestError = require('../errors/bad-request.js');

/* Get all issues concerning a project (with filters) */
const getIssues = async function(req, res) {
  const issues = await Issue.find({projectId: req.project._id, ...req.query});
  res.status(200).json(issues);
}

const createIssue = async function(req, res) {
  const issue = await Issue.create({projectId: req.project._id, ...req.body});
  res.status(201).json(issue);
}

const updateIssue = async function(req, res) {
  //let project = req.params.project;
  const updateFields = ['issue_title', 'issue_text', 'created_by', 'assigned_to',
    'open', 'status_text'];
  const {_id} = req.body;
  if (!_id) {
    throw new BadRequestError("missing _id");
  }
  const fieldList = Object.keys(req.body);
  if (!fieldList.some(field => updateFields.includes(field))) {
    throw new BadRequestError("no update field(s) sent", {_id});
  }
  console.log(req);
  const issue = await Issue.findOneAndUpdate(
    {_id, projectId: req.project._id},
    req.body,
    {new: true, runValidators: true}
  );
  if (!issue) throw new BadRequestError("could not update", {_id});
  res.status(200).json(issue);
}

const deleteIssue = async function(req, res) {
  const {_id} = req.body;
  if (!_id) {
    throw new BadRequestError("missing _id");
  }
  const issue = await Issue.findByIdAndRemove({
    _id, projectId: req.project._id
  });
  if (!issue) throw new BadRequestError("could not delete", {_id});
  res.status(200).json({result: "successfully deleted", _id});
}

module.exports = {
  getIssues,
  createIssue,
  updateIssue,
  deleteIssue
}; 