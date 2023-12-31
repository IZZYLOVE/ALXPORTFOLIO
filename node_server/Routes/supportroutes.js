const express = require('express')
const router = express.Router()

 const supportController = require('../Controllers/supportController')
 const authController = require('../Controllers/authcontroller')
 const upload = require('../Utils/filehandler')

 
// ROUTES CHAINING for SUPPORT

router.route('/allon_ticket_id/:_id')
    .get(authController.protect,supportController.getAllSupportsOn_ticket_id)

router.route('/')
    .get(authController.protect,supportController.getSupports)
    .post(authController.protect,authController.filesToSupportsPath,upload.array('files'),supportController.postSupport) //allows multiple files uploads

router.route('/:_id')
    .get(authController.protect,supportController.getSupport)
    .patch(authController.protect,supportController.patchSupport)
    .put(authController.protect,supportController.putSupport)
    .delete(authController.protect,authController.restrict('admin'),supportController.deleteSupport)// for single role

module.exports = router