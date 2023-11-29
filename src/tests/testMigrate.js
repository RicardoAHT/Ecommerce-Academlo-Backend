const sequelize = require('../utils/connection');
const request = require("supertest")
const app = require("../app")

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        const user = { //! Se crea un usuario para poder solucionar el tema de token en los test diferesntes a users
            firstName: "Leo",
            lastName: "Herrera",
            email: "test@gmail.com",
            password: "test1234",
            phone: "3002123241"
        }
        sequelize.sync();
        await request(app).post("/users").send(user)
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();