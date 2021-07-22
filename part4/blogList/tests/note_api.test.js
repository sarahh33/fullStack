const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [
    {
        title: "abc",
        author: "String",
        url: "www.baidu.com",
        likes: 132
    },
    {
        title: "abc",
        author: "String",
        url: "www.baidu.com",
        likes: 132
    },
    {
        title: "abc33",
        author: "String3",
        url: "www.baidu.com",
        likes: 333
    }

]
beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
})


test('the blog list application returns the correct amount of blog posts', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(3)
})

test('the unique property _id exists', async () => {
    const response = await api.get('/api/blogs')
    const unique_id = response.body.map(r => r._id)

    expect(unique_id).toBeDefined()
})

test('a blog can be added', async () => {
    
    const newBlog = {
        title: 'my test',
        author: "33",
        url: "www.google.com",
        likes: 33
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    

    const response = await api.get('/api/blogs')
    console.log(response.body)

    const newBlogs = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(newBlogs).toContain('my test')

})

afterAll(() => {
    mongoose.connection.close()
})