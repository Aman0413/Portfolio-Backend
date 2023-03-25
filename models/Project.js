const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    require: true,
  },
  projectDesc: {
    type: String,
    require: true,
  },
  live: {
    type: String,
  },
  code: {
    type: String,
    require: true,
  },
  image: {
    public_id: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
  },
});

module.exports = mongoose.model("project", projectSchema);
