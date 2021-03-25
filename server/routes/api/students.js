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
        newStudent.imageUrl = (await axios.get('https://dog.ceo/api/breeds/image/random')).data.message;
        newStudent.save()
        res.send(newStudent)
    } catch (error) {
        console.error(error)
    }
});

router.delete('/delete-student/:id', async (req, res, next) => {
    try {
        const deletedStudent = await Student.findByPk(req.params.id);
        await deletedStudent.destroy();
        res.send(deletedStudent)
    } catch (error) {
        console.error(error)
    }
});

router.put('/edit-student/:id', async (req, res, next) => {
    try {
        console.log("edit", req.body)
        const student = await Student.findByPk(req.params.id);
        student.firstName = req.body.firstName
        student.lastName = req.body.lastName
        student.email = req.body.email
        student.campusId = req.body.school.length === 0 ? null : req.body.school
        await student.save()
        res.send(student)
    } catch (error) {
        console.error(error)
    }
})

router.put('/unregister/:id', async (req, res, next) => {
    try {
        const student = await Student.findByPk(req.params.id);
        student.campusId = null
        await student.save()
        res.send(student)
    } catch (error) {
        console.error(error)
    }
})

module.exports = router;