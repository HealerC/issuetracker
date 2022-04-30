const Project = require('../models/Project.js');

const getProject = async function (req, res, next) {
  const project = await Project.findOne({name: req.params.project});
  req.project = project;
  next();
}

const createAndGetProject = async function(req, res, next) {
  let project = await Project.findOne({name: req.params.project});
  if (!project) {
    project = await Project.create({name: req.params.project});
  }
  req.project = project;
  next();
}

module.exports = { getProject, createAndGetProject };