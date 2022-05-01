const Project = require('../models/Project.js');
const {NotFoundError} = require('../errors');

const getProject = async function (req, res, next) {
  const project = await Project.findOne({name: req.params.project});
  if (!project) {
    throw new NotFoundError(`The project "${req.params.project}" does not exist`);
  }
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