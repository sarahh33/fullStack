import axios from 'axios'
const baseUrl = '/api/blogs'
let config = null
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const create = async newObject => {

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const putLikes = async updatedBlog => {

  await axios.put(`${baseUrl}/${updatedBlog._id}`, updatedBlog, config).data
}

const removeBlog = async (blog) => {
  console.log(`${baseUrl}/${blog._id}`)
  await axios.delete(`${baseUrl}/${blog._id}`, config)


}

export default { getAll, create, setToken, putLikes, removeBlog }