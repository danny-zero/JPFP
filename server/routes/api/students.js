const router = require('express').Router()
const { default: axios } = require('axios');
const { models: {Campus, Student }} = require('../../db');

router.get('/', async (req, res, next) => {
    try {
        const students = await Student.findAll()
        res.send(students)
    } catch (error) {
        console.error(error)
    }
});

router.get('/:studentId', async (req, res, next) => {
    try {
        const singleStudent = await Student.findOne({
            where: {
                id: req.params.studentId
            },
            include: [Campus]
        })
        res.send(singleStudent)
    } catch (error) {
        console.error(error)
    }
});

router.post('/add-student', async (req, res, next) => {
    try {
        console.log("req.body", req.body)
        const newStudent = await Student.create(req.body)
        res.send(newStudent)
    } catch (error) {
        console.error(error)
    }
})

module.exports = router;