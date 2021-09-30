const express = require("express");
const router  = express.Router();
var projectController = require('../controller/project-controller')

router.get('/get-project-posts', projectController.getProjectPosts)
router.post('/get-project-info', projectController.getProjectInfo)
router.get('/get-latest-project-posts', projectController.getLatestProjectPosts)
router.post('/add-project', projectController.addProject)
router.post('/toggle-visibility', projectController.toggleVisibility)
router.post('/delete-project', projectController.deleteProject)
router.post('/edit-project', projectController.editProject)


module.exports = router;