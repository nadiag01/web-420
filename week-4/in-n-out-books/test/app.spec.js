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
    it ("should return a 201 status code when adding a new book", async ()=>{
        const response = await request(app).post("/api/books").send({
            "title": "newbook", "author": "Mary Jones"
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("title", "newbook")
       
    })

    it ("should return a 400 status code when adding a new book with a missing title", async ()=>{
        const response = await request(app).post("/api/books").send({
             "author": "Mary Jones"
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "a title is required")
       
    })

    it ("should return a 204 status code when updating a book", async ()=>{
        const response = await request(app).put("/api/books/1").send({
            title: "updated title", author: "updated author"
        })
    
        expect(response.status).toBe(204)
       // expect(response.body).toHaveProperty("message", "success")//
       
    })

    it ("should return a 400 status code when updating a book", async ()=>{
        const response = await request(app).put("/api/books/a").send({
            title: "updated title", author: "updated author"
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "not a number")
       
    })

    it ("should return a 400 status code when updating a book", async ()=>{
        const response = await request(app).put("/api/books/1").send({
         author: "updated author"
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "invalid title")
       
    })

    it ("should return a 204 status code when deleting a book", async ()=>{
        const response = await request(app).delete("/api/books/1")
        expect(response.status).toBe(204)
       
       
    })
})