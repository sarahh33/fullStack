import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const putLikes = async updatedBlog => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.put(`${baseUrl}/${updatedBlog._id}`, updatedBlog, config).data
}

const removeBlog = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(`${baseUrl}/${blog._id}`)
  const response =  axios.delete(`${baseUrl}/${blog._id}`,config )
  return response.data
}

export default { getAll, create, setToken, putLikes, removeBlog }