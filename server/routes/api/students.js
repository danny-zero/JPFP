const router = require('express').Router()
const { models: {Campus, Student }} = require('../../db');

router.get('/', async (req, res, next) => {
    try {
        const students = await Student.findAll()
        res.send(students)
    } catch (error) {
        console.error(error)
    }
});


module.exports = router;