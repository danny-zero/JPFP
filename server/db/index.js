const Sequelize = require("sequelize")
const { STRING, TEXT, UUID, UUIDV4, INTEGER, VIRTUAL, DECIMAL, ARRAY } = Sequelize;
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/jpfp', {logging: false});
const faker = require('faker');
const {randomCampusSelection, randomNameGenerator} = require('./helperFunctions');
const axios = require('axios');

//ARRAY OF LOGOS FOR CAMPUSES
const campusImgArr = [
            'public/images/logos/dog-logos-2.jpg',
            'public/images/logos/dog-logos-4.jpg',
            'public/images/logos/dog-logos-7.jpg',
            'public/images/logos/dog-logos-10.jpg',
            'public/images/logos/dog-logos-11.jpg',
            'public/images/logos/dog-logos-17.jpg',
            'public/images/logos/dog-logos-18.jpg',
            'public/images/logos/dog-logos-19.jpg',
            'public/images/logos/dog-logos-22.jpg',
            'public/images/logos/dog-logos-23.jpg',
        ]

//MODELS
const Campus = db.define('campus', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    imageUrl: {
        type: STRING,
        defaultValue: campusImgArr[Math.floor(Math.random() * campusImgArr.length)]
    },
    address: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: ARRAY(TEXT)
    },
},
{
        timestamps: false,
        sequelize: db,
        modelName: "Users",
    })

const Student = db.define('student', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    firstName: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    lastName: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    gender: {
        type: STRING
    },
    email: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    imageUrl: {
        type: STRING,
        defaultValue: 'https://dog.ceo/api/breeds/image/random'
    },
    gpa: {
        type: DECIMAL
    },
    fullName: {
        type: VIRTUAL,
        get() {
            return `"${this.firstName}" ${this.lastName}`
        }
    }
},
    {
        timestamps: false,
        sequelize: db,
        modelName: "Users",
    }
)

//ASSOCIATIONS
Student.belongsTo(Campus);
Campus.hasMany(Student)


//SYNCANDSEED
const syncAndSeed = async () => {
    await db.sync({force: true});

    //CREATE CAMPUSES
    const campusContainer = [];

    for (let i = 0; i < 100; i++) {
        try {
            const breed = (await axios.get('https://dog.ceo/api/breeds/list/random')).data.message;
        } catch (error) {
            console.error(error)
        }

        const name = `${breed[0].toUpperCase() + breed.slice(1)} Obedience School`
        let description = []
        for (let i = 0; i < 3; i++) {
            description.push(faker.lorem.paragraph())
            }
        const campus = await Campus.create({
                name,
                imageUrl: campusImgArr[Math.floor(Math.random() * campusImgArr.length)],
                address: faker.address.streetAddress(),
                description
        });
        campusContainer.push(campus.id)
    }

    //CREATE STUDENTS
    for (let i = 0; i < 100; i++) {
        const {firstName, gender} = randomNameGenerator()
        const lastName = faker.name.lastName()
        const student = await Student.create({
            firstName,
            lastName,
            gender,
            email: `${firstName[0].toLowerCase() + firstName.slice(1)}.${lastName[0].toLowerCase() + lastName.slice(1)}@obedience.isruff`,
            imageUrl: (await axios.get('https://dog.ceo/api/breeds/image/random')).data.message,
            gpa: (Math.random() * 4).toFixed(2)
        })

        //ASSIGN A STUDENT A RANDOM CAMPUS
        randomCampusSelection(student, campusContainer)
    }

}


//EXPORTS
module.exports = {
    db,
    syncAndSeed,
    models: {
        Campus,
        Student
    }
}