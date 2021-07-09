import axios from 'axios'
const url= '/api/persons'

const getAll =()=>{
    return axios.get(url)
}

const update=newRecord=>{
    return axios.post(url,newRecord)
}



const updateOld = (id,newRecord) => {
    
    return axios.put(`${url}/${id}`, newRecord)
  }

const delet=id=>{    
    return axios.delete(`${url}/${id}`)
    
}



export default{
    getAll:getAll,
    update:update,
    delet:delet,
    updateOld:updateOld
}