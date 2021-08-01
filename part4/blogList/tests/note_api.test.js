const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)
const Blog = require('../models/blog')
const { initial } = require('lodash')

let  loggedToken
beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})
  
    const passwordHash = await bcrypt.hash('sarah', 10)
    const user = new User({
      username: 'sarah',
      passwordHash
    })
    await user.save()
  
    const response = await api
      .post('/api/login/')
      .send({
        username: 'sarah',
        password: 'sarah'
      })
  
    loggedToken = response.body.token
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
        .expect(200)
        .expect('Content-Type', /application\/json/)


    const response = await api.get('/api/blogs')
    console.log(response.body)

    const newBlogs = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(newBlogs).toContain('my test')

}, 200000)

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
}, 20000)

test('url and title are missing', async () => {
    const newBlog = {
        title: '11',
        author: "33-2",


    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
}, 20000)

test('a blog can be deleted', async () => {
    const blogAtStart = await helper.blogsInDb()
    const blogToDelete = blogAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete._id}`)
        .expect(204)

    const blogAtEnd = await helper.blogsInDb()

    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const contents = blogAtEnd.map(r => r.title)

    expect(contents).not.toContain(blogToDelete.title)
})

test('a blog can be updated', async () => {
    const blogAtStart = await helper.blogsInDb()
    const blogToChange = blogAtStart[0]

    const likes = blogAtStart.map(r => r.likes)
    const newBlog = {
        author: 'my new test',
        likes: 3333

    }

    await api
        .put(`/api/blogs/${blogToChange._id}`)
        .send(newBlog)
        .expect(200)


    const blogAtEnd = await helper.blogsInDb()

    const changedLikes = blogAtEnd.map(r => r.likes)
    expect(changedLikes[0]).not.toBe(likes[0])
}, 10000)

describe('when there is initially one user in db', () => {
    test('login', async () => {
        
        const blog = {
            "title": "another try",
            "author": "can't be me",
            "url": "www.new.com",
            "likes": 3,
            
        }

        await api
            .post('/api/blogs')
            .set({'Authorization': `bearer ${loggedToken}`})
            .send(blog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    })

    test('login failed', async () => {
        
        const blog = {
            "title": "another try",
            "author": "can't be me",
            "url": "www.new.com",
            "likes": 3,
            
        }

        await api
            .post('/api/blogs')
            .set({'Authorization': `bearer tyaguhiud9`})
            .send(blog)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    })
})



afterAll(() => {
    mongoose.connection.close()
})