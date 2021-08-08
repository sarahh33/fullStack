import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
console.log(token)
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
  
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog,config)
  console.log(response,'111')
  return response.data
}


export default { getAll, create, setToken,putLikes }