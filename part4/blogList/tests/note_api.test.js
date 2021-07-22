const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)


test('the blog list application returns the correct amount of blog posts', async () =>{
    const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(3)
})

test('the unique property _id exists', async () => {
    const response = await api.get('/api/blogs')
    const unique_id = response.body.map(r=>r._id)
    console.log(unique_id)

    expect(unique_id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})