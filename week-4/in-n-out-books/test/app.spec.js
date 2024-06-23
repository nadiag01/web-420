const request = require("supertest")
const app = require ("../src/app")

describe("api test",()=>{
    it ("should return an array of books", async ()=>{
const response = await request(app).get("/api/books")
expect(response.body).toBeInstanceOf(Array)
expect (response.body.length).toBeGreaterThanOrEqual(1)
    })
    it ("should return a single book", async ()=>{
        const response = await request(app).get("/api/books/1")
expect(response.body).toHaveProperty("id",1)
expect(response.body).toHaveProperty("title","The Fellowship of the Ring")
expect(response.body).toHaveProperty("author", "J.R.R. Tolkien")
    })
    it ("should return a 400 error if the id is not a number", async ()=>{
        const response = await request(app).get("/api/books/null")
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message","invalid id")
       
    })
})