'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');
var ContactController = require('../controllers/contact');


var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });




router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.testImage);
router.get('/details/:id',ProjectController.getProject);
router.post('/send-email', ContactController.sendEmail);


module.exports = router;