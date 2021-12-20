const express = require('express');
const router = express.Router();

const {
    getAllList,
    createNewExpanse,
    changeExpanse,
    deleteExpanse
} = require ('../controllers/exp.controllers');

router.get('/allList', getAllList);
router.post('/createExpanse', createNewExpanse);
router.patch('/updateExpanse', changeExpanse);
router.delete('/deleteExpanse', deleteExpanse);

module.exports = router;