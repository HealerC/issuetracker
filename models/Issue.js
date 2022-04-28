const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  issue_title: {
    type: String,
    required: [true, 'Please provide title'],
    minlength: 3,
    maxlength: 50
  },
  issue_text: {
    type: String,
    required: [true, 'Please provide text']
  },
  created_by: {
    type: String,
    required: [true, 'Please provide name of user that created the issue'],
    minlength: 3,
    maxlength: 50
  },
  assigned_to: {
    type: String,
    minlength: 3,
    maxlength: 50
  },
  open: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ["To do", "In Progress", "Done"]
  },
  status_text: {
    type: String,
    minlength: 3,
    maxlength: 50
  },
  projectId: {
    type: mongoose.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Please provide projectId']
  }
}, {
    timestamps: true
});

issueSchema.pre('save', function(){
  if(!this.status) {
    this.status = this.assigned_to ? "In Progress" : "To do"
  }
});

module.exports = mongoose.model('Issue', issueSchema);