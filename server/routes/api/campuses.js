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
    console.log("hello")
    console.log(req.body)
    try {
        const singleCampus = await Campus.findByPk(req.params.campusId)
        console.log(singleCampus)
        res.send(singleCampus)
    } catch (error) {
        console.error(error)
    }
})


module.exports = router;