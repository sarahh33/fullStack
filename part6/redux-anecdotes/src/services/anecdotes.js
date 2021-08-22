import axios from 'axios'
import Anecdote from '../components/AnecdoteList'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}
const createNew = async (content) => {
    const object = { content, id: getId(), votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const addVotes = async (anecdote) => {
    const content = {...anecdote, votes:anecdote.votes+1}
    console.log('222')
    console.log(anecdote)
    console.log(`${baseUrl}/${anecdote.id}`)
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, content)
    
    return response.data
}
export default { 
    getAll,
    createNew,
    addVotes
}