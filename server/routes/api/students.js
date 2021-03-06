const router = require('express').Router()
const { default: axios } = require('axios');
const { models: {Campus, Student }} = require('../../db');

router.get('/', async (req, res, next) => {
     try {
        const students = await Student.findAll({
            include: [Campus]
        })
        if (req.query.page) {
            console.log(req.query)
            const endIndex = req.query.page * 10
            const startIndex = endIndex - 10
            const currentListings = students.slice(startIndex, endIndex)
            res.send(currentListings)
        } else {
            console.log('no query')
            res.send(students)
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
});

router.get('/:studentId', async (req, res, next) => {
    try {
        const singleStudent = await Student.findByPk(
            req.params.studentId,
            {
            include: [Campus]
            }
        )
        // console.log("singleStudent", singleStudent)
        res.send(singleStudent)
    } catch (error) {
        console.error(error)
        // res.send({data: 'not found'})
        next(error)
    }
});

router.post('/add-student', async (req, res, next) => {
    try {
        console.log("createStudent req.body", req.body)
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const email = req.body.email
        const school = req.body.school
        const newStudent = await Student.create({firstName, lastName, email})
        newStudent.imageUrl = (await axios.get('https://dog.ceo/api/breeds/image/random')).data.message;
        newStudent.campusId = req.body.school === 'null' ? null : req.body.school
        newStudent.save()
        res.status(201).send(newStudent)
    } catch (error) {
        console.error(error)
        next(error)
    }
});

router.delete('/delete-student/:id', async (req, res, next) => {
    try {
        const deletedStudent = await Student.findByPk(req.params.id);
        await deletedStudent.destroy();
        res.send(deletedStudent)
    } catch (error) {
        console.error(error)
        next(error)
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
        next(error)
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
        next(error)
    }
})

module.exports = router;