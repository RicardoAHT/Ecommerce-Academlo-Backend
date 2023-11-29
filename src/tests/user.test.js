const request = require("supertest")
const app = require("../app")

let id;
let token;


test("POST /users", async () => { // A veces puede fallar porque ya existe ese usuario con ese correo que es unique
    const user = {
        firstName:"Andy",
        lastName:"Schooles",
        email:"andy4@gmail.com",
        password:"abcd",
        phone:"3005203032"
    }
    const res = await request(app).post("/users").send(user)
    //console.log(res.body)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)
})

test('POST /users/login', async () => { 
    const body = {
        email:"andy4@gmail.com",  // Verificar correo y contraseña
        password:"abcd"
    }
    const res = await request(app).post("/users/login").send(body)
    //console.log(res.body)
    token = res.body.token
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
})

test("GET /users", async () => {
    const res = await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
})

test('PUT /users/:id debe actualizar un user', async () => {
    const user = {
        firstName:"Rick",
        lastName:"Schooles",
        phone:"3005203032"
    }
    
    const res = await request(app)
        .put(`/users/${id}`)
        .send(user)
        .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(user.firstName);
});

test("POST /users/login debe retornar credenciales incorrectas", async () => {
    const body = {
        email:"correoincorrectok@gmail.com",
        password:"contraseñaincorrecta",
    }
    const res = await request(app)
        .post("/users/login")
        .send(body);
    //console.log(res.body)
    expect(res.status).toBe(401);
})

test("DELETE /users/:id debe eliminar un user", async() => {
    const res = await request(app)
        .delete(`/users/${id}`)
        .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(204)
})

