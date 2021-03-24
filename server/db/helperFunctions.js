const dogNames = require('dog-names');

const randomCampusSelection = (obj, arr) => {
    let num = Math.floor(Math.random() * 6 + 1)
    if (num >= 2) {
    obj.campusId = arr[Math.floor(Math.random() * arr.length + 1)]
    } else {
    obj.campusId = null
    }
    obj.save()
}

const randomNameGenerator = () => {
    let num = Math.floor(Math.random() * 6 + 1)
    if (num  <= 3) {
        return {
            firstName: dogNames.femaleRandom(),
            gender: 'female'
        }
    } else {
        return {
            firstName: dogNames.maleRandom(),
            gender: 'male'
        }
    }
}

module.exports = {
    randomCampusSelection,
    randomNameGenerator
}