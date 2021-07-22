const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
    
    blogObject = new Blog(helper.initialBlogs[2])
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

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(newBlogs).toContain('my test')

})

test('likes is missed', async () => {
    
    const newBlog = {
        title: 'my new test',
        author: "33-2",
        url: "www.google.com",
        
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
    
    const blogAtEnd = await helper.blogsInDb()
    const blogLikes = blogAtEnd.map(b => b.likes)
    expect(blogLikes).toContain(0)
   

})

afterAll(() => {
    mongoose.connection.close()
})