const Sequelize = require("sequelize")
const { STRING, TEXT, UUID, UUIDV4, INTEGER, VIRTUAL, DECIMAL } = Sequelize;
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
        type: TEXT
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
        defaultValue: 'server/public/images/defaultprofilepic.png'
    },
    gpa: {
        type: DECIMAL
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
       await Student.create({
            firstName,
            lastName,
            email: `${firstName}.${lastName}@campus.edu`,
            gpa: (Math.random() * 4).toFixed(2)

        })
        const latin = faker.lorem.word()
        const name = `${latin[0].toUpperCase() + latin.slice(1)} University`
        await Campus.create({
            name,
            imageUrl: 'https://source.unsplash.com/1600x900/?university,building,campus',
            address: faker.address.streetAddress()
        })
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