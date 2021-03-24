const router = require('express').Router()
const { models: {Campus, Student }} = require('../../db');

router.get('/', async (req, res, next) => {
    try {
        const campuses = await Campus.findAll()
        res.send(campuses)
    } catch (error) {
        console.error(error)
    }
});

router.get('/:campusId', async (req, res, next) => {
    try {
        const singleCampus = await Campus.findByPk(req.params.campusId)
        res.send(singleCampus)
    } catch (error) {
        console.error(error)
    }
});

router.get('/:campusId/students', async (req, res, next) => {
    try {
        const campusStudents = await Student.findAll({
            where: {
                campusId: req.params.campusId
            }
        })
       res.send(campusStudents)
    } catch (error) {
        console.error(error)
    }
});

router.post('/add-campus', async (req, res, next) => {
    try {
        // console.log("req.body", req.body)
        const newCampus = await Campus.create(req.body)
        res.send(newCampus)
    } catch (error) {
        console.error(error)
    }
})


module.exports = router;