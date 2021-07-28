const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')

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
        .expect(200)
        .expect('Content-Type', /application\/json/)
    

    const response = await api.get('/api/blogs')
    console.log(response.body)

    const newBlogs = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(newBlogs).toContain('my test')

},200000)

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
   },20000)

test('url and title are missing', async () => {
    const newBlog = {
       title:'11',
        author: "33-2",
        
      
    }
    
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
},20000)

test('a blog can be deleted', async () => {
    const  blogAtStart = await helper.blogsInDb()
    const blogToDelete = blogAtStart[0]

    await api 
    .delete(`/api/blogs/${blogToDelete._id}`)
    .expect(204)

    const blogAtEnd = await helper.blogsInDb()

    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length -1)

    const contents = blogAtEnd.map(r => r.title)

    expect(contents).not.toContain(blogToDelete.title)
})

test('a blog can be updated', async () => {
    const  blogAtStart = await helper.blogsInDb()
    const blogToChange = blogAtStart[0]

    const likes = blogAtStart.map(r => r.likes)
    const newBlog = {
        author: 'my new test',
        likes:3333
        
    }

    await api 
    .put(`/api/blogs/${blogToChange._id}`)
    .send(newBlog)
    .expect(200)
    

    const blogAtEnd = await helper.blogsInDb()
    
    const changedLikes = blogAtEnd.map(r => r.likes)
    expect(changedLikes[0]).not.toBe(likes[0])
},10000)

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    },10000)

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      }, 10000)
  })



afterAll(() => {
    mongoose.connection.close()
})