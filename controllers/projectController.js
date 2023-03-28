const cloudinary = require("cloudinary").v2;
const Project = require("../models/Project");
const { error, success } = require("../utils/responseWrapper");

const setProject = async (req, res) => {
  try {
    const { projectName, projectDesc, live, code, image } = req.body;

    if (!projectName || !projectDesc || !image) {
      return res.send(error(400, "All fields are required"));
    }

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });

    const imageRes = await cloudinary.uploader.upload(image, {
      folder: "portfolio_project_image",
    });

    if (!imageRes) {
      return res.send(error(401, "Images upload failed"));
    }

    const project = await Project.create({
      projectName,
      projectDesc,
      live,
      code,
      image: {
        public_id: imageRes.public_id,
        url: imageRes.secure_url,
      },
    });

    if (!project) {
      return res.send(error(401, "Insertion failed"));
    }

    return res.send(success(201, project.projectName));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

const getProject = async (req, res) => {
  const project = await Project.find();
  res.send(success(200, project));
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.send(error(400, "Id is required"));
    }

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.send(error(400, "Project does not exits"));
    }
    return res.send(success(200, "Project Deleted"));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

const updateProject = async (req, res) => {
  try {
    const { id, projectName, projectDesc, live, code, image } = req.body;

    if (!id) {
      return res.send(error(400, "Id is required"));
    }
    if (!image) {
      return res.send(error(400, "Image is required"));
    }
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });

    const imageRes = await cloudinary.uploader.upload(image, {
      folder: "portfolio_project_image",
    });

    const project = await Project.findByIdAndUpdate(id, {
      projectName,
      projectDesc,
      live,
      code,
      image: {
        public_id: imageRes.public_id,
        url: imageRes.secure_url,
      },
    });
    if (!project) {
      return res.send(error(400, "Update Failed"));
    }
    return res.send(success(200, "Update Successfully"));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};
const singleProject = async (req, res) => {
  try {
    const { id } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      return res.send(error(400, "Project Not Found"));
    }
    return res.send(success(200, project));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};
module.exports = {
  setProject,
  getProject,
  deleteProject,
  updateProject,
  singleProject,
};
