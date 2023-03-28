const router = require("express").Router();
const projectController = require("../controllers/projectController");

router.post("/project", projectController.setProject);
router.get("/project", projectController.getProject);
router.post("/project/delete", projectController.deleteProject);
router.put("/project", projectController.updateProject);
router.put("/project", projectController.updateProject);
router.get("/singleproject", projectController.singleProject);

module.exports = router;
