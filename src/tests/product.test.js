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

test('GET /products', async () => {
    const res = await request(app).get("/products")
    //console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test('POST /products ', async () => {  
    const product = {
        title: "Politics",
        description: "Smartphone de ultima tecnologia con camara zoom x100",
        brand: "Samsung",
        price: 1300
    }
    const res = await request(app)
        .post("/products")
        .send(product)
        .set("Authorization", `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe(product.title);
})

test('DELETE /products', async () => { 
    const res = await request(app)
        .delete(`/products/${id}`) 
        .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(204);
})