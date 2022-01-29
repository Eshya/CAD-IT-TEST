var router = require("express").Router();
const controllerData = require('../controller/controller.js');
router.get("/q1", controllerData.doQ1 );
router.get("/q2", controllerData.doQ2 );
// router.get("/q3", controllerData.q3Output );

module.exports = router;