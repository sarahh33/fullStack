import axios from 'axios'
const url= '/api/persons/'

const getAll =()=>{
    return axios.get(url)
}

const update=newRecord=>{
    return axios.post(url,newRecord)
}

const updateOld = (newRecord,id)=>{
    
    return axios.put(`${url}/${id[0].id}`, newRecord)
}

const delet=id=>{    
    return axios.delete(`http://localhost:3001/persons/${id}`)
    
}



export default{
    getAll:getAll,
    update:update,
    delet:delet,
    updateOld:updateOld
}