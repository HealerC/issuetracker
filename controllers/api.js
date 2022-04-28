const getIssues = function(req, res) {
  let project = req.params.project;
  res.json({action: "get all issues", project, filters: req.query});
}

const createIssue = function(req, res) {
  let project = req.params.project;
  res.status(201).json({"action": "create issue", project, issue: req.body});
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