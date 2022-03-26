const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const morganId = require('../middleware/morgan');


const sauceCtrl = require('../controllers/sauce');

router.post('/', auth, morganId, multer, sauceCtrl.createSauce);
router.get('/', auth, morganId, sauceCtrl.getAllSauces);
router.get('/:id', auth, morganId, sauceCtrl.getOneSauce);
router.put('/:id', auth, morganId,multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, morganId,sauceCtrl.deleteSauce);
router.post('/:id/like', auth, morganId,sauceCtrl.likeSauce);

module.exports = router;