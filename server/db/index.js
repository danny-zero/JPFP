const Sequelize = require("sequelize")
const { STRING, TEXT, UUID, UUIDV4, INTEGER, VIRTUAL, DECIMAL, ARRAY } = Sequelize;
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/jpfp', {logging: false});
const faker = require('faker');

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
        type: STRING
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
    email: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    imageUrl: {
        type: STRING,
        defaultValue: './public/images/defaultprofilepic.png'
    },
    gpa: {
        type: DECIMAL
    },
    fullName: {
        type: VIRTUAL,
        get() {
            return `${this.firstName} ${this.lastName}`
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

    for (let i = 0; i < 10; i++) {
        const firstName = faker.name.firstName()
        const lastName = faker.name.lastName()
        const student = await Student.create({
            firstName,
            lastName,
            email: `${firstName[0].toLowerCase() + firstName.slice(1)}.${lastName[0].toLowerCase() + lastName.slice(1)}@campus.edu`,
            gpa: (Math.random() * 4).toFixed(2)

        })
        const latin = faker.lorem.word()
        const name = `${latin[0].toUpperCase() + latin.slice(1)} University`
        let description = []
        for (let i = 0; i < 3; i++) {
            description.push(faker.lorem.paragraph())
        }
        const campus = await Campus.create({
            name,
            imageUrl: 'https://source.unsplash.com/1600x900/?university,building,campus',
            address: faker.address.streetAddress(),
            description
        })
        student.campusId = campus.id;
        student.save()
    }

    const firstName = faker.name.firstName()
        const lastName = faker.name.lastName()
        const noSchoolStudent = await Student.create({
            firstName,
            lastName,
            email: `${firstName[0].toLowerCase() + firstName.slice(1)}.${lastName[0].toLowerCase() + lastName.slice(1)}@campus.edu`,
            gpa: (Math.random() * 4).toFixed(2)

        })
        console.log(noSchoolStudent)
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