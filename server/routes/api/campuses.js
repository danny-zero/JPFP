const router = require('express').Router()
const { models: {Campus, Student }} = require('../../db');

router.get('/', async (req, res, next) => {
    try {
        const campuses = await Campus.findAll({
            include: [Student]
        })
        // console.log(campuses)
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
        res.send({data: 'not found'})
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
});

router.delete('/delete-campus/:id', async (req, res, next) => {
    try {
        const campus = (await Campus.findByPk(req.params.id));
        await campus.destroy()
        res.send(campus)
    } catch (error) {
        console.error(error)
    }
});

router.put('/edit-campus/:id', async (req, res, next) => {
    try {
        console.log("edit", req.body)
        const campus = await Campus.findByPk(req.params.id);
        campus.name = req.body.name
        campus.address = req.body.address
        campus.description = req.body.description
        await campus.save()
        res.send(campus)
    } catch (error) {
        console.error(error)
    }
});


module.exports = router;