const request = require("supertest")
const app = require("../app")
require("../models")

let id;
let token;

beforeAll(async() => {
    const user = {
        email: "test@gmail.com",
        password: "test1234",
    }
    const res = await request(app).post("/users/login").send(user);
    token = res.body.token
})

test('GET /cart', async () => {
    const res = await request(app)
        .get("/cart")
        .set("Authorization", `Bearer ${token}`)
    //console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})
test('POST /cart ', async () => {  
    const body = {
        quantity: 1
    }
    const res = await request(app)
    .post("/cart")
    .send(body)
    .set("Authorization", `Bearer ${token}`)
    id = res.body.id // este es el id que va a verificar el DELETE
    console.log(res.body)
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.quantity).toBe(body.quantity);
})


test('DELETE /cart', async () => { 
    const res = await request(app)
        .delete(`/cart/${id}`) 
        .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(204);
})