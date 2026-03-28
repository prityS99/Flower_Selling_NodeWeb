const express = require('express');
const authCheck = require('../middleware/authMiddleware');
const roleCheck= require("../middleware/roleCheck");
const authController = require('../controller/authController');

const router = express.Router();

router.post("/register",  authController.register);
router.post('/login', authController.login);
router.get("/admin/dashboard",authCheck,roleCheck("admin"),
  authController.adminDashboard
);
router.get('/dashboard', authCheck, authController.dashboard);
router.get('/users',authCheck,roleCheck("admin"),
  authController.getUsers
); 


module.exports = router;

